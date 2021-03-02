import React, { FC } from "react";
import { css } from "emotion";

import { Row } from "./Row";
import { Label } from "./Label";
import { Button } from "./Button";
import { SquareItem, SquareState } from "./Square";

export const UIStates: FC = () => (
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
					margin-top: 3rem;
				}
			`}
		>
			<Row
				className={css`
					justify-content: flex-start;
					& > * + * {
						margin-left: 4rem;
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

			{/* <table
				className={css`
					text-align: left;
				`}
			>
				<thead>
					<tr>
						<th>Filled (default)</th>
						<th>Hover</th>
						<th>Down</th>
						<th>Clear</th>
					</tr>
					<tr>
						<th>Start point</th>
						<th>End point</th>
						<th>Shortest path</th>
					</tr>
				</thead>
				<tbody>
					<tr
						className={css`
							& > * {
								width: 100%;
							}
						`}
					>
						<td>
							<SquareItem state={SquareState.Filled} />
						</td>
						<td>
							<SquareItem
								state={SquareState.Filled}
								className={css`
									background: hsla(0, 0%, 50%, 0.5);
								`}
							/>
						</td>
						<td>
							<SquareItem
								state={SquareState.Filled}
								className={css`
									background: hsla(0, 0%, 50%, 0.5);
								`}
							/>
						</td>
						<td>
							<SquareItem state={SquareState.Clear} />
						</td>
					</tr>
					<tr>
						<td>
							<SquareItem state={SquareState.Start} />
						</td>
						<td>
							<SquareItem state={SquareState.End} />
						</td>
						<td>
							<SquareItem state={SquareState.Clear} isPartOfShortestPath />
						</td>
					</tr>
				</tbody>
			</table> */}

			<Row
				className={css`
					justify-content: flex-start;
					& > * + * {
						margin-left: 4rem;
					}
				`}
			>
				<Label label="Filled (default)">
					<SquareItem state={SquareState.Filled} />
				</Label>

				<Label label="Hover">
					<SquareItem
						state={SquareState.Clear}
						className={css`
							background: hsla(0, 0%, 95%, 0.95);
						`}
					/>
				</Label>

				<Label label="Down">
					<SquareItem
						state={SquareState.Filled}
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
						margin-left: 4rem;
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
);
