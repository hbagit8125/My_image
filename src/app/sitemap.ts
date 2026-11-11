import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/blog`, priority: 0.6 },
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
