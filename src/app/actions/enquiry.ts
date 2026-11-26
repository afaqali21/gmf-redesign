"use server";

import nodemailer from "nodemailer";
import { site } from "@/content/site";
import { quoteServices } from "@/content/forms";

/*
 * Handles the three forms carried over from WordPress: the quote request (/booking/, Form Maker),
 * the contact form (/contact/, Contact Form 7) and blog comments (sent for moderation).
 *
 * Every enquiry is emailed to info@globalmarketingfirm.co.uk (override with ENQUIRY_TO, comma-separated).
 * Delivery, in order of preference (configure in the hosting environment, see .env.example):
 *   SMTP_HOST + SMTP_USER + SMTP_PASS (+ SMTP_PORT)  -> sent through GMF's own mailbox (nodemailer)
 *   RESEND_API_KEY (+ ENQUIRY_FROM)                  -> email via the Resend HTTP API
 *   ENQUIRY_WEBHOOK_URL                              -> JSON POST to any webhook (Zapier, Make, CRM…)
 * Without any of them, development logs the enquiry; production returns an error asking the visitor
 * to phone or email instead, so no enquiry is ever silently lost.
 */

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string | string[]>;
};

type Kind = "quote" | "contact" | "comment";


const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim().slice(0, 5000);
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

async function deliver(kind: Kind, subject: string, fields: Record<string, string>) {
  const text = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const to = (process.env.ENQUIRY_TO ?? site.email).split(",").map((s) => s.trim()).filter(Boolean);

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      // 465 = TLS from the start; 587/25 upgrade with STARTTLS. SMTP_SECURE overrides.
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      // Sent from the mailbox itself, so the provider accepts it and it passes SPF/DKIM.
      from: { name: `${site.name} website`, address: process.env.ENQUIRY_FROM ?? process.env.SMTP_USER },
      to,
      replyTo: fields.Email || undefined,
      subject,
      text,
    });
    return;
  }
  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM ?? `Website <no-reply@globalmarketingfirm.co.uk>`,
        to,
        reply_to: fields.Email || undefined,
        subject,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Email delivery failed (${res.status})`);
    return;
  }
  if (process.env.ENQUIRY_WEBHOOK_URL) {
    const res = await fetch(process.env.ENQUIRY_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, subject, fields, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook delivery failed (${res.status})`);
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    console.info(`[enquiry:${kind}] ${subject}\n${text}`);
    return;
  }
  throw new Error("No enquiry delivery is configured");
}

/** Spam checks that replace the WordPress reCAPTCHA: a hidden honeypot field and a minimum fill time. */
function looksLikeSpam(fd: FormData) {
  if (str(fd, "company_url")) return true;
  const started = Number(str(fd, "started_at"));
  return Number.isFinite(started) && started > 0 && Date.now() - started < 2500;
}

const failure = (values: FormState["values"]): FormState => ({
  status: "error",
  values,
  message: `Sorry, we couldn't send your message. Please call us on ${site.phone.display} or email ${site.email}.`,
});

export async function submitQuote(_prev: FormState, fd: FormData): Promise<FormState> {
  const services = fd.getAll("services").map(String).filter((s) => (quoteServices as readonly string[]).includes(s));
  const values = { name: str(fd, "name"), email: str(fd, "email"), phone: str(fd, "phone"), website: str(fd, "website"), services };
  const errors: Record<string, string> = {};
  if (!services.length) errors.services = "Please choose at least one service.";
  if (!values.name) errors.name = "Please enter your name.";
  if (!isEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  if (Object.keys(errors).length) return { status: "error", errors, values, message: "Please check the highlighted fields." };
  if (looksLikeSpam(fd)) return { status: "success", message: "Thank you! We'll be in touch shortly." };
  try {
    await deliver("quote", `Quote request: ${values.name}`, {
      Services: services.join(", "),
      Name: values.name,
      Email: values.email,
      Phone: values.phone,
      Website: values.website,
    });
    return { status: "success", message: "Thank you! Your quote request has been sent. We'll be in touch shortly." };
  } catch (e) {
    console.error(e);
    return failure(values);
  }
}

export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = { name: str(fd, "name"), email: str(fd, "email"), title: str(fd, "title"), message: str(fd, "message") };
  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Please enter your name.";
  if (!isEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (Object.keys(errors).length) return { status: "error", errors, values, message: "Please check the highlighted fields." };
  if (looksLikeSpam(fd)) return { status: "success", message: "Thank you for your message. It has been sent." };
  try {
    await deliver("contact", `Website message: ${values.title || values.name}`, {
      Name: values.name,
      Email: values.email,
      Title: values.title,
      Message: values.message,
    });
    return { status: "success", message: "Thank you for your message. It has been sent." };
  } catch (e) {
    console.error(e);
    return failure(values);
  }
}

export async function submitComment(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = { name: str(fd, "name"), email: str(fd, "email"), comment: str(fd, "comment"), post: str(fd, "post") };
  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Please enter your name.";
  if (!isEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.comment) errors.comment = "Please write a comment.";
  if (fd.get("consent") !== "1") errors.consent = "Please accept the storage and handling of your data.";
  if (Object.keys(errors).length) return { status: "error", errors, values, message: "Please check the highlighted fields." };
  if (looksLikeSpam(fd)) return { status: "success", message: "Thank you! Your comment is awaiting moderation." };
  try {
    await deliver("comment", `New blog comment on ${values.post}`, {
      Post: `${site.url}${values.post}`,
      Name: values.name,
      Email: values.email,
      Comment: values.comment,
    });
    return { status: "success", message: "Thank you! Your comment is awaiting moderation." };
  } catch (e) {
    console.error(e);
    return failure(values);
  }
}
