#!/usr/bin/env node

const run = async () => {
	const sp = await import("./pkg/shortest_path.js");

	const rows = 4;
	const cols = 4;

	const grid = new Uint8Array(rows * cols);

	const start = 0,
		end = 15;

	grid[start] = 2;
	grid[end] = 3;

	for (let i = start + 1; i < end; i++) {
		grid[i] = 1;
	}

	const to2DIdx = (curr) => {
		let row = 0;
		while ((row + 1) * cols <= curr) {
			row++;
		}
		const col = curr - row * cols;

		return [row, col];
	};

	// console.log("to2Didx", to2DIdx(start), to2DIdx(end));
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const idx1d = i * cols + j;
			console.log(i, j, to2DIdx(idx1d), idx1d);
		}
	}

	// const ret = sp.test(grid, rows, cols, start, end);
	const ret = sp.breadth_first_search_shortest_path(grid, rows, cols, start, end);

	console.log(ret, "\n\n");
};

run();
