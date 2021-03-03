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
					flex-wrap: wrap;

					justify-content: flex-start;
					align-items: flex-end;

					@media (max-width: 768px) {
						max-width: 100vw;

						flex-direction: column;

						justify-content: center;
						align-items: center;
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
						</tr>
					</tbody>
				</table>

				<div
					className={css`
						display: flex;
						flex-direction: row;

						& > * {
							margin-left: 2rem;
						}

						@media (max-width: 768px) {
							flex-direction: column;

							& > * {
								margin-left: 0;
								margin-top: 1.5rem;
							}
						}
					`}
				>
					<Button onClick={() => dispatch(commitResize())}>Generate</Button>
					<Button onClick={() => dispatch(invert(grid, rows, cols))}>Invert</Button>
				</div>
			</article>
			{/* /generator */}

			{/* grid */}
			<article
				className={css`
					display: grid;

					grid-template-columns: repeat(${cols}, 1fr);
					grid-template-rows: repeat(${rows}, 1fr);

					width: 42rem;
					height: 42rem;

					border: 1px solid hsla(0, 0%, 50%, 0.5);

					@media (max-width: 768px) {
						width: 90vw;
						height: 90vw;
						margin-left: auto;
						margin-right: auto;
					}
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
