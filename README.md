# Modern Sudoku Challenge (AI-Assisted Development)

An interactive, responsive full-stack Sudoku web application developed using GitHub Copilot assistance, featuring dynamic puzzle generation, multiple difficulty tiers, real-time move validation, and a local storage leaderboard.

## Key Features
- **Deterministic Difficulty Generation:** Generates valid boards for Easy, Medium, and Hard tiers with guaranteed unique solutions.
- **Interactive UI:** Dynamic cell highlighting, error checking, hints, auto-timer, and dark/light theme switching.
- **Client-Side Persistence:** High-score leaderboard tracked per difficulty level via browser LocalStorage.
- **Rigorous Verification:** Unit-tested backend engine powered by pytest.

## Project Structure
```text
sudoku-copilot-project/
├── app.py                     # Flask routing and API endpoints
├── sudoku_engine.py           # Core backtracking solver and generator
├── instructions.md            # Copilot prompt logs and milestone mapping
├── README.md                  # Project overview and run guide
├── requirements.txt           # Python dependencies
├── Screenshots/               # Verification milestones and Copilot logs
│   ├── initial_tests.png
│   ├── copilot_unique_solution.png
│   ├── copilot_difficulty_logic.png
│   └── copilot_test_generation.png
├── static/
│   ├── css/style.css          # Responsive design and dark mode styling
│   └── js/app.js              # Client state, timer, and DOM events
├── templates/
│   └── index.html             # Application markup
└── tests/
    └── test_sudoku.py         # Pytest regression and logic test suite