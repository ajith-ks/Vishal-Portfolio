---
name: targeted-fix
description: Systematic workflow for executing minimal, surgical bug fixes and refinements in the Dr. Vishal Kattery portfolio without collateral regressions.
---

# Targeted Fix Workflow

When tasked with fixing a bug, resolving a known issue, or refining a specific component in the portfolio, execute this strict step-by-step procedure.

---

## Step 1: Read Persistent Context
- Read [`AGENTS.md`](file:///d:/vishal%20portfolio/vishal-portfolio/AGENTS.md) and [`.agents/PROJECT_CONTEXT.md`](file:///d:/vishal%20portfolio/vishal-portfolio/.agents/PROJECT_CONTEXT.md) before inspecting anything else.
- Identify known issues, related file pointers, and constraints relevant to the target problem.

## Step 2: Determine Smallest File Set
- Never perform repository-wide file searches, directory walks, or full-tree reads.
- Identify the 1–3 specific files directly responsible for the problem (e.g. `src/styles/main.css`, `src/styles/variables.css`, or `src/main.js`).
- Inspect only the relevant line ranges in those files.

## Step 3: Reproduce the Issue
- Pinpoint the exact condition or trigger leading to the bug (e.g., viewport width <= 360px, `data-theme="light"` contrast, or missing email handler).
- Verify the current rendered DOM structure or computed style behavior that produces the defect.

## Step 4: Identify Root Cause
- Isolate the underlying mechanism:
  - Is it a missing CSS variable or insufficient contrast ratio in `variables.css`?
  - Is it an incorrect layout offset or fixed padding in `main.css`?
  - Is it a flawed DOM event listener, missing attribute, or faulty client-side handler in `main.js`?
- Avoid treating symptoms with ad-hoc overrides; fix the core rule.

## Step 5: Implement the Smallest Safe Fix
- Apply surgical edits to the identified lines using targeted file replacement tools.
- Maintain existing naming conventions, code formatting, and architecture.
- Do not refactor adjacent functions, restructure CSS selectors, or introduce external libraries.
- Ensure that accessibility guarantees (e.g., `prefers-reduced-motion`) are preserved.

## Step 6: Targeted Checks & Verification
- Perform focused checks on the modified component or style rule.
- Verify across both Dark and Light themes.
- If the fix impacts responsiveness, verify at boundary breakpoints (e.g. 320px, 360px, 480px, 768px, 1024px, 1440px).

## Step 7: Run Production Build
- Run the project build command to ensure no syntax errors, bundling failures, or testimonial pipeline breaks:
  ```bash
  npm run build
  ```
- Ensure the build exits with code `0`.

## Step 8: Update Project Context (If Verified Facts Changed)
- If the fix changes verified facts (e.g., resolving one of the Known Issues in `PROJECT_CONTEXT.md`), update the status in `.agents/PROJECT_CONTEXT.md`.
- Never invent claims or remove active tracking items that remain unresolved.

## Step 9: Report Results
- Report concisely:
  1. Root cause identified.
  2. Exact files and line numbers modified.
  3. Verification outcome and build result (`npm run build`).
