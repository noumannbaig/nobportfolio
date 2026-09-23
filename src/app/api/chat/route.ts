import { getClientKey, isRateLimited } from "@/lib/rate-limit";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const portfolioContext = `
You are Nouman Baig's portfolio assistant. Be concise, friendly, and factual.
You are an AI assistant, not Nouman. Never imply that you are human.

Nouman is a software engineer with 5+ years of experience. He builds
enterprise backends, distributed systems, cloud platforms, data pipelines,
high-performance APIs, and applied AI products.

Core skills:
- AI: Python, FastAPI, LLMs, LangChain, AI agents, RAG, prompt engineering,
  vector databases.
- Backend: C#, .NET Core, ASP.NET Core, microservices, clean architecture,
  REST APIs, WebSockets, SignalR, Kafka, RabbitMQ.
- Cloud and data: AWS, Azure, Docker, Kubernetes, Lambda, Azure Functions,
  PostgreSQL, SQL Server, MongoDB, DynamoDB, Redshift, Athena, Glue,
  ClickHouse, Neon, Azure Synapse, PySpark.

Selected work:
- Intella by Deloitte: enterprise tax processing and Azure data workflows.
- Gecco2: AI-driven carbon accounting processing 1M+ transactions monthly.
- Windoxx: AWS IoT digital signage and remote device management.
- HRMS: payroll, recruitment, and compliance; reduced manual work by 40%.
- StayX: AI-powered industrial training and gamification.
- Knorr-Bremse Digital: Azure industrial platform with Azure AD and SSO.
- FastScanner: millions of Polygon market-data records, Parquet storage, and
  high-throughput symbol calculations.
- Business Data Pipeline: multi-source consumer data ingestion using Redshift,
  Athena, Glue, ClickHouse, PostgreSQL, and Neon.
- Argus: AWS RAG observatory with hybrid retrieval, query expansion, cited
  generation, and claim-level faithfulness audit, mapped to Amazon Bedrock
  Knowledge Bases. GitHub: https://github.com/noumannbaig/Rag-pipeline-argus.

Proof points: 99.9% uptime, $500K+ monthly payments handled, and a 5.0/5 client
rating. Client names are intentionally private.

Availability: Nouman is available from 9 AM to 9 PM EST and responds in less
than 24 hours. He is open to select software, cloud, data, and AI opportunities.
Invite the visitor to send the conversation through the form.

Contact: nomanbaig290@gmail.com.

Do not invent employers, project details, pricing, availability, or private
information. If asked something not covered here, say you do not know and
offer to pass the question to Nouman. Use plain text, not Markdown.
`.trim();

function cleanMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value)) return null;

  const messages = value
    .filter(
      (item): item is ChatMessage =>
        typeof item === "object" &&
        item !== null &&
        ((item as ChatMessage).role === "user" ||
          (item as ChatMessage).role === "assistant") &&
        typeof (item as ChatMessage).content === "string",
    )
    .slice(-10)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 1000),
    }))
    .filter((item) => item.content);

  return messages.length ? messages : null;
}

function fallbackReply(question: string) {
  const text = question.toLowerCase();

  if (/available|availability|free|start|calendar|when/.test(text)) {
    return "Nouman is available from 9 AM to 9 PM EST and responds in less than 24 hours. He is open to select software, cloud, data, and AI opportunities. You can send this conversation to him using the button below.";
  }

  if (/email|contact|reach|call|phone/.test(text)) {
    return "You can reach Nouman at nomanbaig290@gmail.com, or send this conversation through the contact form below so he has the full context.";
  }

  if (/argus|rag|bedrock|faithfulness|hybrid retrieval/.test(text)) {
    return "Argus is a retrieval observatory, not a chatbot clone. It instruments query expansion, BM25 plus dense hybrid search, reciprocal rank fusion, cited generation, and a claim-level faithfulness audit. The pattern maps to Amazon Bedrock Knowledge Bases. The repository is linked in the projects section.";
  }

  if (/fastscanner|scanner|polygon|parquet|market data/.test(text)) {
    return "FastScanner is a high-throughput market-data system. It pulls millions of ticker records from Polygon, stores them as Parquet files, and processes symbols through calculation pipelines. Its repository is linked in the projects section.";
  }

  if (/project|portfolio|built|work/.test(text)) {
    return "Nouman has delivered enterprise tax systems, carbon accounting, digital signage, HR automation, industrial gamification, railway technology, market-data processing, consumer-data pipelines, and Argus, a production-style AWS RAG observatory. The projects section includes technical details and available GitHub links.";
  }

  if (/ai|llm|agent|langchain|rag|fastapi|python/.test(text)) {
    return "Nouman works with Python, FastAPI, LLMs, LangChain, AI agents, RAG pipelines, prompt engineering, and vector databases—supported by strong production backend and cloud experience.";
  }

  if (/skill|stack|technology|backend|cloud|aws|azure|database/.test(text)) {
    return "His core stack includes C#/.NET, Python, FastAPI, microservices, AWS, Azure, Docker, Kubernetes, PostgreSQL, SQL Server, MongoDB, DynamoDB, Kafka, RabbitMQ, React, and modern AI tooling.";
  }

  if (/review|rating|client|testimonial/.test(text)) {
    return "Nouman has a 5.0/5 client rating. Clients consistently highlight his technical ownership, reliability, communication, and ability to deliver complex projects.";
  }

  return "Nouman specializes in production-grade backend, cloud, data, and AI systems. Ask me about a specific project or skill, or send your requirements through the form. He is available from 9 AM to 9 PM EST and responds in less than 24 hours.";
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(`chat:${clientKey}`, 30, 60_000)) {
    return Response.json(
      { message: "Too many messages. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = cleanMessages(
    typeof body === "object" && body !== null
      ? (body as { messages?: unknown }).messages
      : null,
  );

  if (!messages) {
    return Response.json({ error: "A message is required." }, { status: 400 });
  }

  const latestQuestion =
    [...messages].reverse().find((message) => message.role === "user")?.content ||
    "";
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: portfolioContext },
            ...messages,
          ],
          temperature: 0.25,
          max_tokens: 300,
        }),
        signal: AbortSignal.timeout(15_000),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const answer = data.choices?.[0]?.message?.content?.trim();
        if (answer) return Response.json({ message: answer, poweredBy: "ai" });
      }
    } catch {
      // Continue with the reliable portfolio-aware fallback below.
    }
  }

  return Response.json({
    message: fallbackReply(latestQuestion),
    poweredBy: "portfolio",
  });
}
