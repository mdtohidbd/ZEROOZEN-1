# ZEROOZEN-1 — Project Memory

> Auto-synced | 157 observations

## 🏛️ CORE ARCHITECTURE

> **CRITICAL:** The following rules represent strict architectural boundaries defined by the user. NEVER violate them in your generated code or explanations.

# Intellectual Property & Architecture Rules
Write your strict architectural boundaries here. 
BrainSync will automatically enforce these rules across all agents (Cursor, Windsurf, Cline) 
and inject them into the memory context.

Example:
- NEVER use TailwindCSS. Only use vanilla CSS.
- NEVER write class components. Only use functional React components.

## 🛡️ GLOBAL SAFETY RULES

- **NEVER** run `git clean -fd` or `git reset --hard` without checking `git log` and verifying commits exist.
- **NEVER** delete untracked files or folders blindly. Always backup or stash before bulk edits.

## 🧭 ACTIVE CONTEXT

> Always read `.cursor/active-context.md` for exact instructions on the specific file you are currently editing. It updates dynamically.

## 🔴 STOP — READ THESE FIRST

- **Clean up effects — return cleanup function from useEffect** — Clean up effects — return cleanup function from useEffect
- **Don't create components inside other components — causes remount on every render** — Don't create components inside other components — causes remount on every render
- **Always use key prop when rendering lists — use unique ID, not array index** — Always use key prop when rendering lists — use unique ID, not array index
- **Don't call setState directly inside render or useEffect without deps array** — Don't call setState directly inside render or useEffect without deps array
- **Don't mix CommonJS (require) and ESM (import) in same project** — Don't mix CommonJS (require) and ESM (import) in same project

## 📐 Conventions

- Use Suspense and Error Boundaries for async operations
- Don't prop-drill more than 2 levels — use Context or state management
- Use useMemo for expensive computations, useCallback for stable references
- Enable strict mode in tsconfig.json
- Prefer Array methods (map, filter, reduce) over manual loops
- Use template literals for string interpolation, not concatenation
- Use optional chaining (?.) and nullish coalescing (??) for safe access
- Use const by default, let when reassignment needed, never var

## ⚡ Available Tools (ON-DEMAND only)
- `sys_core_02(title, content, category)` — Save a note + auto-detect conflicts
- `sys_core_03(items[])` — Save multiple notes in 1 call
- `sys_core_01(text)` — Search memory for architecture, past fixes, decisions
- `sys_core_05(text)` — Full-text search for details
- `sys_core_16()` — Check compiler errors after edits

> ℹ️ DO NOT call sys_core_14() or sys_core_08() at startup — context above IS your context.

---
*Auto-synced | 2026-06-09*
