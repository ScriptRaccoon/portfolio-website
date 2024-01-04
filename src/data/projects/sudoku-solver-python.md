---
name: Efficient Sudoku solver
teaser: made with Python and constraint programming
repository: https://github.com/ScriptRaccoon/sudoku-solver-python
url:
tutorial: https://www.youtube.com/watch?v=5PRzPNoSWEs
tags: ["Algorithms", "Python"]
date: 2023-11-27
---

This is an efficient Sudoku solving algorithm using constraint programming, written in Python. It is very much inspired by (but different from) Peter Norvig's [Solving Every Sudoku Puzzle](https://norvig.com/sudoku.html). It generates quickly all solutions to a given Sudoku (usually in less than 100ms).

The basic idea is to keep track of all the candidates (possible digits) which can go into a square that is not filled yet. When only one candidate is left, place it (this is called a _naked single_). Otherwise, find a square that has the least number of candidates (in practice, that number is usually 1 or 2) and try them one after another. Every time a digit is set, it is removed as a candidate from all of its peers - these are the squares that are in the same unit (row, column or box). Recursively apply this procedure until all squares are filled.

The solver produces a generator containing all solutions. When a contradiction has been found (that is, 0 candidates were left in a square), we do not require backtracking explicitly: it just means that the current search branch did not yield any new solution, and we just continue with the next one.

To make the algorithm even faster, the _hidden single_ strategy has been implemented. A hidden single is a digit that can only go in one square of a unit. In this case, the square is filled with that digit and we continue.
