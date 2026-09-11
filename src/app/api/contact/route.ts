import { getClientKey, isRateLimited } from "@/lib/rate-limit";

type TranscriptMessage = {
  role: "user" | "assistant";
  content: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanText(value: unknown, maximumLength: number) {
  return typeof value === "string"
    ? value.trim().slice(0, maximumLength)
    : "";
}

function cleanTranscript(value: unknown): TranscriptMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is TranscriptMessage =>
        typeof item === "object" &&
        item !== null &&
        ((item as TranscriptMessage).role === "user" ||
          (item as TranscriptMessage).role === "assistant") &&
        typeof (item as TranscriptMessage).content === "string",
    )
    .slice(-20)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 2000),
    }))
    .filter((item) => item.content);
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(`contact:${clientKey}`, 5, 10 * 60_000)) {
    return Response.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (cleanText(body.website, 200)) {
    return Response.json({ sent: true });
  }

  const name = cleanText(body.name, 80);
  const email = cleanText(body.email, 160);
  const project = cleanText(body.project, 1200);
  const messages = cleanTranscript(body.messages);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "A valid name and email are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const transcript = messages
      .map(
        (message) =>
          `${message.role === "user" ? "Visitor" : "Assistant"}: ${message.content}`,
      )
      .join("\n\n");
    const emailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      project ? `Project summary: ${project}` : "",
      transcript ? `Conversation:\n${transcript}` : "",
    ]
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 1600);
    const recipient =
      process.env.CONTACT_TO_EMAIL || "nomanbaig290@gmail.com";
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(
      `Portfolio enquiry from ${name}`,
    )}&body=${encodeURIComponent(emailBody)}`;

    return Response.json({ sent: false, configured: false, mailto });
  }

  const transcriptHtml = messages.length
    ? messages
        .map(
          (message) => `
            <div style="margin:0 0 14px;padding:12px;background:${
              message.role === "user" ? "#f0f8d5" : "#f3f1e9"
            }">
              <strong>${message.role === "user" ? "Visitor" : "Assistant"}</strong>
              <p style="margin:6px 0 0;white-space:pre-wrap">${escapeHtml(message.content)}</p>
            </div>`,
        )
        .join("")
    : "<p>No chat messages were included.</p>";

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeProject = project
    ? `<h2>Project summary</h2><p style="white-space:pre-wrap">${escapeHtml(project)}</p>`
    : "";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        "Nouman Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || "nomanbaig290@gmail.com"],
      reply_to: email,
      subject: `Portfolio enquiry from ${name.replace(/[\r\n]/g, " ")}`,
      html: `
        <div style="max-width:680px;margin:auto;font-family:Arial,sans-serif;color:#11120f;line-height:1.5">
          <h1>New portfolio enquiry</h1>
          <p><strong>Name:</strong> ${safeName}<br />
          <strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          ${safeProject}
          <h2>Conversation</h2>
          ${transcriptHtml}
        </div>`,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    return Response.json(
      { error: "The message could not be delivered." },
      { status: 502 },
    );
  }

  return Response.json({ sent: true, configured: true });
}
