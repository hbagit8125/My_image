---
title: "Sample post: replace me with your first article"
date: 2026-11-11
summary: "A placeholder that shows how blog posts look on this site and how to add your own."
tags: [Sample]
---

This is a sample post. It is here so the blog section has something to show, and
to demonstrate the formatting. Delete this file once you publish a real post.

## How to add a post

1. Create a new `.md` file in `content/blog/`. The file name becomes the address,
   so `fine-tuning-mistral.md` appears at `/blog/fine-tuning-mistral`.
2. Start the file with the block between the `---` lines at the top of this one:
   a title, a date, a one-line summary and some tags.
3. Write the post in Markdown below it and push to GitHub. Vercel rebuilds the
   site and the post appears.

## What formatting looks like

Paragraphs, **bold text**, *italics* and [links](https://www.linkedin.com/in/hashir-anwer) work as you would expect.

> Quotes are set off like this.

Code blocks are supported too:

```python
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2")
```

- Lists work
- So do `inline code` snippets

## Ideas for a first post

- What fine-tuning Mistral for billing codes taught you about data quality
- How you wrapped a fine-tuned model into a lightweight API
- Lessons from building reusable component libraries for a large React codebase
