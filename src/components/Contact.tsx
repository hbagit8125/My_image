"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Check, Copy, Mail, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal, Section, SpotlightCard } from "./ui";
import { profile } from "@/data/content";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          // Clipboard can be blocked; the value is still visible to copy by hand.
        }
      }}
      className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-line text-haze transition-colors hover:border-glow/60 hover:text-moon"
    >
      {copied ? <Check size={18} className="text-glow" /> : <Copy size={18} />}
    </button>
  );
}

function Channel({
  icon,
  label,
  value,
  href,
  copy,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  copy?: boolean;
}) {
  return (
    <SpotlightCard className="flex items-center gap-4 p-4 sm:p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-glow/25 bg-signal/10 text-glow">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-haze">{label}</p>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="block truncate font-medium text-moon after:absolute after:inset-0 after:rounded-[1.25rem] hover:text-glow"
        >
          {value}
        </a>
      </div>
      {copy && <CopyButton value={value} label={label.toLowerCase()} />}
    </SpotlightCard>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // No backend: the form opens the visitor's email app with the message filled in.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
    const body = encodeURIComponent(`${message}\n\n${name}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "mt-2 w-full rounded-xl border border-line bg-night/60 px-4 py-3 text-moon placeholder:text-haze/60 transition-colors focus:border-glow/70 focus:outline-none focus:ring-2 focus:ring-signal/30";

  return (
    <Section
      id="contact"
      title="Get in touch"
      lead="Have a role, a project or a question about something I've built? Send me a message and I'll get back to you."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="space-y-4">
          <Channel icon={<Mail size={20} />} label="Email" value={profile.email} href={`mailto:${profile.email}`} copy />
          <Channel icon={<Phone size={20} />} label="Phone" value={profile.phone} href={profile.phoneHref} copy />
          <Channel
            icon={<LinkedinIcon />}
            label="LinkedIn"
            value="linkedin.com/in/hashir-anwer"
            href={profile.linkedin}
          />
          <Channel icon={<GithubIcon />} label="GitHub" value="github.com/hbagit8125" href={profile.github} />
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="surface p-6 sm:p-8">
            <label className="block text-sm font-medium text-moon">
              Your name
              <input
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
            <label className="mt-5 block text-sm font-medium text-moon">
              Message
              <textarea
                className={`${field} min-h-36 resize-y`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-moon px-6 py-3 font-medium text-night shadow-glow transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send size={18} />
              Write email
            </button>
            <p className="mt-3 text-sm text-haze">
              This opens your email app with the message ready to send.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
