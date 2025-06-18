# Changelog

## 2025-06-17 - Power Puzzle PWR-005 Added
- Created power task `PWR-005` rendering digit 3 glyph across variable grid sizes using integer 3 tokens.

_Author: Cascade_

## 2025-06-17 - Power Puzzle PWR-004 Added
- Created advanced power task `PWR-004` (3×3 window extraction around first ⬛ fault in a 7×7 grid).

_Author: Cascade_

## 2025-06-17 - Puzzle Task Creation

### COM-002 to COM-005 Added
- Created new communication puzzles `COM-002` through `COM-005` with integer grids, simple rotations/reflections, and updated hints using ⬛.

_Author: Cascade_

## 2025-06-17 - Puzzle Task Creation
- Added or rewrote the following task JSON files with integer-based puzzles and hints:
  - `PWR-001`, `PWR-002`, `PWR-003`
  - `PL-001`, `PL-003`
  - `COM-001`
- All puzzles follow the FS-001 schema, use 0–9 integers (no raw emojis), and apply simple rotations/reflections.
- Each task now has `requiredRankLevel: 1` and `timeLimit: null` as per guidelines.

_Author: Cascade_

# Changelog

## 2025-06-17

### Emoji Set Correction for Task Files
- Updated all COM-XXX tasks to use `emojiSet: tech_set2`.
- Updated all FS-XXX tasks to use `emojiSet: tech_set1`.
- This ensures correct emoji palette mapping for communication and field systems tasks.

_Author: GPT 4.1 (Cascade AI)_

### Windows Compatibility: cross-env for Scripts
- Installed cross-env as a dev dependency.
- Updated `dev` and `start` scripts in package.json to use cross-env, allowing environment variables to work on Windows.
- Removed invalid JSON comments from package.json after lint feedback.
- Tested: `npm run dev` now works locally on Windows.

_Author: GPT 4.1 (Cascade AI)_


## 2025-06-17

### Task JSON Standardization - Improved Approach

- Updated specific task files to ensure `timeLimit` is set to `null`.
- Converted emoji grids in tasks using `tech_set1` and `tech_set2` to numeric format (1-9 system).
- Avoided using 0 (black square) in onboarding puzzles for better visual appeal.
- Replaced unknown emojis with 1 instead of 0 for clearer visuals.
- Created an improved script (`fix-task-files.js`) with better mapping for emoji conversion.

#### Design Philosophy
- For onboarding and basic tasks, visual clarity is important.
- The value 0 represents a black square and should be used sparingly in puzzles.
- All puzzles have proper numeric representations that maintain the original intent.

#### Tasks with Time Limit Updated (8 files)
COM-002, COM-004, COM-006, FS-002, FS-003, FS-006, FS-007, FS-009

#### Tech Set Tasks Converted to Numeric Format (17 files)
- `tech_set1` tasks: COM-001 through COM-007
- `tech_set2` tasks: FS-001 through FS-010
