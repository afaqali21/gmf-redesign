"use client";

import { AnimatePresence, m } from "motion/react";
import { useActionState, useEffect, useId, useRef, type ReactNode } from "react";
import { submitComment, submitContact, submitQuote, type FormState } from "@/app/actions/enquiry";
import { quoteServices } from "@/content/forms";
import { CheckIcon, SendIcon } from "@/components/ui/Icons";

const initial: FormState = { status: "idle" };

const inputCls =
  "peer block w-full rounded-2xl bg-white px-5 pb-3 pt-6 text-[0.95rem] text-ink-950 ring-1 ring-inset ring-ink-950/10 transition-all duration-300 placeholder:text-transparent hover:ring-ink-950/20 focus:outline-none focus:ring-2 focus:ring-brand-600 aria-[invalid=true]:ring-brand-600";

/** Text input with a floating label. */
function Field({
  name,
  label,
  type = "text",
  required,
  error,
  defaultValue,
  autoComplete,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const id = useId();
  const errId = `${id}-err`;
  const common = {
    id,
    name,
    required,
    placeholder: label,
    defaultValue,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    className: `${inputCls} ${textarea ? "min-h-40 resize-y" : ""}`,
  };
  return (
    <div>
      <div className="relative">
        {textarea ? <textarea rows={6} {...common} /> : <input type={type} {...common} />}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-5 top-4 origin-left text-[0.95rem] text-ink-500 transition-all duration-200 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:font-semibold peer-focus:text-brand-700 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-semibold"
        >
          {label}
          {required && <span className="text-brand-600"> *</span>}
        </label>
      </div>
      {error && (
        <p id={errId} className="mt-1.5 pl-2 text-xs font-medium text-brand-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden anti-spam fields (replace the WordPress reCAPTCHA). */
function SpamGuard() {
  const started = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (started.current) started.current.value = String(Date.now());
  }, []);
  return (
    <>
      <input ref={started} type="hidden" name="started_at" defaultValue="" />
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

function Submit({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-8 py-4 text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_-10px_rgb(215_13_67/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgb(215_13_67/0.8)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
    >
      {pending ? (
        <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
      ) : (
        <SendIcon className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      )}
      {pending ? "Sending…" : children}
    </button>
  );
}

function Status({ state }: { state: FormState }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status !== "idle") ref.current?.focus();
  }, [state]);
  return (
    <div ref={ref} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
      <AnimatePresence>
        {state.message && (
          <m.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-start gap-3 rounded-2xl p-4 text-sm font-medium ${
              state.status === "success" ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20" : "bg-brand-50 text-brand-800 ring-1 ring-brand-600/20"
            }`}
          >
            {state.status === "success" && <CheckIcon className="mt-0.5 size-4 shrink-0" />}
            {state.message}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const v = (state: FormState, k: string) => (typeof state.values?.[k] === "string" ? (state.values[k] as string) : undefined);

/** /booking/ – "Get Quote To Grow Your Business" (fields as on the WordPress Form Maker form). */
export function QuoteForm({ title }: { title: string }) {
  const [state, action, pending] = useActionState(submitQuote, initial);
  const chosen = Array.isArray(state.values?.services) ? state.values.services : [];
  const done = state.status === "success";
  return (
    <form action={action} noValidate className="relative space-y-7" key={done ? "done" : "form"}>
      <SpamGuard />
      <p className="text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">{title}</p>
      <fieldset aria-describedby={state.errors?.services ? "services-err" : undefined}>
        <legend className="text-sm font-semibold text-ink-950">
          Services<span className="text-brand-600"> *</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {quoteServices.map((s) => (
            <label key={s} className="group cursor-pointer">
              <input type="checkbox" name="services" value={s} defaultChecked={chosen.includes(s)} className="peer sr-only" />
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ink-600 ring-1 ring-inset ring-ink-950/10 transition-all duration-300 group-hover:ring-brand-600/40 peer-checked:bg-ink-950 peer-checked:text-white peer-checked:ring-ink-950 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-600 [&>svg]:hidden peer-checked:[&>svg]:block">
                <CheckIcon className="size-3.5 text-brand-400" />
                {s}
              </span>
            </label>
          ))}
        </div>
        {state.errors?.services && (
          <p id="services-err" className="mt-2 pl-2 text-xs font-medium text-brand-700">
            {state.errors.services}
          </p>
        )}
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Name" required autoComplete="name" error={state.errors?.name} defaultValue={v(state, "name")} />
        <Field name="email" label="Email" type="email" required autoComplete="email" error={state.errors?.email} defaultValue={v(state, "email")} />
        <Field name="phone" label="Phone" type="tel" required autoComplete="tel" error={state.errors?.phone} defaultValue={v(state, "phone")} />
        <Field name="website" label="If you already have a website please share it with us" type="url" autoComplete="url" defaultValue={v(state, "website")} />
      </div>
      <Status state={state} />
      <Submit pending={pending}>Submit</Submit>
    </form>
  );
}

/** /contact/ – "Ask a question" (Contact Form 7 fields). */
export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const done = state.status === "success";
  return (
    <form action={action} noValidate className="relative space-y-4" key={done ? "done" : "form"}>
      <SpamGuard />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Your Name" required autoComplete="name" error={state.errors?.name} defaultValue={v(state, "name")} />
        <Field name="email" label="Your Email" type="email" required autoComplete="email" error={state.errors?.email} defaultValue={v(state, "email")} />
      </div>
      <Field name="title" label="Your Title" defaultValue={v(state, "title")} />
      <Field name="message" label="Your Message" textarea defaultValue={v(state, "message")} />
      <Status state={state} />
      <Submit pending={pending}>Send Message</Submit>
    </form>
  );
}

/** Blog "Leave a Comment." form. Comments are emailed for moderation (WordPress also held them). */
export function CommentForm({ postPath }: { postPath: string }) {
  const [state, action, pending] = useActionState(submitComment, initial);
  const done = state.status === "success";
  return (
    <form action={action} noValidate className="relative space-y-4" key={done ? "done" : "form"}>
      <SpamGuard />
      <input type="hidden" name="post" value={postPath} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Your Name" required autoComplete="name" error={state.errors?.name} defaultValue={v(state, "name")} />
        <Field name="email" label="Your Email" type="email" required autoComplete="email" error={state.errors?.email} defaultValue={v(state, "email")} />
      </div>
      <Field name="comment" label="Your Comment" textarea required error={state.errors?.comment} defaultValue={v(state, "comment")} />
      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-600">
        <input type="checkbox" name="consent" value="1" className="mt-1 size-4 shrink-0 accent-brand-600" aria-invalid={state.errors?.consent ? true : undefined} />
        <span>
          By using this form you agree with the storage and handling of your data by this website. <span className="text-brand-600">*</span>
          {state.errors?.consent && <span className="mt-1 block text-xs font-medium text-brand-700">{state.errors.consent}</span>}
        </span>
      </label>
      <Status state={state} />
      <Submit pending={pending}>Post a Comment</Submit>
    </form>
  );
}
