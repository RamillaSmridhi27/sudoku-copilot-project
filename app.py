from flask import Flask, render_template, jsonify, request
from sudoku_engine import SudokuEngine

app = Flask(__name__)
engine = SudokuEngine()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/new-game", methods=["GET"])
def new_game():
    difficulty = request.args.get("difficulty", "medium")
    puzzle, solution = engine.generate_puzzle(difficulty)
    return jsonify({
        "puzzle": puzzle,
        "solution": solution,
        "difficulty": difficulty
    })

@app.route("/api/validate-cell", methods=["POST"])
def validate_cell():
    data = request.get_json() or {}
    board = data.get("board")
    row = data.get("row")
    col = data.get("col")
    value = data.get("value")
    
    if None in (board, row, col, value):
        return jsonify({"valid": False, "error": "Invalid request payload"}), 400
        
    is_valid = engine.is_valid_entry(board, row, col, value)
    return jsonify({"valid": is_valid})

if __name__ == "__main__":
    app.run(debug=True)