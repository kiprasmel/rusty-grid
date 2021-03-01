import React, { FC } from "react";
import { css } from "emotion";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../app/store";
import { commitResize, eventuallySetCols, eventuallySetRows, GridT } from "./gridSlice";
import { Button } from "./Button";
import { Label } from "./Label";
import { Row } from "./Row";
import { RowOfSquares, Square, SquareItem, SquareState } from "./Square";
import { Box } from "./Box";

export const Grid: FC = () => {
	const dispatch = useDispatch();

	const grid: GridT = useSelector((state: RootState) => state.grid.grid);
	const rows: number = useSelector((state: RootState) => state.grid.rows);
	const cols: number = useSelector((state: RootState) => state.grid.cols);

	const dirtyRows: number = useSelector((state: RootState) => state.grid.dirtyRows);
	const dirtyCols: number = useSelector((state: RootState) => state.grid.dirtyCols);

	const indicesOfShortestPathSquares: Uint8Array = useSelector(
		(state: RootState) => state.grid.indicesOfShortestPathSquares
	);

	return (
		<>
			{/* generator */}
			<article
				className={css`
					background-color: hsla(0, 0%, 85%, 0.69);
					padding: 2em 4em;
					border-radius: 8px;

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
						 * & > tr > all but not first (th|td) > some_item
						*/
						& > * > * + * > * {
							margin-left: 1rem;
						}
					`}
				>
					<tr>
						<th>
							<p
								className={css`
									font-weight: normal;
									font-size: 1.5em;
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
							<p>Columns</p>
						</th>
						{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
						<th>
							<span />
						</th>
					</tr>
					<tr>
						<td>
							<input
								id="rows"
								type="number"
								value={dirtyRows}
								onChange={(e) => dispatch(eventuallySetRows(Number(e.target.value)))}
								className={css`
									font-size: 2.25em;
									padding: 0.2em 0.1em;
									max-width: 3em;

									appearance: textfield;
								`}
							/>
						</td>
						<td>
							<p
								className={css`
									font-size: 1.5em;
								`}
							>
								x
							</p>
						</td>
						<td>
							<input
								id="rows"
								type="number"
								value={dirtyCols}
								onChange={(e) => dispatch(eventuallySetCols(Number(e.target.value)))}
								className={css`
									font-size: 2.25em;
									padding: 0.2em 0.1em;
									max-width: 3em;

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
								<span
									className={css`
										font-size: 1.5rem;
									`}
								>
									Generate
								</span>
							</Button>
						</td>
					</tr>
				</table>
			</article>
			{/* /generator */}

			{/* grid */}
			<article
				className={css`
					background-color: hsla(0, 0%, 85%, 0.69);

					border: 1px solid hsla(0, 0%, 50%, 0.5);
				`}
			>
				<RowOfSquares rows={rows}>
					{(row): JSX.Element => (
						<Square
							rows={rows}
							cols={cols}
							row={row}
							grid={grid}
							indicesOfShortestPathSquares={indicesOfShortestPathSquares}
						/>
					)}
				</RowOfSquares>
			</article>
			{/* /grid */}

			{/* UI states */}
			<article>
				<h2
					className={css`
						text-align: left;
					`}
				>
					UI States
				</h2>

				<div
					className={css`
						display: flex;
						flex-direction: column;

						& > * + * {
							margin-top: 3em;
						}
					`}
				>
					<Row
						className={css`
							justify-content: flex-start;
							& > * + * {
								margin-left: 4em;
							}
						`}
					>
						<Label label="Default">
							<Button>Generate</Button>
						</Label>

						<Label label="Hover">
							<Button
								className={css`
									background-color: hsl(220, 100%, 75%);
								`}
							>
								Generate
							</Button>
						</Label>

						<Label label="Down">
							<Button
								className={css`
									background-color: hsl(220, 100%, 35%);
								`}
							>
								Generate
							</Button>
						</Label>
					</Row>

					<Row
						className={css`
							justify-content: flex-start;
							& > * + * {
								margin-left: 4em;
							}
						`}
					>
						<Label label="Filled (default)">
							<SquareItem state={SquareState.Filled} />
						</Label>

						<Label label="Hover">
							<Box
								className={css`
									background: hsla(0, 0%, 90%, 0.3);
								`}
							/>
						</Label>

						<Label label="Down">
							<Box
								className={css`
									background: hsla(0, 0%, 50%, 0.5);
								`}
							/>
						</Label>

						<Label label="Clear">
							<SquareItem state={SquareState.Clear} />
						</Label>
					</Row>

					<Row
						className={css`
							justify-content: flex-start;
							& > * + * {
								margin-left: 4em;
							}
						`}
					>
						<Label label="Start point">
							<SquareItem state={SquareState.Start} />
						</Label>

						<Label label="End point">
							<SquareItem state={SquareState.End} />
						</Label>

						<Label label="Shortest path">
							<SquareItem state={SquareState.Clear} isPartOfShortestPath />
						</Label>
					</Row>
				</div>
			</article>
			{/* /UI states */}
		</>
	);
};
