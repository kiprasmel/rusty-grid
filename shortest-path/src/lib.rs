use wasm_bindgen::prelude::*;

use std::collections::VecDeque;

// #[wasm_bindgen]
// extern "C" {
// 	pub fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet(name: &str) {
// 	alert(&format!("Hello, {}!", name));
// }

// extern "C" {
// 	pub type SquareState;
// }
// #[wasm_bindgen]
#[derive(PartialEq, Clone, Copy, Debug)]
pub enum SquareState {
	Filled,
	Clear,
	Start,
	End,
}

// #[wasm_bindgen]
// impl SquareState {
// 	fn value(&self) -> &'static str {
// 		match *self {
// 			Self::Filled => "filled",
// 			Self::Clear => "clear",
// 			Self::Start => "start",
// 			Self::End => "end",
// 		}
// 	}
// }

#[derive(Clone, Debug)]
pub struct Square {
	row: usize,
	col: usize,
	state: SquareState,
	isPartOfTheShortestPath: bool,
	isVisited: bool,
	parentRow: usize,
	parentCol: usize,
}

impl Square {
	pub fn new(row: usize, col: usize, state: SquareState) -> Self {
		Self {
			row: row,
			col: col,
			state: state,
			isPartOfTheShortestPath: false,
			isVisited: false,
			parentRow: 0,
			parentCol: 0,
		}
	}
}

#[wasm_bindgen]
pub fn breath_first_search_shortest_path(
	rows: usize,
	cols: usize,
	// start_row: i32,
	// start_col: i32,
	// end_row: i32,
	// end_col: i32,
	// clear_square_row_indices: &[i32],
	// clear_square_col_indices: &[i32],
	square_rows: &[u32],
	square_cols: &[u32],
	square_states: &[u8],
	// ) -> Vec<usize> {
) -> Vec<usize> {
	let mut grid: Vec<Vec<Square>> = Vec::new();

	let mut startMaybe: Option<Square> = None;
	let mut endMaybe: Option<Square> = None;

	for i in 0..rows {
		grid[i] = Vec::new();

		for j in 0..cols {
			let state: SquareState = match square_states[rows * i + j] {
				0 => SquareState::Filled,
				1 => SquareState::Clear,
				2 => SquareState::Start,
				3 => SquareState::End,
				_ => panic!("Received invalid state"),
			};

			grid[i].push(Square::new(i, j, state.clone()));

			match state {
				SquareState::Start => startMaybe = Some(grid[i][j].clone()),
				SquareState::End => endMaybe = Some(grid[i][j].clone()),
				_ => {}
			}
		}
	}

	println!("{}", "\nHELLe FROM RUST !! \n");

	let start: Square;
	let end: Square;

	match startMaybe {
		None => panic!("start not found"),
		Some(s) => start = s,
	}

	match endMaybe {
		None => panic!("end was not found"),
		Some(e) => end = e,
	}

	let mut done: bool = false;
	let mut frontier: VecDeque<Square> = VecDeque::new();
	let mut next: VecDeque<Square> = VecDeque::new();

	next.push_back(start.clone());

	while !done && (!frontier.is_empty() || !next.is_empty()) {
		frontier = next.clone();
		next.clear();
		next = VecDeque::new();

		if frontier.len() == 0 {
			break;
		}

		let mut curr = frontier.pop_front().unwrap();
		curr.isVisited = true;

		for mut dy in 0..2 {
			if done {
				break;
			}

			dy -= 1;

			for mut dx in 0..2 {
				dx -= 1;
				if (dx == 0 && dy == 0) || (dy != 0 && dy != 0) {
					continue;
				}

				let y: usize = curr.row + dy;
				let x: usize = curr.col + dx;

				if x < 0 || x > square_cols.len() || y < 0 || y > square_rows.len() {
					continue;
				}

				let mut candidate: &mut Square = &mut grid[y][x];

				if candidate.isVisited {
					continue;
				}

				if candidate.state == SquareState::End {
					done = true;
					break;
				}
				if candidate.state == SquareState::Clear {
					candidate.parentRow = curr.row;
					candidate.parentCol = curr.col;
					next.push_back(candidate.clone());
				}
			}
		}
	} // while

	let mut shortest_path: Vec<Square> = Vec::new();

	let mut curr: &Square = &end;

	loop {
		shortest_path.push(curr.clone());

		if curr.state == SquareState::Start {
			break;
		}

		curr = &grid[curr.parentRow][curr.parentCol];
	}

	shortest_path.reverse();

	let mut shortest_path_rows: Vec<usize> = shortest_path
		.clone()
		.into_iter()
		.map(|sq: Square| sq.row)
		.collect();

	let mut shortest_path_cols: Vec<usize> = shortest_path
		.clone()
		.into_iter()
		.map(|sq: Square| sq.col)
		.collect();

	shortest_path_rows.append(&mut shortest_path_cols);

	shortest_path_rows
}
