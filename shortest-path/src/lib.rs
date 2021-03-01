use std::collections::VecDeque;
use wasm_bindgen::prelude::*;

// convert from 2D index to 1D index
fn to_1d_idx(cols: u8, row: u8, col: u8) -> u8 {
	row * cols + col
}

// convert from 1D index to 2D index
fn to_2d_idx(cols: u8, curr_idx: u8) -> (u8, u8) {
	let mut row: u8 = 0;

	while (row + 1) * cols <= curr_idx {
		row += 1;
	}

	let col: u8 = curr_idx - (row * cols);

	(row, col)
}

fn get_neighbour(rows: u8, cols: u8, curr: u8, dx: i8, dy: i8) -> Option<u8> {
	let (row, col) = to_2d_idx(cols, curr);

	let y: u8 = row + dy as u8;
	let x: u8 = col + dx as u8;

	if x < 0 || x >= cols || y < 0 || y >= rows {
		return None;
	}

	let neighbour: u8 = to_1d_idx(cols, y, x);

	Some(neighbour)
}

fn get_neighbours(rows: u8, cols: u8, curr: u8) -> Vec<u8> {
	let mut neighbours: Vec<u8> = Vec::new();
	let deltas: Vec<(i8, i8)> = vec![(-1, 0), (1, 0), (0, -1), (0, 1)];

	for (dx, dy) in deltas {
		if let Some(neighbour) = get_neighbour(rows, cols, curr, dx, dy) {
			neighbours.push(neighbour);
		} else {
			continue;
		}
	}

	neighbours
}

#[wasm_bindgen]
pub enum SquareState {
	Filled = 0,
	Clear = 1,
	Start = 2,
	End = 3,
}

#[wasm_bindgen]
pub fn breadth_first_search_shortest_path(
	grid: &[u8], //
	rows: u8,
	cols: u8,
	start_idx: u8,
	end_idx: u8,
) -> Vec<u8> {
	let mut done: bool = false;

	let mut visited: Vec<bool> = Vec::new();
	visited.resize(grid.len(), false);

	let mut parents: Vec<u8> = Vec::new();
	parents.resize(grid.len(), 0);

	let mut tail: Option<u8> = None;

	let mut frontier: VecDeque<u8> = VecDeque::new();
	frontier.push_back(start_idx);

	while !frontier.is_empty() {
		if done {
			break;
		}

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

		for neighbour in get_neighbours(rows, cols, curr) {
			if visited[neighbour as usize] {
				continue;
			}

			let neighbour_state: u8 = grid[neighbour as usize];

			if vec![SquareState::Clear as u8, SquareState::End as u8].contains(&neighbour_state) {
				parents[neighbour as usize] = curr;
				frontier.push_back(neighbour);
			}

			if neighbour_state == SquareState::End as u8 {
				done = true;
				tail = Some(neighbour);
				break;
			}
		} // for
	} // while

	let mut head: u8;

	if let Some(_head) = tail {
		head = _head;
	} else {
		return vec![];
	}

	assert_eq!(head, end_idx);

	// retrieve the shortest path from the end to the start
	let mut shortest_path: Vec<u8> = Vec::new();

	loop {
		shortest_path.push(head);

		if grid[head as usize] == SquareState::Start as u8 {
			break;
		}

		head = parents[head as usize];
	}

	// make the path start from the starting square
	shortest_path.reverse();

	shortest_path
}
