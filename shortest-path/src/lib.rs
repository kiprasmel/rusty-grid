use std::collections::VecDeque;
use wasm_bindgen::prelude::*;

/// indices for the 1-dimensional array
type Idx1D = u16;
/// indices for the 2-dimensional array.
/// should be `u8`, but somehow does not work properly
/// with bigger values, so might as well not bother for now.
type Idx2D = u16;

/// the state. More formerly defined below as `SquareState`.
type State = u8;

// convert from 2D index to 1D index
fn to_1d_idx(cols: Idx2D, row: Idx2D, col: Idx2D) -> Idx1D {
	(row * cols + col).into()
}

// convert from 1D index to 2D index
fn to_2d_idx(cols: Idx2D, curr_idx: Idx1D) -> (Idx2D, Idx2D) {
	let mut row: Idx2D = 0;

	loop {
		let tmp: Idx1D = (row + 1).wrapping_mul(cols.into()).into();

		if tmp <= curr_idx {
			row = row + 1;
		} else {
			break;
		}
	}

	let other: Idx1D = (row * cols).into();
	let col = (curr_idx - other) as Idx2D;

	(row, col)
}

fn get_neighbour(rows: Idx2D, cols: Idx2D, curr: Idx1D, dx: i16, dy: i16) -> Option<Idx1D> {
	let (row, col) = to_2d_idx(cols, curr);

	let y: i16 = (row as i16).wrapping_add(dy);
	let x: i16 = (col as i16).wrapping_add(dx);

	if x < 0 || x >= cols as i16 || y < 0 || y >= rows as i16 {
		return None;
	}

	let neighbour: Idx1D = to_1d_idx(cols, y as Idx2D, x as Idx2D);

	Some(neighbour)
}

fn get_neighbours(rows: Idx2D, cols: Idx2D, curr: Idx1D) -> Vec<Idx1D> {
	let mut neighbours: Vec<Idx1D> = Vec::new();
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
	rows: Idx2D,
	cols: Idx2D,
	start_idx: Idx1D,
) -> Vec<Idx1D> {
	let mut done: bool = false;

	let mut visited: Vec<bool> = Vec::new();
	visited.resize(grid.len(), false);

	let mut parents: Vec<Idx1D> = Vec::new();
	parents.resize(grid.len(), 0);

	let mut tail: Option<Idx1D> = None;

	let mut frontier: VecDeque<Idx1D> = VecDeque::new();
	frontier.push_back(start_idx);

	while !frontier.is_empty() {
		if done {
			break;
		}

		let curr: Idx1D;

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

			let neighbour_state: State = grid[neighbour as usize];

			if vec![SquareState::Clear as State, SquareState::End as State]
				.contains(&neighbour_state)
			{
				parents[neighbour as usize] = curr;
				frontier.push_back(neighbour);
			}

			if neighbour_state == SquareState::End as State {
				done = true;
				tail = Some(neighbour);
				break;
			}
		} // for
	} // while

	let mut head: Idx1D;

	if let Some(_head) = tail {
		head = _head;
	} else {
		return vec![];
	}

	// retrieve the shortest path from the end to the start
	let mut shortest_path: Vec<Idx1D> = Vec::new();

	loop {
		shortest_path.push(head);

		if grid[head as usize] == SquareState::Start as State {
			break;
		}

		head = parents[head as usize];
	}

	// make the path start from the starting square
	shortest_path.reverse();

	shortest_path
}
