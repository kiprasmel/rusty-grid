import React, { FC } from "react";
import { css } from "emotion";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../app/store";
import { commitResize, invert, eventuallySetCols, eventuallySetRows, GridT, IndicesOfShortestPathT } from "./gridSlice";
import { Button } from "./Button";
import { RowOfSquares, ColumnOfSquares } from "./Square";

export const Grid: FC = () => {
	const dispatch = useDispatch();

	const grid: GridT = useSelector((state: RootState) => state.grid.grid);
	const rows: number = useSelector((state: RootState) => state.grid.rows);
	const cols: number = useSelector((state: RootState) => state.grid.cols);

	const dirtyRows: number = useSelector((state: RootState) => state.grid.dirtyRows);
	const dirtyCols: number = useSelector((state: RootState) => state.grid.dirtyCols);

	const indicesOfShortestPathSquares: IndicesOfShortestPathT = useSelector(
		(state: RootState) => state.grid.indicesOfShortestPathSquares
	);

	return (
		<>
			{/* generator */}
			<article
				className={css`
					background-color: hsla(0, 0%, 85%, 0.69);
					padding: 1.5rem 3rem;
					border-radius: 0.5rem;

					display: flex;
					flex-direction: row;

					justify-content: flex-start;
					align-items: flex-end;

					& > * + * {
						margin-left: 1rem;
					}
				`}
			>
				<table
					className={css`
						text-align: left;

						/**
						 * select items inside all <tr> children
						 * to add margin, because margin does not apply
						 * to <tr> itself
						 *
						 * & > (thead|tbody) > tr > all but not first (th|td) > some_itrem
						*/
						& > * > * > * + * > * {
							margin-left: 1rem;
						}
					`}
				>
					<thead>
						<tr>
							<th>
								<p
									className={css`
										font-weight: normal;
										font-size: 1.5rem;
									`}
								>
									Rows
								</p>
							</th>
							{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
							<th>
								<span />
							</th>
							<th>
								<p
									className={css`
										font-weight: normal;
										font-size: 1.5rem;
									`}
								>
									Columns
								</p>
							</th>
							{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
							<th>
								<span />
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									id="rows"
									type="number"
									value={dirtyRows}
									onChange={(e) => dispatch(eventuallySetRows(Number(e.target.value)))}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											dispatch(commitResize());
										}
									}}
									className={css`
										font-size: 2.25rem;
										padding: 0.2rem 0.1rem;
										max-width: 6rem;

										text-align: center;
										appearance: textfield;
									`}
								/>
							</td>
							<td>
								<p
									className={css`
										font-size: 1.5rem;
									`}
								>
									x
								</p>
							</td>
							<td>
								<input
									id="columns"
									type="number"
									value={dirtyCols}
									onChange={(e) => dispatch(eventuallySetCols(Number(e.target.value)))}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											dispatch(commitResize());
										}
									}}
									className={css`
										font-size: 2.25rem;
										padding: 0.2rem 0.1rem;
										max-width: 6rem;

										text-align: center;
										appearance: textfield;
									`}
								/>
							</td>

							<td>
								<Button
									className={css`
										margin-left: 2rem;
									`}
									onClick={() => dispatch(commitResize())}
								>
									<span className={css``}>Generate</span>
								</Button>
							</td>

							<td>
								<Button
									className={css`
										margin-left: 2rem;
									`}
									onClick={() => dispatch(invert(grid, rows, cols))}
								>
									<span className={css``}>Invert</span>
								</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</article>
			{/* /generator */}

			{/* grid */}
			<article
				className={css`
					margin-left: auto;
					margin-right: auto;

					border: 1px solid hsla(0, 0%, 50%, 0.5);
				`}
			>
				<RowOfSquares rows={rows}>
					{(row): JSX.Element => (
						<ColumnOfSquares
							grid={grid}
							rows={rows}
							cols={cols}
							row={row}
							indicesOfShortestPathSquares={indicesOfShortestPathSquares}
						/>
					)}
				</RowOfSquares>
			</article>
			{/* /grid */}
		</>
	);
};
