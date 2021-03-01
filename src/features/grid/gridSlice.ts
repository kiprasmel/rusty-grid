/* eslint-disable */
import { createSlice, PayloadAction, PrepareAction } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-extraneous-dependencies
import * as sp from "shortest-path/shortest_path";
// eslint-disable-next-line import/no-cycle
// import { AppThunk, RootState } from "../../app/store";

export const MAX_ROWS = 20;
export const MAX_COLS = 20;

// export type SquareState = "filled" | "clear" | "start" | "end";
// export const encodeState = (state: SquareState): number => ({ filled: 0, clear: 1, start: 2, end: 3 }[state]);

export enum SquareState {
	Filled = 0,
	Clear = 1,
	Start = 2,
	End = 3
};



export type GridT = Uint8Array;

export const getPseudoRandomIdx = (maxExcl: number): number => Math.round(Math.random() * (maxExcl - 1));

/**
 * convert from 2D to 1D index 
 */
export const to1DIdx = (cols: number) => (i: number, j: number) => i * cols + j;

const initGrid = (rows: number = 10, cols: number = 10): GridT => {
	const g: GridT = new Uint8Array(rows * cols);

	const idx = to1DIdx(cols);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			g[idx(i, j)] = SquareState.Filled;
		}
	}

	g[idx(getPseudoRandomIdx(rows), 0)] = SquareState.Start;
	g[idx(getPseudoRandomIdx(rows), cols - 1)] = SquareState.End;


	return g;
};


// eslint-disable-next-line @typescript-eslint/camelcase
let shortestPath: typeof sp.breath_first_search_shortest_path;

export const loadShortestPath = async () => {
	shortestPath = await (await import("../../../node_modules/shortest-path/shortest_path.js"))
		.breath_first_search_shortest_path;

	(window as any).sp = shortestPath;
};

const recomputeShortestPath = (grid: GridT, rows: number, cols: number): GridT => {
	const clearSquareCount: number = grid.filter(sq => sq === SquareState.Clear).length;

	if (clearSquareCount < rows - 2) {
		/**
		 * impossible
		 */

		 return new Uint8Array();
	}

	if (!shortestPath) {
		throw new Error("not loaded yet");
	}

	const findFirstWithState = (state: SquareState): number  => {
		for (let i = 0; i < grid.length; i++) {
			if (grid[i] === state) {
				return i;
			}
		}

		throw new Error("state not found");
	}

	const startIdx: number = findFirstWithState(SquareState.Start);
	const endIdx: number = findFirstWithState(SquareState.End);

	const indicesOfSquaresBelongingToShortestPath: Uint8Array = shortestPath(grid, rows, cols, startIdx, endIdx);

	return indicesOfSquaresBelongingToShortestPath;
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
	indicesOfShortestPathSquares: new Uint8Array()
});

export const clamp = (n: number, min: number, max: number): number => Math.max(Math.min(n, max), min);

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
			reducer: (state, action: PayloadAction<{ squareState: SquareState; grid: GridT,  hasShortestPath: boolean, indicesOfShortestPathSquares: Uint8Array }>): void => {
				const { grid, squareState, hasShortestPath, indicesOfShortestPathSquares } = action.payload;

				if ([SquareState.Start, SquareState.End].includes(squareState)) {
					return;
				}

				state.grid = grid;
				state.hasShortestPath = hasShortestPath;
				state.indicesOfShortestPathSquares = indicesOfShortestPathSquares;
			},
			prepare: (rows: number, cols: number, squareState: SquareState, row: number, col: number, grid: GridT) => {
				let newGrid: GridT = new Uint8Array(grid);

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
					let err = new Error(`"invalid state", ${squareState}`);
					throw err;
				}

				const indicesOfShortestPathSquares: Uint8Array = recomputeShortestPath(newGrid, rows, cols);

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
