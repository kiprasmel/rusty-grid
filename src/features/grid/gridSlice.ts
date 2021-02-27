/* eslint-disable */
import { createSlice, PayloadAction, PrepareAction } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-extraneous-dependencies
import * as sp from "shortest-path/shortest_path";
// eslint-disable-next-line import/no-cycle
// import { AppThunk, RootState } from "../../app/store";

export const MAX_ROWS = 20;
export const MAX_COLS = 20;

export type SquareState = "filled" | "clear" | "start" | "end";
export const swapState = (state: SquareState): number => ({ filled: 0, clear: 1, start: 2, end: 3 }[state]);

export type Square = {
	row: number;
	col: number;
	state: SquareState;
	isPartOfShortestPath: boolean;
};

export type Grid = Square[][];

// eslint-disable-next-line @typescript-eslint/camelcase
let shortestPath: typeof sp.breath_first_search_shortest_path;

export const loadShortestPath = async () => {
	shortestPath = await (await import("../../../node_modules/shortest-path/shortest_path.js"))
		.breath_first_search_shortest_path;
};

const recomputeShortestPath = (grid: Square[], rows: number, cols: number): Grid => {
	// const squares: Square[] = grid.filter((square) => square.state === "clear");

	// const clear_sq_rows = squares.map((sq) => sq.row);
	// const clear_sq_cols = squares.map((sq) => sq.col);

	// const preparedGrid = grid.map((sq) => ({ ...sq, state: swapState(sq.state) }));
	if (!shortestPath) {
		throw new Error("not loaded yet");
	}

	console.log("import", shortestPath);
	(window as any).sp = shortestPath;

	// console.log("grid", grid);
	const arg1 = (grid.map((sq) => sq.row) as unknown) as Uint32Array;
	const arg2 = (grid.map((sq) => sq.col) as unknown) as Uint32Array;
	const arg3 = (grid.map((sq) => swapState(sq.state)) as unknown) as Uint8Array;

	// console.log(arg1, arg2, arg3);

	const stuff = shortestPath(rows, cols, arg1, arg2, arg3);

	let newRows = stuff.slice(0, stuff.length / 2);
	let newCols = stuff.slice(stuff.length / 2);

	let sp: Square[] = [];
	for (let i = 0; i < newRows.length; i++) {
		sp.push({row: newRows[i], col: newCols[i], isPartOfShortestPath: true, state: "clear"});
	}

	let updatedGrid: Square[] =  grid.map(sq => {
		let found = sp.find(pathySq => sq.row === pathySq.row && sq.col === pathySq.col)
		if (found) {
			return found
		}
		return sq;
	})

	let unflattenedGrid: Grid = [];

	for (let i =0; i<rows;i++) {
		unflattenedGrid.push([])
		for (let j =0;j<cols;j++) {
			unflattenedGrid[i].push(updatedGrid[rows * i + j])
		}
	}

	return unflattenedGrid;
	// console.error("stuff", stuff);
	// return [];
};

export const getPseudoRandomIdx = (maxExcl: number): number => Math.round(Math.random() * (maxExcl - 1));

const initGrid = (rows: number = 10, cols: number = 10): Square[][] => {
	const g: Grid = [];

	for (let i = 0; i < rows; i++) {
		g.push([]);

		for (let j = 0; j < cols; j++) {
			g[i].push({ row: i, col: j, state: "filled", isPartOfShortestPath: false });
		}
	}

	// g[0][getPseudoRandomIdx(cols)].state = "start";
	// g[rows - 1][getPseudoRandomIdx(cols)].state = "end";
	g[getPseudoRandomIdx(rows)][0].state = "start";
	g[getPseudoRandomIdx(rows)][cols - 1].state = "end";

	return g;
};

interface State {
	grid: Grid;

	rows: number;
	cols: number;

	dirtyRows: number;
	dirtyCols: number;
}

const getDefaultState = (): State => ({ grid: initGrid(), rows: 10, cols: 10, dirtyRows: 10, dirtyCols: 10 });

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
		},
		clickSquare: {
			reducer: (state, action: PayloadAction<{ square: Square; grid: Grid }>): void => {
				const { square, grid } = action.payload;

				if (["start", "end"].includes(square.state)) {
					return;
				}

				state.grid = grid;
			},
			prepare: (square: Square, grid: Grid) => {
				let newGrid: Grid = grid.slice();

				const target = newGrid.flat().find((sq) => sq.row === square.row && sq.col === square.col);
				console.log("target", target)

				if (!target) {
					return {
						payload: {
							square,
							grid: newGrid,
						},
					};
				}

				if (square.state === "filled") {
					target.state = "clear";
				} else if (square.state === "clear") {
					target.state = "filled";
				} else {
					throw new Error("invalid state");
				}

				newGrid = recomputeShortestPath(newGrid.flat(), newGrid.length, newGrid[0].length);
				console.log("newGrid", newGrid);

				return {
					payload: {
						square,
						grid: newGrid,
					},
				};
			},
		},
	},
});

export const { reset, eventuallySetRows, eventuallySetCols, commitResize, clickSquare } = slice.actions;

export default slice.reducer;
