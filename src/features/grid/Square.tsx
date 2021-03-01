import { FC } from "react";
import { css, cx } from "emotion";
import { useDispatch } from "react-redux";

import { clickSquare, GridT } from "./gridSlice";
import { Box, BoxProps } from "./Box";
import { to1DIdx } from "./utils";

export enum SquareState {
	Filled = 0,
	Clear = 1,
	Start = 2,
	End = 3,
}

export type SquareItemProps = {
	state: SquareState;
	isPartOfShortestPath?: boolean;
} & BoxProps;

export const SquareItem: FC<SquareItemProps> = ({ state, isPartOfShortestPath = false, children, ...rest }) => {
	const backgroundColor: string =
		isPartOfShortestPath && ![SquareState.Start, SquareState.End].includes(state)
			? "orange"
			: {
					[SquareState.Start]: "lime", // eslint-disable-line indent
					[SquareState.End]: "green", // eslint-disable-line indent
					[SquareState.Filled]: "hsl(0, 0%, 90%)", // eslint-disable-line indent
					[SquareState.Clear]: "white", // eslint-disable-line indent
			  }[state] || "hsl(0, 0%, 90%)";

	return (
		<Box
			{...rest}
			className={cx(
				css`
					background-color: ${backgroundColor};
				`,
				rest.className
			)}
		>
			{children}
		</Box>
	);
};

export interface RowOfSquaresProps {
	rows: number;
	children: (row: number) => React.ReactNode;
}

export const RowOfSquares: FC<RowOfSquaresProps> = ({ rows, children }) => (
	<>
		{new Array(rows).fill(0).map((_, row) => (
			<ul
				key={row}
				className={css`
					width: 100%;

					display: flex;
					flex-direction: row;

					list-style-type: none;

					margin: 0;
					padding: 0;

					justify-content: center;
					align-items: center;
				`}
			>
				{children(row)}
			</ul>
		))}
	</>
);

interface SquareProps {
	rows: number;
	cols: number;
	row: number;
	grid: GridT;
	indicesOfShortestPathSquares: Uint8Array;
}

export const Square: FC<SquareProps> = ({ rows, cols, row, grid, indicesOfShortestPathSquares }) => {
	const dispatch = useDispatch();

	return (
		<>
			{new Array(cols).fill(0).map((_, col) => {
				const squareIdx = to1DIdx(cols)(row, col);

				const squareState = grid[squareIdx];

				return (
					<li
						key={`${row}-${col}`}
						className={css`
							flex: 1;
						`}
					>
						<button
							type="button"
							onClick={() => dispatch(clickSquare(rows, cols, squareState, row, col, grid))}
							className={css`
								width: 100%;
								height: 100%;
							`}
						>
							<SquareItem
								state={squareState}
								isPartOfShortestPath={indicesOfShortestPathSquares.includes(squareIdx)}
							/>
						</button>
					</li>
				);
			})}
		</>
	);
};
