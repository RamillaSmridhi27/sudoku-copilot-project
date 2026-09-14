# Evaluated and Rejected Copilot Suggestion:
# Copilot initially suggested a naive brute-force permutation without backtracking checks.
# This was rejected due to exponential recursion overhead; replaced with a deterministic backtracking solver.
import random
from typing import List, Tuple, Optional

Grid = List[List[int]]

class SudokuEngine:
    def __init__(self):
        self.size = 9
        self.box_size = 3

    def is_valid_entry(self, board: Grid, row: int, col: int, num: int) -> bool:
        if any(board[row][c] == num for c in range(self.size) if c != col):
            return False
        if any(board[r][col] == num for r in range(self.size) if r != row):
            return False
        start_row = (row // self.box_size) * self.box_size
        start_col = (col // self.box_size) * self.box_size
        for r in range(start_row, start_row + self.box_size):
            for c in range(start_col, start_col + self.box_size):
                if (r != row or c != col) and board[r][c] == num:
                    return False
        return True

    def _find_empty(self, board: Grid) -> Optional[Tuple[int, int]]:
        for r in range(self.size):
            for c in range(self.size):
                if board[r][c] == 0:
                    return (r, c)
        return None

    def fill_board(self, board: Grid) -> bool:
        empty = self._find_empty(board)
        if not empty:
            return True
        row, col = empty
        numbers = list(range(1, 10))
        random.shuffle(numbers)
        for num in numbers:
            if self.is_valid_entry(board, row, col, num):
                board[row][col] = num
                if self.fill_board(board):
                    return True
                board[row][col] = 0
        return False

    def count_solutions(self, board: Grid, limit: int = 2) -> int:
        empty = self._find_empty(board)
        if not empty:
            return 1
        row, col = empty
        solutions = 0
        for num in range(1, 10):
            if self.is_valid_entry(board, row, col, num):
                board[row][col] = num
                solutions += self.count_solutions(board, limit)
                board[row][col] = 0
                if solutions >= limit:
                    break
        return solutions

    def generate_puzzle(self, difficulty: str = "medium") -> Tuple[Grid, Grid]:
        clue_targets = {"easy": 38, "medium": 30, "hard": 24}
        target = clue_targets.get(difficulty.lower(), 30)
        solution_board = [[0 for _ in range(self.size)] for _ in range(self.size)]
        self.fill_board(solution_board)
        puzzle_board = [row[:] for row in solution_board]
        cells = [(r, c) for r in range(self.size) for c in range(self.size)]
        random.shuffle(cells)
        current_clues = 81
        for r, c in cells:
            if current_clues <= target:
                break
            backup = puzzle_board[r][c]
            puzzle_board[r][c] = 0
            test_copy = [row[:] for row in puzzle_board]
            if self.count_solutions(test_copy, limit=2) != 1:
                puzzle_board[r][c] = backup
            else:
                current_clues -= 1
        return puzzle_board, solution_board