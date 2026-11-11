import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PostCard } from "@/components/BlogPreview";
import { formatDate, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on machine learning, LLMs and building for the web.",
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-svh max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <h1 className="text-5xl font-semibold sm:text-6xl">Blog</h1>
        <p className="mt-4 max-w-2xl text-lg text-haze">
          Notes on machine learning, LLMs and building for the web.
        </p>
        {posts.length === 0 ? (
          <p className="mt-12 text-haze">No posts yet. The first one is on its way.</p>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} dateLabel={formatDate(p.date)} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
