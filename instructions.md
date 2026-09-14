# GitHub Copilot Instructions & Milestone Logs

## Project Guidelines for Copilot
- Target Python 3.10+ using Flask for backend routing and state evaluation.
- Keep the Sudoku solver modular, using deterministic backtracking with single-solution validation.
- Frontend must use vanilla JavaScript with browser LocalStorage persistence.
- Design for accessibility, responsive scaling, light/dark themes, and 3x3 alternating subgrid colors.

## Milestone Prompts & Screenshot Mapping

### Milestone 1: Test Framework Setup
- **Prompt:** Set up pytest unit test framework to verify initial board state generation and solver baseline.
- **Evidence Screenshot:** `Screenshots/initial_tests.png`
- **Result:** Test runner established; verified clean test passes before refactoring.

### Milestone 2: Unique Solution Solver
- **Prompt:** How do I implement a backtracking Sudoku solver in Python that ensures the board has exactly one unique solution?
- **Evidence Screenshot:** `Screenshots/copilot_unique_solution.png`
- **Evaluation / Rejection Note:** Copilot initially proposed a naive brute-force generator. This was evaluated and rejected due to heavy recursion overhead; replaced with a deterministic backtracking solver with counter validation.

### Milestone 3: Difficulty Clue Removal
- **Prompt:** How do I remove numbers from a complete Sudoku board to match Easy, Medium, and Hard difficulty levels while keeping a unique solution?
- **Evidence Screenshot:** `Screenshots/copilot_difficulty_logic.png`
- **Result:** Deterministic cell removal with symmetric clue counts matching target difficulty tiers.

### Milestone 4: Test Suite Generation & Regression
- **Prompt:** Write comprehensive pytest unit tests for sudoku_engine.py testing solver validity, unique solutions, and difficulty clue counts.
- **Evidence Screenshot:** `Screenshots/copilot_test_generation.png`
- **Result:** Expanded unit test suite passing 8 regression tests.

### Milestone 5: Top 10 LocalStorage Tracking
- **Prompt:** How do I check for a top 10 score and store the top 10 fastest Sudoku times with player names and difficulty in browser localStorage?
- **Evidence Screenshot:** `Screenshots/copilot_localstorage.png`
- **Result:** LocalStorage persistence tracking rank, name, time, difficulty, and hints used across sessions.

### Milestone 6: 3x3 Alternating Colors Grid Styling
- **Prompt:** How do I style the 9x9 Sudoku grid using CSS so that the alternating 3x3 sub-grids have distinct background colors without layout shifts?
- **Evidence Screenshot:** `Screenshots/copilot_grid_style.png`
- **Result:** Pure CSS styling alternating 3x3 block backgrounds seamlessly across themes.