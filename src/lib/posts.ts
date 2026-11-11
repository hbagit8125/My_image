import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const dir = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

async function readPost(file: string): Promise<Post> {
  const raw = await fs.readFile(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? "Untitled"),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / 200)),
    html: await marked.parse(content),
  };
}

/** All posts, newest first. Posts are Markdown files in content/blog. */
export async function getPosts(): Promise<PostMeta[]> {
  "use cache";
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".md"));
  const posts = await Promise.all(files.map(readPost));
  return posts
    .map(
      (p): PostMeta => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        summary: p.summary,
        tags: p.tags,
        readingMinutes: p.readingMinutes,
      }),
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache";
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  try {
    return await readPost(`${slug}.md`);
  } catch {
    return null;
  }
}

export function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
