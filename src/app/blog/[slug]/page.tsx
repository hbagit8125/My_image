import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { formatDate, getPost, getPosts } from "@/lib/posts";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return post ? { title: post.title, description: post.summary } : { title: "Post not found" };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-svh max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-haze hover:text-glow">
          <ArrowLeft size={16} />
          All posts
        </Link>
        <article className="mt-8">
          <p className="font-mono text-sm text-glow">
            {formatDate(post.date)} / {post.readingMinutes} min read
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{post.title}</h1>
          {post.summary && <p className="mt-5 text-xl text-haze">{post.summary}</p>}
          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          {/* Post HTML comes from Markdown files in this repository, not from visitors. */}
          <div className="prose-night mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
      <Footer />
    </>
  );
}
