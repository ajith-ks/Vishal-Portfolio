# AGENTS.md — Agent Operating Rules

This repository hosts the official personal and professional portfolio website for **Dr. Vishal Kattery**.
All AI agents, coding assistants, and automated tooling operating in this repository must strictly adhere to the following rules.

---

## 1. Mandatory First Action
- **Always read `AGENTS.md` and `.agents/PROJECT_CONTEXT.md` first** before performing any investigation, code edit, or documentation task.
- Treat `.agents/PROJECT_CONTEXT.md` as the authoritative record of verified architectural and technical facts.

## 2. Minimal Exploration & Focused Reads
- **Read only task-relevant files and their immediate dependencies.**
- **Strictly NO full-tree repository scans** (e.g., broad `dir /s`, recursive listings of all files, or dumping `node_modules` / asset trees) for localized or small changes.
- Identify the exact component, style, or data file related to the task and inspect only what is required to reproduce, diagnose, and fix the issue.

## 3. Minimal Maintainable Changes
- Make the **smallest safe and maintainable change** necessary to resolve the task.
- Strictly adhere to existing architectural patterns, folder hierarchy, code styling, and component naming conventions.
- Do not perform gratuitous refactors, reorganize project folders, or restyle unrelated sections.

## 4. Reuse Installed Libraries
- **Reuse existing libraries and utilities already installed**:
  - `vite` (bundler and dev server)
  - `three` (WebGL 3D sculpture in hero)
  - `lenis` (smooth scrolling)
  - `xlsx` (Excel parsing for testimonial pipeline)
- **Zero new dependencies**: Do not install additional npm packages or introduce agent frameworks unless explicitly approved by the user.

## 5. Visual Reference Guardrail
- The `Website inspo/` directory contains visual design inspiration only.
- It is **never a source of facts**, biographical claims, metrics, or credentials.

## 6. Factual Integrity & Ground Truth
- **Use real assets and data only**:
  - The ground truth biographical data resides in `Vishal Resume.pdf`, `PRD.pdf`, `docs/resume_extracted.txt`, and `docs/prd_extracted.txt`.
  - The authoritative testimonials reside in `content/testimonials/testimonials.xlsx`.
- **NEVER invent, hallucinate, or fabricate**:
  - Testimonials or student/faculty feedback
  - Academic publications or citations
  - Events, speaking engagements, or awards
  - Institutional affiliations, degrees, or metrics

## 7. Build, Base & Deployment Stability
- **Preserve Vite base path**: `base: '/Vishal-Portfolio/'` in `vite.config.js` must remain unchanged for GitHub Pages compatibility.
- **Preserve GitHub Actions deployment**: `.github/workflows/deploy.yml` must remain intact.
- **No framework migrations**: Do not migrate to React, Vue, Svelte, Next.js, or any other framework. Keep the lightweight Vanilla JS + Vite architecture.
- **Single project boundary**: Do not create secondary projects, sub-packages, or additional `package.json` files.

## 8. Strict Git Command Restriction
- **NEVER commit, push, publish, deploy, or run Git commands** (`git commit`, `git push`, `git checkout`, `git reset`, `git stash`, etc.) without explicit permission from the user.

## 9. Verification & Build Workflow
- After making code changes, always run focused checks first.
- Run the production build command to verify that build and prebuild hooks succeed cleanly:
  ```bash
  npm run build
  ```
- Verify that `prebuild` (`node scripts/convert-testimonials.js`) completes without errors and Vite bundles assets properly into `dist/`.

## 10. Context Maintenance
- Update `.agents/PROJECT_CONTEXT.md` **only when verified facts change** (e.g., when a known issue is resolved, an asset is added or replaced, or an architectural component is updated).
- Never add unverified claims to `PROJECT_CONTEXT.md`.

## 11. Accessibility & Motion Compliance
- **Always respect `prefers-reduced-motion`**:
  - Any CSS transition, keyframe animation, parallax effect, or Three.js loop must honor user motion preferences.
  - Test visual changes with `prefers-reduced-motion: reduce` to ensure accessible, static fallbacks.
