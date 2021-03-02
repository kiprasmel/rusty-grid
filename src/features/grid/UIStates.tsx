import React, { FC } from "react";
import { css } from "emotion";
import { useDispatch, useSelector } from "react-redux";

import { toggleUIStates } from "./gridSlice";
import { Row } from "./Row";
import { Label } from "./Label";
import { Button } from "./Button";
import { SquareItem, SquareState } from "./Square";
import { RootState } from "../app/store";

export const UIStates: FC = () => {
	const dispatch = useDispatch();
	const toggle = (): any => dispatch(toggleUIStates());

	const shouldHide: boolean = useSelector((state: RootState) => state.grid.hideUIStates);

	if (shouldHide) {
		return null;
	}

	return (
		<article>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
			<h2
				title="Click to hide"
				onKeyPress={toggle}
				onClick={toggle}
				className={css`
					text-align: left;
					cursor: pointer;
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

				<div
					className={css`
						display: grid;
						grid-template-columns: repeat(4, 1fr);
						grid-row-gap: 1rem;
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

					<Label label="Start point">
						<SquareItem state={SquareState.Start} />
					</Label>

					<Label label="End point">
						<SquareItem state={SquareState.End} />
					</Label>

					<Label label="Shortest path">
						<SquareItem state={SquareState.Clear} isPartOfShortestPath />
					</Label>
				</div>
			</div>
		</article>
	);
};
