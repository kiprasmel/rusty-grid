#!/usr/bin/env node

const run = async () => {
	const sp = await import("./pkg/shortest_path.js");

	const rows = 250;
	const cols = 250;

	const start = 0,
		end = rows * cols - cols;

	const grid = new Uint8Array(rows * cols);

	for (let i = 0; i < rows * cols; i++) {
		grid[i] = 1;
	}

	grid[start] = 2;
	grid[end] = 3;

	// const grid = new Uint8Array([2, 0, 1, 1, 1, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	// const grid = new Uint8Array([2, 0, 1, 0, 1, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

	// const grid = new Uint8Array([2, 0, 1, 0, 1, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

	const to2DIdx = (curr) => {
		let row = 0;
		while ((row + 1) * cols <= curr) {
			row++;
		}
		const col = curr - row * cols;

		return [row, col];
	};

	// console.log("to2Didx", to2DIdx(start), to2DIdx(end));
	// for (let i = 0; i < rows; i++) {
	// 	for (let j = 0; j < cols; j++) {
	// 		const idx1d = i * cols + j;
	// 		console.log(i, j, to2DIdx(idx1d), idx1d);
	// 	}
	// }

	// const ret = sp.test(grid, rows, cols, start, end);
	const ret = sp.breadth_first_search_shortest_path(grid, rows, cols, start);

	console.log(
		ret,
		Array.from(ret).map((i) => to2DIdx(i)),
		"\n\n"
	);
};

run();
