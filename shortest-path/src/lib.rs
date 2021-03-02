use std::collections::VecDeque;
use wasm_bindgen::prelude::*;

type Idx = u16;
type State = u8;

// convert from 2D index to 1D index
fn to_1d_idx(cols: u16, row: u16, col: u16) -> u16 {
	(row * cols + col).into()
}

// convert from 1D index to 2D index
fn to_2d_idx(cols: u16, curr_idx: u16) -> (u16, u16) {
	let mut row: u16 = 0;

	while (row + 1) * cols <= curr_idx {
		row = row + 1;
	}

	let col: u16 = curr_idx - (row * cols);

	(row, col)
}

fn get_neighbour(rows: u16, cols: u16, curr: u16, dx: i16, dy: i16) -> Option<u16> {
	let (row, col) = to_2d_idx(cols, curr);

	let y: i16 = (row as i16).wrapping_add(dy);
	let x: i16 = (col as i16).wrapping_add(dx);

	if x < 0 || x >= cols as i16 || y < 0 || y >= rows as i16 {
		return None;
	}

	let neighbour: u16 = to_1d_idx(cols, y as u16, x as u16);

	Some(neighbour)
}

fn get_neighbours(rows: u16, cols: u16, curr: u16) -> Vec<u16> {
	let mut neighbours: Vec<u16> = Vec::new();
	let deltas: Vec<(i16, i16)> = vec![(1, 0), (0, 1), (0, -1), (-1, 0)];

	for (dx, dy) in deltas {
		if let Some(neighbour) = get_neighbour(rows, cols, curr, dx, dy) {
			neighbours.push(neighbour);
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
	grid: &[State], //
	rows: u16,
	cols: u16,
	start_idx: u16,
) -> Vec<Idx> {
	let mut done: bool = false;

	let mut visited: Vec<bool> = Vec::new();
	visited.resize(grid.len(), false);

	let mut parents: Vec<u16> = Vec::new();
	parents.resize(grid.len(), 0);

	let mut tail: Option<u16> = None;

	let mut frontier: VecDeque<u16> = VecDeque::new();
	frontier.push_back(start_idx);

	while !frontier.is_empty() {
		if done {
			break;
		}

		let curr: u16;

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

	let mut head: u16;

	if let Some(_head) = tail {
		head = _head;
	} else {
		return vec![];
	}

	// retrieve the shortest path from the end to the start
	let mut shortest_path: Vec<u16> = Vec::new();

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

#[wasm_bindgen]
pub fn test(
	grid: &[u8], //
	rows: u16,
	cols: u16,
	start_idx: u16,
) -> Vec<u16> {
	let mut a = Vec::new();

	for i in 0..rows {
		for j in 0..cols {
			let idx: u16 = to_1d_idx(cols, i, j);
			a.push(idx);
		}
	}

	let mut b = Vec::new();
	for i in 0..rows * cols {
		b.push(i);
	}

	assert_eq!(a, b);

	// let mut parents: Vec<u8> = Vec::new();
	// parents.resize(grid.len(), 0);

	// parents[0] = 1;
	// parents[15] = 69;

	a
}
