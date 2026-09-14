import pytest
from sudoku_engine import SudokuEngine


@pytest.fixture
def engine():
    return SudokuEngine()


def test_engine_initialization(engine):
    assert engine.size == 9
    assert engine.box_size == 3


def test_fill_board(engine):
    board = [[0 for _ in range(9)] for _ in range(9)]
    success = engine.fill_board(board)
    assert success is True
    assert all(all(cell != 0 for cell in row) for row in board)


def test_solution_uniqueness(engine):
    puzzle, solution = engine.generate_puzzle("easy")
    assert engine.count_solutions([r[:] for r in puzzle], limit=2) == 1


def test_difficulty_cell_counts(engine):
    easy_p, _ = engine.generate_puzzle("easy")
    hard_p, _ = engine.generate_puzzle("hard")
    easy_clues = sum(cell != 0 for row in easy_p for cell in row)
    hard_clues = sum(cell != 0 for row in hard_p for cell in row)
    assert easy_clues > hard_clues


def test_count_solutions_detects_multiple_solutions(engine):
    blank_board = [[0 for _ in range(9)] for _ in range(9)]
    assert engine.count_solutions([row[:] for row in blank_board], limit=2) == 2


def test_fill_board_creates_complete_valid_solution(engine):
    board = [[0 for _ in range(9)] for _ in range(9)]
    assert engine.fill_board(board) is True
    assert all(cell != 0 for row in board for cell in row)

    for row in range(9):
        assert sorted(board[row]) == list(range(1, 10))

    for col in range(9):
        column = [board[row][col] for row in range(9)]
        assert sorted(column) == list(range(1, 10))

    for box_row in range(0, 9, 3):
        for box_col in range(0, 9, 3):
            box_values = []
            for r in range(box_row, box_row + 3):
                for c in range(box_col, box_col + 3):
                    box_values.append(board[r][c])
            assert sorted(box_values) == list(range(1, 10))


def test_difficulty_levels_create_expected_clue_count_order(engine):
    easy_p, _ = engine.generate_puzzle("easy")
    medium_p, _ = engine.generate_puzzle("medium")
    hard_p, _ = engine.generate_puzzle("hard")

    easy_clues = sum(cell != 0 for row in easy_p for cell in row)
    medium_clues = sum(cell != 0 for row in medium_p for cell in row)
    hard_clues = sum(cell != 0 for row in hard_p for cell in row)

    assert easy_clues > medium_clues > hard_clues


def test_generated_puzzle_remains_unique_for_each_difficulty(engine):
    for difficulty in ["easy", "medium", "hard"]:
        puzzle, _ = engine.generate_puzzle(difficulty)
        assert engine.count_solutions([row[:] for row in puzzle], limit=2) == 1