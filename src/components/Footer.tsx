import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Avatar from "./Avatar";
import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-3">
          <Avatar size={36} />
          <div>
            <p className="font-display font-semibold">{profile.name}</p>
            <p className="text-sm text-haze">
              {profile.role}, {profile.location}
            </p>
          </div>
        </div>
        <Link
          href="/#top"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-haze transition-colors hover:border-glow/60 hover:text-moon"
        >
          <ArrowUp size={16} />
          Back to top
        </Link>
      </div>
    </footer>
  );
}
