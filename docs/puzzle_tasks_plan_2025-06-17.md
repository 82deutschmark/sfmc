# Puzzle Puzzle-Creation Developer Guide (last updated 2025-06-17)
*Author: Cascade*

> This guide distills the key standards and lessons learned while building the 2025-06-17 puzzle set. Follow these rules to create **any new puzzle JSON** so that it plugs into the SFMC game engine without surprises.

---

## 1. Core Schema Requirements
1. Base your file on the structure in `FS-001.json`.
2. Mandatory top-level fields:
   • `id` – unique code like `PL-010`  
   • `title`, `description`, `category`, `difficulty`, `gridSize`  
   • `timeLimit` – **always** `null`  
   • `basePoints` – scale roughly with difficulty  
   • `requiredRankLevel` – **always** `1`  
   • `emojiSet` – exact key from `spaceEmojis.ts` (e.g. `tech_set1`, `status_alerts`).
3. Arrays:
   • `examples` – at least **two** worked examples (`input` ➜ `output`).  
   • `testInput` / `testOutput` – evaluation pair.
4. All grids must use the integers **0-9** only.  
   • `0` maps to the ⬛ background.  
   • Never embed raw emoji glyphs in JSON.

## 2. Transformation Playbook
Stick to simple, visually clear ARC transformations described in `attached_assets/arc_transformations.md`:
- Geometric: rotation (90°, 180°, 270°), reflections (horizontal, vertical, diagonal).
- Simple token operations: swap two numbers, replace color, isolate diagonal, etc.
- Keep grids ≤ 4×4 for basic difficulty; expand cautiously for tougher tiers.

## 3. Hint Writing Guidelines
- Provide **3 concise hints** in `hints` array.
- Refer to the background as **⬛** (not "0").
- Hint 1: one-line plain-English transformation cue.  
  Hint 2: short mechanical description (e.g., "Rows become columns from left to right").  
  Hint 3: background clarification ("⬛ moves/rotates like any other cell").

## 4. Workflow Checklist
1. Pick an unused `id` (sequential numbering within the category).
2. Decide a single, clear transformation.
3. Draft **two examples** that demonstrate the rule unambiguously.
4. Create a distinct `testInput` / `testOutput` pair.
5. Validate JSON with a linter.
6. Update `docs/CHANGELOG.md` with timestamp and summary.

## 5. File Locations
```
server/data/tasks/         ← all puzzle JSONs live here
client/src/constants/      ← emoji set definitions (DO NOT EDIT!)
attached_assets/           ← transformation reference docs
```

---

### Ready-to-Do Template (copy & replace fields)
```jsonc
{
  "id": "<CATEGORY-XXX>",
  "title": "<Creative title incorporating the logic of the transformation>",
  "description": "<Creative player-facing story about the task as it relates to the operations of ground control at the US Space Force>",
  "category": "<COM Communications / FS Fuel Systems / NAV Navigation / OS Oxygen Sensors / PL Pre-Launch / PWR Power Systems / SEC Security>",
  "difficulty": "Basic",
  "gridSize": 3,
  "timeLimit": null,
  "basePoints": 500,
  "requiredRankLevel": 1,
  "emojiSet": "<EMOJI-SET-NAME>",
  "examples": [ /* two example objects */ ],
  "testInput": [ /* grid */ ],
  "testOutput": [ /* grid */ ],
  "hints": [
    "<Hint 1>",
    "<Hint 2>",
    "⬛ <background clarification>"
  ]
}
```

---

## Recently Completed Tasks (reference)
- `PWR-001` … `PWR-003`
- `COM-001` … `COM-005`
- `PL-001`, `PL-003`

Use them as live examples for formatting and transformation ideas.

*Author: Cascade*

## Overview
The following plan outlines the steps required to generate or rewrite basic emoji-based puzzles for several task JSON files. All puzzles must:
1. Follow the task schema demonstrated in `FS-001.json`.
2. Leverage simple ARC-style transformations (pattern completion, reflection, rotation) documented in `arc_transformations.md`.
3. Use only the `0-9` integer tokens which the game engine later maps to the exact emoji sets defined in `spaceEmojis.ts` (source of truth – **no direct emoji characters in JSON**).
4. Mirror the style and structure of the validated example `NAV-001.json`.
5. Include clear, concise comments where the schema allows (e.g., `"meta"` / `"description"` fields) for designers.

## Files to Modify
- `server/data/tasks/PWR-001.json`
- `server/data/tasks/PWR-002.json`
- `server/data/tasks/PWR-003.json`
- `server/data/tasks/COM-001.json` *(rewrite)*
- `server/data/tasks/PL-001.json`
- `server/data/tasks/PL-003.json`

## Reference Files (Read-Only)
- `server/data/tasks/FS-001.json`  – schema template
- `server/data/tasks/NAV-001.json` – validated example puzzle
- `attached_assets/arc_transformations.md` – catalogue of permitted transformations
- `client/src/constants/spaceEmojis.ts` – **source of truth for emoji mapping**

## Tasks Checklist
- [x] Review schema in **FS-001.json**
- [x] Review transformation guidelines in **arc_transformations.md**
- [x] Review emoji mapping in **spaceEmojis.ts**
- [x] Review example **NAV-001.json**



## Transformation Strategy
We will employ easy-to-grasp ARC transformations to keep puzzles accessible:
1. **Horizontal / Vertical Reflection** – Mirror patterns across an axis.
2. **90° Rotation** – Rotate sub-grids or entire grids.
3. **Simple Repetition / Pattern Extension** – Continue observable numeric patterns.
4. **Color / Token Replacement** – Swap specific numeric tokens using a mapping rule.



