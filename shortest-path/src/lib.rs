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

fn get_neighbours(rows: Idx2D, cols: Idx2D, curr: Idx1D, jiggle: bool) -> Vec<Idx1D> {
	let mut neighbours: Vec<Idx1D> = Vec::new();

	let mut deltas: Vec<(i16, i16)> = vec![
		(-1, 0), /* left */
		(0, -1), /* top */
		(0, 1),  /* bottom */
		(1, 0),  /* right */
	];

	if jiggle {
		/*
		 * swaps the order in which the neighbours are visited,
		 * thus reversing the *preference* of which *direction*
		 * the algorithm considers first vs last,
		 * which in turn, combined with the `frontier` + `next` combo
		 * to ensure proper "rounds", gives the jiggling effect!
		 */
		deltas.reverse();
	}

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

#[derive(Clone, PartialEq)]
enum Visited {
	Not,
	Waiting,
	Visited,
}

#[wasm_bindgen]
pub fn breadth_first_search_shortest_path(
	grid: &[State], //
	rows: Idx2D,
	cols: Idx2D,
	start_idx: Idx1D,
) -> Vec<Idx1D> {
	let mut done: bool = false;

	let mut visited: Vec<Visited> = Vec::new();
	visited.resize(grid.len(), Visited::Not);

	let mut parents: Vec<Idx1D> = Vec::new();
	parents.resize(grid.len(), 0);

	let mut tail: Option<Idx1D> = None;

	let mut frontier: VecDeque<Idx1D> = VecDeque::new();

	let mut next: VecDeque<Idx1D> = VecDeque::new();
	next.push_back(start_idx);

	/*
	 * instead of going in straight lines,
	 * encourages changing up the direction every time
	 * (as long as it is within the bounds of the shortest path)
	 *
	 * the `frontier` & `next` combo, together with
	 * the differenciation of `visited` as `Waiting` and `Visited`,
	 * makes this work, * because it lets us
	 * differenciate between so called "rounds",
	 * which means that jiggling is as [close to] "perfect"
	 * as possible, for the whole path!
	 */
	let mut jiggle: bool = true;

	while !frontier.is_empty() || !next.is_empty() {
		if done {
			break;
		}

		if frontier.is_empty() {
			// next round!

			jiggle = !jiggle;

			frontier.append(&mut next);
			next.clear();
		}

		let curr: Idx1D;

		if let Some(new_curr) = frontier.pop_front() {
			curr = new_curr;
		} else {
			break;
		}

		if visited[curr as usize] == Visited::Visited {
			continue;
		}

		visited[curr as usize] = Visited::Visited;

		for neighbour in get_neighbours(rows, cols, curr, jiggle) {
			/*
			 * Do not consider a neighbour if it is:
			 * - already visited
			 * - waiting in the `next` deque for the next round
			 */
			if [
				Visited::Waiting, //
				Visited::Visited,
			]
			.contains(&visited[neighbour as usize])
			{
				continue;
			}

			visited[neighbour as usize] = Visited::Waiting;

			let neighbour_state: State = grid[neighbour as usize];

			if vec![SquareState::Clear as State, SquareState::End as State]
				.contains(&neighbour_state)
			{
				parents[neighbour as usize] = curr;
				next.push_back(neighbour);
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
