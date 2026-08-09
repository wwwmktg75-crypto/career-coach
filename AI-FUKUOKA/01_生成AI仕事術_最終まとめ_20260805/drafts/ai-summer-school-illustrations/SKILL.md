---
name: ai-summer-school-illustrations
description: Generate or refine AI SUMMER SCHOOL 2026 slide illustrations, diagrams, and cut-in visuals using the shared mountain/camp/summer-school art direction. Use when working on cover art, curriculum maps, growth-step diagrams, AI concept illustrations, comparison visuals, or small supporting cuts that should match this deck's unified style.
---

# AI Summer School Illustrations

## Overview

Use this skill when AI SUMMER SCHOOL 2026 needs new illustrations that feel like one visual system rather than unrelated images.

Before generating, read `references/prompt-library.md`.

## Workflow

1. Identify the slide's job.
2. Pick the closest prompt family from `references/prompt-library.md`.
3. Rebuild it into a clean image-generation spec for the current slide.
4. Keep the shared worldbuilding and the shared avoid-list.
5. Generate 1-3 strong options, then place the chosen image into the deck.

## Prompt Rules

- Always inherit the shared style from `references/prompt-library.md`.
- Keep the worldbuilding consistent:
  - generated AI as a mountain climbed together
  - summer school / camp / field trip tone
  - adult learners, mixed gender, roughly 30s-50s
  - optimistic, safe, business-friendly
- Keep backgrounds light and slide-friendly.
- Do not generate text, logos, or watermarks inside the image.
- Prefer whitespace when the slide still needs headings or labels added in HTML.
- Avoid overly childish, anime-heavy, photoreal, cyber, or dark imagery.

## Choosing a Prompt Family

- Cover or first impression: use the main visual prompts.
- Chapter overview or one-page summary: use the map / roadmap prompts.
- Concept explanation: use the comparison, flow, loop, or guidance prompts.
- Small accents near slide edges: use the cut-illustration prompts.
- If no existing prompt matches, keep the same shared style and build a new prompt by analogy.

## Project Output Rules

- Save slide-bound images into `slides/images/`.
- Mirror the final chosen images into `public_html/images/` when the slide is also published.
- Prefer descriptive filenames such as:
  - `summer-school-cover-v2.png`
  - `ai-mountain-map.png`
  - `agent-loop-summer-school.png`
  - `cut-guide-woman.png`

## Good Defaults

- Use wide 16:9-friendly compositions.
- Keep diagrams readable at slide scale.
- Use the built-in image generation flow unless the user explicitly asks for another path.
- When generating multiple samples, make them meaningfully different:
  - one hero visual
  - one explanatory diagram
  - one small supporting cut

## References

- Shared prompt library and visual direction: `references/prompt-library.md`
