import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-cycle
import { computeShortestPath } from "./shortestPath";
// eslint-disable-next-line import/no-cycle
import { SquareState } from "./Square";

import { clamp, getPseudoRandomIdx, to1DIdx } from "./utils";

export const MAX_ROWS = 20;
export const MAX_COLS = 20;

export type GridT = Uint8Array;

const initGrid = (rows: number = 10, cols: number = 10): GridT => {
	const grid: GridT = new Uint8Array(rows * cols);

	const idx = to1DIdx(cols);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			grid[idx(i, j)] = SquareState.Filled;
		}
	}

	grid[idx(getPseudoRandomIdx(rows), 0)] = SquareState.Start;
	grid[idx(getPseudoRandomIdx(rows), cols - 1)] = SquareState.End;

	return grid;
};

interface State {
	grid: GridT;

	rows: number;
	cols: number;

	dirtyRows: number;
	dirtyCols: number;

	hasShortestPath: boolean;
	indicesOfShortestPathSquares: Uint8Array;
}

const getDefaultState = (): State => ({
	grid: initGrid(), //
	rows: 10,
	cols: 10,
	dirtyRows: 10,
	dirtyCols: 10,
	hasShortestPath: false,
	indicesOfShortestPathSquares: new Uint8Array(),
});

const initialState: State = getDefaultState();

export const slice = createSlice({
	name: "grid",
	initialState,
	reducers: {
		reset: (): State => getDefaultState(),
		eventuallySetRows: (state, action: PayloadAction<number>): void => {
			state.dirtyRows = clamp(action.payload, 1, MAX_ROWS);
		},
		eventuallySetCols: (state, action): void => {
			state.dirtyCols = clamp(action.payload, 1, MAX_COLS);
		},
		commitResize: (state): void => {
			state.rows = state.dirtyRows;
			state.cols = state.dirtyCols;
			state.grid = initGrid(state.dirtyRows, state.dirtyCols);

			state.hasShortestPath = false;
			state.indicesOfShortestPathSquares = new Uint8Array();
		},
		clickSquare: {
			reducer: (
				state,
				action: PayloadAction<{
					squareState: SquareState;
					grid: GridT;
					hasShortestPath: boolean;
					indicesOfShortestPathSquares: Uint8Array;
				}>
			): void => {
				const { grid, squareState, hasShortestPath, indicesOfShortestPathSquares } = action.payload;

				if ([SquareState.Start, SquareState.End].includes(squareState)) {
					return;
				}

				state.grid = grid;
				state.hasShortestPath = hasShortestPath;
				state.indicesOfShortestPathSquares = indicesOfShortestPathSquares;
			},
			prepare: (rows: number, cols: number, squareState: SquareState, row: number, col: number, grid: GridT) => {
				const newGrid: GridT = new Uint8Array(grid);

				const idx = to1DIdx(cols);
				const targetIdx = idx(row, col);

				(window as any).grid = newGrid;

				if (!newGrid[targetIdx] && newGrid[targetIdx] !== 0) {
					throw new Error("target not found when preparing `clickSquare`");
				}

				if ([SquareState.Start, SquareState.End].includes(squareState)) {
					// TODO: SKIP
				} else if (squareState === SquareState.Filled) {
					newGrid[targetIdx] = SquareState.Clear;
				} else if (squareState === SquareState.Clear) {
					newGrid[targetIdx] = SquareState.Filled;
				} else {
					const err = new Error(`"invalid state", ${squareState}`);
					throw err;
				}

				const indicesOfShortestPathSquares: Uint8Array = computeShortestPath(newGrid, rows, cols);

				return {
					payload: {
						squareState,
						grid: newGrid,
						hasShortestPath: indicesOfShortestPathSquares.length > 0,
						indicesOfShortestPathSquares,
					},
				};
			},
		},
	},
});

export const { reset, eventuallySetRows, eventuallySetCols, commitResize, clickSquare } = slice.actions;

export default slice.reducer;
