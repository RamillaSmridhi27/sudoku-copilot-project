# Modern Sudoku Challenge (AI-Assisted Development)

An interactive, responsive full-stack Sudoku web application developed using GitHub Copilot assistance, featuring dynamic puzzle generation, multiple difficulty tiers, real-time move validation, and a local storage leaderboard.

## Key Features
- **Deterministic Difficulty Generation:** Generates valid boards for Easy, Medium, and Hard tiers with guaranteed unique solutions.
- **Interactive UI:** Dynamic cell highlighting, error checking, hints, auto-timer, and dark/light theme switching.
- **Client-Side Persistence:** Top 10 fastest times tracked per difficulty level with names and hints via browser LocalStorage.
- **3x3 Subgrid Styling:** Alternating block backgrounds designed for responsive layout integrity.
- **Rigorous Verification:** Unit-tested backend engine powered by pytest.

## Project Structure
```text
sudoku-copilot-project/
├── app.py                     # Flask routing and API endpoints
├── sudoku_engine.py           # Core backtracking solver and generator
├── instructions.md            # Copilot prompt logs and milestone mapping
├── README.md                  # Project overview and run guide
├── requirements.txt           # Python dependencies
├── Screenshots/               # Verification milestones and UI evidence
│   ├── initial_tests.png
│   ├── copilot_unique_solution.png
│   ├── copilot_difficulty_logic.png
│   ├── copilot_test_generation.png
│   ├── copilot_localstorage.png
│   ├── copilot_grid_style.png
│   ├── ui_gameplay.png
│   ├── ui_theme_toggle.png
│   └── ui_hint_feature.png
├── static/
│   ├── css/style.css          # Responsive design and dark mode styling
│   └── js/app.js              # Client state, timer, and DOM events
├── templates/
│   └── index.html             # Application markup
└── tests/
    └── test_sudoku.py         # Pytest regression and logic test suite

Setup & Running Locally
1.Activate Virtual Environment:
PowerShell
.\.venv\Scripts\activate

2.Install Dependencies:
PowerShell
pip install -r requirements.txt

3.Run Unit Tests (Required Test Command):
PowerShell
python -m pytest -q

4.Launch Application:
PowerShell
python app.py

Open http://127.0.0.1:5000 in your web browser.