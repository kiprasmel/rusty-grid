// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, camelcase
import * as sp from "../../../node_modules/shortest-path/shortest_path";
// import { SquareState } from "../../../node_modules/shortest-path/shortest_path";

// eslint-disable-next-line import/no-cycle
import { GridT, IndicesOfShortestPathT } from "./gridSlice";
// eslint-disable-next-line import/no-cycle
import { SquareState } from "./Square";

// export { SquareState };

// eslint-disable-next-line camelcase
let computeShortestPathWasm: typeof sp.breadth_first_search_shortest_path;
let hasLoadedShortestPathWasm: boolean = false;

/**
 * must be loaded asynchronously
 */
export const loadShortestPathWasm = async (): Promise<void> => {
	// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
	const loadedWasm = await import("../../../node_modules/shortest-path/shortest_path.js");

	computeShortestPathWasm = loadedWasm.breadth_first_search_shortest_path;
	hasLoadedShortestPathWasm = true;

	(window as any).sp = computeShortestPathWasm;
};

export const computeShortestPath = (grid: GridT, rows: number, cols: number): IndicesOfShortestPathT => {
	const clearSquareCount: number = grid.filter((sq) => sq === SquareState.Clear).length;

	if (clearSquareCount < Math.min(rows, cols) - 2) {
		/**
		 * impossible to have any path that connects start & end
		 */
		console.log("skipping computation because impossible");

		return new Uint16Array();
	}

	if (!hasLoadedShortestPathWasm) {
		throw new Error("wasm not loaded yet");
	}

	const findIdxOfFirstWithState = (state: SquareState): number => {
		for (let i = 0; i < grid.length; i++) {
			if (grid[i] === state) {
				return i;
			}
		}

		throw new Error("state not found");
	};

	const startIdx: number = findIdxOfFirstWithState(SquareState.Start);

	const indicesOfSquaresBelongingToShortestPath: IndicesOfShortestPathT = computeShortestPathWasm(
		grid,
		rows,
		cols,
		startIdx
	);

	return indicesOfSquaresBelongingToShortestPath;
};
