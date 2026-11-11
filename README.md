# Hashir Bin Anwer — Portfolio

Personal portfolio website built with Next.js (App Router), TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All text on the site (profile, skills, experience, projects, achievements) lives in
`src/data/content.ts`. Update that file and the site follows.

- Photos: `public/images/`
- Resume: `public/Hashir_Bin_Anwer_Resume.pdf`
- Blog posts: Markdown files in `content/blog/`

## Writing a blog post

1. Create a `.md` file in `content/blog/`. The file name becomes the address, so
   `my-post.md` appears at `/blog/my-post`.
2. Start it with this block, then write the post in Markdown below it:

   ```md
   ---
   title: "Post title"
   date: 2026-11-12
   summary: "One line shown on the card."
   tags: [AI, Web]
   ---
   ```

3. Push to GitHub. The site rebuilds and the post appears.

## Deploying

Import the repository in [Vercel](https://vercel.com/new). No configuration is needed.
