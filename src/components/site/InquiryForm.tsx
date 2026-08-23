import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

/* ------------------------------------------------------------------
 * EMAILJS PLACEHOLDERS — replace these three with your real values.
 * Dashboard: emailjs.com -> Email Services / Email Templates / Account.
 * ------------------------------------------------------------------ */
export const SHOAL_EMAILJS_SERVICE_ID = "REPLACE_ME_SERVICE_ID";
export const SHOAL_EMAILJS_TEMPLATE_ID = "REPLACE_ME_TEMPLATE_ID";
export const SHOAL_EMAILJS_PUBLIC_KEY = "REPLACE_ME_PUBLIC_KEY";

const isConfigured = () => !SHOAL_EMAILJS_SERVICE_ID.startsWith("REPLACE_ME");

export function InquiryForm({
  accent = "trace",
  projectType,
  onSent,
  /** When false the form never calls EmailJS (homepage placeholder form). */
  sendEmail = true,
}: {
  accent?: "trace" | "surface";
  projectType?: string;
  onSent?: () => void;
  sendEmail?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const accentColor = accent === "trace" ? "var(--trace)" : "var(--surface)";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!sendEmail || !isConfigured()) {
      setStatus("sent");
      setMessage(
        sendEmail
          ? "Form captured locally — EmailJS credentials are still placeholders."
          : "Received. This form is a placeholder and isn't wired to email yet.",
      );
      form.reset();
      onSent?.();
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SHOAL_EMAILJS_SERVICE_ID,
        SHOAL_EMAILJS_TEMPLATE_ID,
        {
          from_name: String(data.get("name") ?? ""),
          reply_to: String(data.get("email") ?? ""),
          project_type: String(data.get("project_type") ?? ""),
          message: String(data.get("description") ?? ""),
        },
        { publicKey: SHOAL_EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      setMessage("Sent. We'll get back to you shortly.");
      form.reset();
      onSent?.();
    } catch {
      setStatus("error");
      setMessage("Could not send right now. Try again or email us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="inq-name" className="mb-1.5 block font-mono text-[11px] text-dim">
          NAME
        </label>
        <input id="inq-name" name="name" required className="field-input" autoComplete="name" />
      </div>

      <div>
        <label htmlFor="inq-email" className="mb-1.5 block font-mono text-[11px] text-dim">
          EMAIL
        </label>
        <input
          id="inq-email"
          name="email"
          type="email"
          required
          className="field-input"
          autoComplete="email"
        />
      </div>

      {projectType !== undefined && (
        <div>
          <label htmlFor="inq-type" className="mb-1.5 block font-mono text-[11px] text-dim">
            PROJECT TYPE
          </label>
          <input
            id="inq-type"
            name="project_type"
            defaultValue={projectType}
            key={projectType}
            className="field-input"
          />
        </div>
      )}

      <div>
        <label htmlFor="inq-desc" className="mb-1.5 block font-mono text-[11px] text-dim">
          PROJECT DESCRIPTION
        </label>
        <textarea id="inq-desc" name="description" rows={5} required className="field-input" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={accent === "trace" ? "btn-trace w-full" : "btn-surface w-full"}
      >
        {status === "sending" ? "SENDING…" : "SUBMIT"}
      </button>

      {message && (
        <p
          role="status"
          className="font-mono text-[11px]"
          style={{ color: status === "error" ? "var(--destructive)" : accentColor }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
