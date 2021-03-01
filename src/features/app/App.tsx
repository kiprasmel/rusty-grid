import React, { useEffect } from "react";
import { css } from "emotion";

import { Grid } from "../grid/Grid";
import { loadShortestPathWasm } from "../grid/shortestPath";

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

				margin-top: 2em;
				margin-bottom: 2em;

				text-align: center;
			`}
		>
			<main
				className={css`
					display: flex;
					flex-direction: column;

					& > * + * {
						margin-top: 4em;
					}
				`}
			>
				{/* logo */}
				<article
					className={css`
						text-align: left;
					`}
				>
					<img src="/assets/grid-logo.png" alt="Grid logo" />
				</article>
				{/* /logo */}

				<Grid />
			</main>
		</div>
	);
}
