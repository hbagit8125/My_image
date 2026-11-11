import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The home page is rebuilt on the server about once an hour (for GitHub data),
  // so the blog's Markdown files must ship with the server bundle.
  outputFileTracingIncludes: {
    "/": ["./content/blog/**/*"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
