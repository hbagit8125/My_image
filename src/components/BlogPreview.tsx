"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Section, SpotlightCard } from "./ui";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post, dateLabel }: { post: PostMeta; dateLabel: string }) {
  return (
    <SpotlightCard className="group flex h-full flex-col p-6">
      <p className="font-mono text-xs text-glow">
        {dateLabel} / {post.readingMinutes} min read
      </p>
      <h3 className="mt-3 text-2xl font-semibold">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-[1.25rem]">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-haze">{post.summary}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <ArrowUpRight
          aria-hidden="true"
          size={20}
          className="shrink-0 text-haze transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glow"
        />
      </div>
    </SpotlightCard>
  );
}

export default function BlogPreview({
  posts,
}: {
  posts: (PostMeta & { dateLabel: string })[];
}) {
  return (
    <Section id="blog" title="Blog" lead="Notes on machine learning, LLMs and building for the web.">
      {posts.length === 0 ? (
        <p className="text-haze">No posts yet. The first one is on its way.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <PostCard post={p} dateLabel={p.dateLabel} />
            </Reveal>
          ))}
        </div>
      )}
      {posts.length > 3 && (
        <Link
          href="/blog"
          className="mt-8 inline-flex rounded-full border border-line px-5 py-2.5 font-medium text-moon transition-colors hover:border-glow/60"
        >
          Read all posts
        </Link>
      )}
    </Section>
  );
}
