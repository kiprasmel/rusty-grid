use std::collections::VecDeque;

use wasm_bindgen::prelude::*;

type SquareState = u8;

pub fn idx_with(cols: u8) -> impl Fn(u8, u8) -> u8 {
	move |y, x| y * cols + x
}

#[wasm_bindgen]
pub fn test(
	grid: &[SquareState], //
	rows: u8,
	cols: u8,
	start_idx: u8,
	end_idx: u8,
) -> Vec<u8> {
	let to_1d_dx = idx_with(cols);

	let mut a = Vec::new();

	for i in 0..rows {
		for j in 0..cols {
			let idx: u8 = to_1d_dx(i, j);
			a.push(idx);
		}
	}

	let mut b = Vec::new();
	for i in 0..rows * cols {
		b.push(i);
	}

	assert_eq!(a, b);

	let mut parents: Vec<u8> = Vec::new();
	parents.resize(grid.len(), 0);

	parents[0] = 1;
	parents[15] = 69;

	parents
}

#[wasm_bindgen]
pub fn breath_first_search_shortest_path(
	grid: &[SquareState], //
	rows: u8,
	cols: u8,
	start_idx: u8,
	end_idx: u8,
) -> Vec<u8> {
	let mut done: bool = false;

	let to_1d_idx = idx_with(cols);

	let mut frontier: VecDeque<u8> = VecDeque::new();
	let mut next: VecDeque<u8> = VecDeque::new();

	next.push_back(start_idx);

	let mut visited: Vec<bool> = Vec::new();
	visited.resize(grid.len(), false);

	let mut parents: Vec<u8> = Vec::new();
	parents.resize(grid.len(), 0);

	let mut tail: Option<u8> = None;

	while !done && (!frontier.is_empty() || !next.is_empty()) {
		frontier.append(&mut next);
		next = VecDeque::new();

		let curr: u8;

		if let Some(new_curr) = frontier.pop_front() {
			curr = new_curr;
		} else {
			break;
		}

		if visited[curr as usize] {
			continue;
		}
		visited[curr as usize] = true;

		for mut dy in 0..2 + 1 {
			dy -= 1;

			if done {
				break;
			}

			for mut dx in 0..2 + 1 {
				dx -= 1;

				if done {
					break;
				}

				if (dx == 0 && dy == 0) || (dx != 0 && dy != 0) {
					continue;
				}

				// convert from 1D index to 2D index
				let mut row: u8 = 0;
				while (row + 1) * cols <= curr {
					row += 1;
				}
				let col: u8 = curr - (row * cols);

				let y: u8 = row + dy;
				let x: u8 = col + dx;

				if x < 0 || x >= cols || y < 0 || y >= rows {
					continue;
				}

				let neighbour: u8 = to_1d_idx(y, x);

				if visited[neighbour as usize] {
					continue;
				}

				let neighbour_state: SquareState = grid[neighbour as usize];

				// if neighbour.state == SquareState::Clear {
				if neighbour_state == 1 || neighbour_state == 3 {
					parents[neighbour as usize] = curr;
					next.push_back(neighbour);
				}

				// if neighbour.state == SquareState::End {
				if neighbour_state == 3 {
					done = true;
					tail = Some(neighbour);
					break;
				}
			} // dx
		} // dy
	} // while

	let mut head: u8;

	if let Some(_head) = tail {
		head = _head;
	} else {
		return vec![];
	}

	let mut shortest_path: Vec<u8> = Vec::new();

	loop {
		shortest_path.push(head);

		// if curr.state == SquareState::Start {
		if grid[head as usize] == 2 {
			break;
		}

		head = parents[head as usize];
	}

	shortest_path.reverse();

	shortest_path
}
