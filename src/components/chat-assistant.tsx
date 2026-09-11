"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: Message = {
  role: "assistant",
  content:
    "Hi — I’m Nouman’s AI assistant. Ask me about his projects, skills, availability, or how he could help with your product.",
};

const quickPrompts = [
  "What does Nouman specialize in?",
  "Tell me about his AI experience",
  "Is Nouman available?",
];

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "email-client"
  >("idle");
  const [deliveryError, setDeliveryError] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, leadOpen]);

  useEffect(() => {
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok || !data.message) throw new Error("Chat failed");

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.message! },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I’m having trouble connecting right now. You can still send this conversation to Nouman or email him at nomanbaig290@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  async function sendTranscript(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDeliveryStatus("sending");
    setDeliveryError("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          project: form.get("project"),
          website: form.get("website"),
          messages,
        }),
      });
      const data = (await response.json()) as {
        configured?: boolean;
        mailto?: string;
        error?: string;
      };

      if (data.configured === false && data.mailto) {
        setDeliveryStatus("email-client");
        const emailLink = document.createElement("a");
        emailLink.href = data.mailto;
        emailLink.style.display = "none";
        document.body.appendChild(emailLink);
        try {
          emailLink.click();
        } catch {
          // Some browsers block external mail applications; keep the direct
          // email address visible in the success state instead of failing.
        } finally {
          emailLink.remove();
        }
        return;
      }

      if (!response.ok) {
        setDeliveryError(
          data.error || "The conversation could not be delivered.",
        );
        setDeliveryStatus("error");
        return;
      }
      setDeliveryStatus("sent");
    } catch {
      setDeliveryError(
        "The website could not reach the delivery service. Please try again.",
      );
      setDeliveryStatus("error");
    }
  }

  return (
    <aside className="chat-assistant">
      {open && (
        <section
          className="chat-panel"
          role="dialog"
          aria-label="Chat with Nouman’s AI assistant"
        >
          <header className="chat-header">
            <div className="chat-identity">
              <span className="chat-avatar" aria-hidden="true">
                NB
              </span>
              <span>
                <strong>Nouman&apos;s assistant</strong>
                <small>
                  <i aria-hidden="true" /> Available 9 AM–9 PM EST
                </small>
              </span>
            </div>
            <button
              className="chat-close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.role}`} key={index}>
                {message.content}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="chat-prompts">
                {quickPrompts.map((prompt) => (
                  <button
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    key={prompt}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div className="chat-message assistant chat-typing">
                <span />
                <span />
                <span />
                <span className="sr-only">Assistant is typing</span>
              </div>
            )}

            {leadOpen &&
              deliveryStatus !== "sent" &&
              deliveryStatus !== "email-client" && (
              <form className="lead-form" onSubmit={sendTranscript}>
                <div>
                  <strong>Send this conversation to Nouman</strong>
                  <button
                    type="button"
                    onClick={() => setLeadOpen(false)}
                    aria-label="Close contact form"
                  >
                    ×
                  </button>
                </div>
                <label>
                  Your name
                  <input name="name" required maxLength={80} />
                </label>
                <label>
                  Work email
                  <input name="email" type="email" required maxLength={160} />
                </label>
                <label>
                  Project summary <span>(optional)</span>
                  <textarea name="project" rows={3} maxLength={1200} />
                </label>
                <input
                  className="chat-honeypot"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <button
                  className="lead-submit"
                  type="submit"
                  disabled={deliveryStatus === "sending"}
                >
                  {deliveryStatus === "sending"
                    ? "Sending…"
                    : "Send to Nouman →"}
                </button>
                <small>
                  By sending, you agree to share this transcript with Nouman.
                </small>
                {deliveryStatus === "error" && (
                  <p className="chat-error">
                    {deliveryError} You can also email Nouman directly.
                  </p>
                )}
              </form>
            )}

            {deliveryStatus === "sent" && (
              <div className="chat-success">
                <strong>Conversation sent.</strong>
                <span>Nouman will follow up using the email you provided.</span>
              </div>
            )}
            {deliveryStatus === "email-client" && (
              <div className="chat-success">
                <strong>Continue in your email app.</strong>
                <span>
                  Send the prepared message to share this conversation. If it
                  did not open, email{" "}
                  <a href="mailto:nomanbaig290@gmail.com">
                    nomanbaig290@gmail.com
                  </a>
                  . Nouman responds in less than 24 hours.
                </span>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <div className="chat-footer">
            <form className="chat-composer" onSubmit={submitMessage}>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder="Ask about projects, skills, or availability…"
                aria-label="Message"
                rows={1}
                maxLength={1000}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
              >
                ↑
              </button>
            </form>
            <button
              className="send-conversation"
              type="button"
              onClick={() => {
                setLeadOpen(true);
                setDeliveryStatus("idle");
                setDeliveryError("");
              }}
            >
              Send conversation to Nouman
            </button>
            <small>AI assistant · May make mistakes</small>
          </div>
        </section>
      )}

      <button
        className="chat-launcher"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close Nouman’s assistant" : "Chat with Nouman"}
      >
        <span className="launcher-icon" aria-hidden="true">
          {open ? "×" : "NB"}
        </span>
        <span>{open ? "Close" : "Chat with Nouman"}</span>
        {!open && <i aria-hidden="true" />}
      </button>
    </aside>
  );
}
