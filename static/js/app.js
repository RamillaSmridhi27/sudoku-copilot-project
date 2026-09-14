document.addEventListener("DOMContentLoaded", () => {
    let puzzleBoard = [];
    let solvedBoard = [];
    let initialClues = [];
    let timerInterval = null;
    let secondsElapsed = 0;
    let hintsUsed = 0;

    const gridEl = document.getElementById("sudokuGrid");
    const timerEl = document.getElementById("timer");
    const statusEl = document.getElementById("statusMessage");
    const diffSelect = document.getElementById("difficultySelect");
    const scoreboardBody = document.getElementById("scoreboardBody");

    const themeBtn = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("sudoku-theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const target = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", target);
        localStorage.setItem("sudoku-theme", target);
    });

    function startTimer() {
        clearInterval(timerInterval);
        secondsElapsed = 0;
        timerEl.textContent = "Time: 00:00";
        timerInterval = setInterval(() => {
            secondsElapsed++;
            const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
            const secs = String(secondsElapsed % 60).padStart(2, "0");
            timerEl.textContent = `Time: ${mins}:${secs}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function getBlockClass(r, c) {
        const blockRow = Math.floor(r / 3);
        const blockCol = Math.floor(c / 3);
        return (blockRow + blockCol) % 2 === 0 ? "block-a" : "block-b";
    }

    async function startNewGame() {
        statusEl.textContent = "Generating unique puzzle...";
        hintsUsed = 0;
        const diff = diffSelect.value;

        try {
            const res = await fetch(`/api/new-game?difficulty=${diff}`);
            const data = await res.json();
            puzzleBoard = data.puzzle;
            solvedBoard = data.solution;
            initialClues = data.puzzle.map(row => [...row]);

            renderGrid();
            startTimer();
            statusEl.textContent = "";
        } catch (err) {
            statusEl.textContent = "Failed to load puzzle. Please retry.";
        }
    }

    function renderGrid() {
        gridEl.innerHTML = "";
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.classList.add("cell", getBlockClass(r, c));
                input.dataset.row = r;
                input.dataset.col = c;

                if (c === 2 || c === 5) input.classList.add("border-right");
                if (r === 2 || r === 5) input.classList.add("border-bottom");

                if (initialClues[r][c] !== 0) {
                    input.value = initialClues[r][c];
                    input.readOnly = true;
                    input.classList.add("cell-locked");
                } else {
                    input.addEventListener("input", (e) => handleInput(e, r, c));
                }

                gridEl.appendChild(input);
            }
        }
    }

    async function handleInput(e, r, c) {
        const val = e.target.value;
        statusEl.textContent = "";
        e.target.classList.remove("cell-error", "cell-conflict");

        if (!/^[1-9]$/.test(val)) {
            e.target.value = "";
            puzzleBoard[r][c] = 0;
            return;
        }

        const num = parseInt(val, 10);
        puzzleBoard[r][c] = num;

        const res = await fetch("/api/validate-cell", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ board: puzzleBoard, row: r, col: c, value: num })
        });
        const data = await res.json();

        if (!data.valid) {
            e.target.classList.add("cell-conflict");
        }

        checkCompletion();
    }

    document.getElementById("hintBtn").addEventListener("click", () => {
        const emptyCells = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (puzzleBoard[r][c] === 0) {
                    emptyCells.push({ r, c });
                }
            }
        }

        if (emptyCells.length === 0) return;

        const pick = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const correctVal = solvedBoard[pick.r][pick.c];
        puzzleBoard[pick.r][pick.c] = correctVal;
        hintsUsed++;

        const input = document.querySelector(`input[data-row='${pick.r}'][data-col='${pick.c}']`);
        input.value = correctVal;
        input.readOnly = true;
        input.classList.add("cell-hint", "cell-locked");

        checkCompletion();
    });

    document.getElementById("checkBtn").addEventListener("click", () => {
        let hasErrors = false;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const input = document.querySelector(`input[data-row='${r}'][data-col='${c}']`);
                if (puzzleBoard[r][c] !== 0 && puzzleBoard[r][c] !== solvedBoard[r][c]) {
                    input.classList.add("cell-error");
                    hasErrors = true;
                }
            }
        }
        statusEl.textContent = hasErrors ? "Incorrect entries marked in red!" : "All current entries are correct!";
    });

    function checkCompletion() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (puzzleBoard[r][c] !== solvedBoard[r][c]) {
                    return;
                }
            }
        }

        stopTimer();
        statusEl.textContent = "🎉 Congratulations! You solved the Sudoku!";
        saveScore();
    }

    function getScores() {
        return JSON.parse(localStorage.getItem("sudoku-top10") || "[]");
    }

    function saveScore() {
        const playerName = prompt("Splendid! Enter your name for the leaderboard:") || "Anonymous";
        const scores = getScores();
        scores.push({
            name: playerName,
            time: secondsElapsed,
            difficulty: diffSelect.value,
            hints: hintsUsed
        });

        scores.sort((a, b) => a.time - b.time);
        const top10 = scores.slice(0, 10);
        localStorage.setItem("sudoku-top10", JSON.stringify(top10));
        renderScoreboard();
    }

    function renderScoreboard() {
        const scores = getScores();
        if (scores.length === 0) {
            scoreboardBody.innerHTML = `<tr><td colspan="5">No records yet. Be the first!</td></tr>`;
            return;
        }

        scoreboardBody.innerHTML = scores.map((s, idx) => {
            const mins = String(Math.floor(s.time / 60)).padStart(2, "0");
            const secs = String(s.time % 60).padStart(2, "0");
            return `
                <tr>
                    <td>${idx + 1}</td>
                    <td>${s.name}</td>
                    <td>${mins}:${secs}</td>
                    <td>${s.difficulty}</td>
                    <td>${s.hints}</td>
                </tr>
            `;
        }).join("");
    }

    document.getElementById("newGameBtn").addEventListener("click", startNewGame);
    renderScoreboard();
    startNewGame();
});