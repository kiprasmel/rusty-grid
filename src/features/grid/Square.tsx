import { FC } from "react";
import { css, cx } from "emotion";
import { useDispatch } from "react-redux";

// eslint-disable-next-line import/no-cycle
import { clickSquare, GridT, IndicesOfShortestPathT } from "./gridSlice";
import { to1DIdx } from "./utils";

export enum SquareState {
	Filled = 0,
	Clear = 1,
	Start = 2,
	End = 3,
}

export const swapSquareState = (state: SquareState): SquareState => {
	const newState = {
		[SquareState.Filled]: SquareState.Clear,
		[SquareState.Clear]: SquareState.Filled,
		[SquareState.Start]: SquareState.Start, // no swap
		[SquareState.End]: SquareState.End, // no swap
	}[state];

	if (!newState && newState !== 0) {
		throw new Error(`invalid squareState provided to \`swapSquareState\` function (${state})`);
	}

	return newState;
};

export const swapSquareStateInGrid = (grid: GridT, squareIdx: number, squareState: SquareState): GridT => {
	if (!grid[squareIdx] && grid[squareIdx] !== 0) {
		throw new Error("target not found when preparing `clickSquare`");
	}

	const newGrid: GridT = new Uint8Array(grid);
	const newState: SquareState = swapSquareState(squareState);
	newGrid[squareIdx] = newState;

	console.log("state", squareState, "newState", newState);

	return newGrid;
};

export type SquareItemProps = {
	state: SquareState;
	isPartOfShortestPath?: boolean;
	handleClick?: () => any;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const SquareItem: FC<SquareItemProps> = ({
	state,
	isPartOfShortestPath = false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	handleClick = (): void => {},
	className,
	children,
	...rest
}) => {
	const defaultColor: string = "hsl(0, 0%, 90%)";

	const backgroundColor: string =
		isPartOfShortestPath && ![SquareState.Start, SquareState.End].includes(state)
			? "hsl(130, 100%, 87%)"
			: {
					[SquareState.Start]: "hsl(-60,100%,90%)", // eslint-disable-line indent
					[SquareState.End]: "hsl(170, 100%,85%)", // eslint-disable-line indent
					[SquareState.Filled]: defaultColor, // eslint-disable-line indent
					[SquareState.Clear]: "white", // eslint-disable-line indent
			  }[state];

	return (
		<button
			type="button"
			{...rest}
			onClick={handleClick}
			className={cx(
				css`
					display: flex;

					justify-content: center;
					align-items: center;

					min-width: 70px;
					min-height: 70px;

					/* width: 100%;
					height: 100%; */

					margin: 0;
					padding: 0;

					background-color: ${backgroundColor};

					border: 1px solid hsla(0, 0%, 50%, 0.5);

					&:hover {
						background: ${isPartOfShortestPath ||
						[SquareState.Start, SquareState.End, SquareState.Filled].includes(state) // eslint-disable-next-line indent
							? backgroundColor // eslint-disable-next-line indent
							: // eslint-disable-next-line indent
							  "hsla(0, 0%, 95%, 0.95)"};
					}

					&:active {
						background: hsla(0, 0%, 50%, 0.5);
					}
				`,
				className
			)}
		>
			{children}
		</button>
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

interface ColumnOfSquaresProps {
	rows: number;
	cols: number;
	row: number;
	grid: GridT;
	indicesOfShortestPathSquares: IndicesOfShortestPathT;
}

export const ColumnOfSquares: FC<ColumnOfSquaresProps> = ({ rows, cols, row, grid, indicesOfShortestPathSquares }) => {
	const dispatch = useDispatch();

	return (
		<>
			{new Array(cols).fill(0).map((_, col) => {
				const squareIdx = to1DIdx(cols)(row, col);

				const squareState = grid[squareIdx];

				return (
					<li key={`${row}-${col}`}>
						<SquareItem
							state={squareState}
							isPartOfShortestPath={indicesOfShortestPathSquares.includes(squareIdx)}
							handleClick={(): any => dispatch(clickSquare(grid, rows, cols, squareIdx, squareState))}
						/>
					</li>
				);
			})}
		</>
	);
};
