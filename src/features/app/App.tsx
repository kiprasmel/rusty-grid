import React, { useEffect } from "react";
import { css } from "emotion";

import { Grid } from "../grid/Grid";
import { loadShortestPathWasm } from "../grid/shortestPath";
import { UIStates } from "../grid/UIStates";
import { Logo } from "../grid/Logo";

export default function App(): JSX.Element {
	useEffect(() => {
		loadShortestPathWasm();
	}, []);

	return (
		<div
			className={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				min-height: 100vh;

				margin-top: 2rem;
				margin-bottom: 2rem;

				text-align: center;
			`}
		>
			<main
				className={css`
					display: flex;
					flex-direction: column;

					& > * {
						margin-top: 4rem;
					}

					margin-bottom: 4rem;
				`}
			>
				<Logo />

				<Grid />

				<UIStates />
			</main>
		</div>
	);
}
