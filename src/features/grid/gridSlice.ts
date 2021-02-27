import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const recomputeShortestPath = async (grid: Square[], rows: number, cols: number): Promise<Grid> => {
	// const squares: Square[] = grid.filter((square) => square.state === "clear");

	// const clear_sq_rows = squares.map((sq) => sq.row);
	// const clear_sq_cols = squares.map((sq) => sq.col);

	// const preparedGrid = grid.map((sq) => ({ ...sq, state: swapState(sq.state) }));

	const shortestPath = await import("../../../node_modules/shortest-path/shortest_path.js");

	const stuff = shortestPath.breath_first_search_shortest_path(
		(grid.map((sq) => sq.row) as unknown) as Uint32Array,
		(grid.map((sq) => sq.col) as unknown) as Uint32Array,
		(grid.map((sq) => swapState(sq.state)) as unknown) as Uint8Array
	);

	console.error("stuff", stuff);
	return [];
	// return stuff;
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
		clickSquare: (state, action: PayloadAction<{ square: Square }>): void => {
			const { square } = action.payload;

			if (["start", "end"].includes(square.state)) {
				return;
			}

			const target = state.grid.flat().find((sq) => sq.row === square.row && sq.col === square.col);

			if (!target) {
				return;
			}

			if (square.state === "filled") {
				target.state = "clear";
			} else if (square.state === "clear") {
				target.state = "filled";
			} else {
				throw new Error("invalid state");
			}

			recomputeShortestPath(state.grid.flat(), state.rows, state.cols).then((res) => {
				state.grid = res;
				console.error("DONE SHORTEST ");
			});
		},
	},
});

export const { reset, eventuallySetRows, eventuallySetCols, commitResize, clickSquare } = slice.actions;

export default slice.reducer;
