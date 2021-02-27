import { css } from "emotion";
import React, { useEffect } from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import "./App.css";

import { Grid } from "./features/grid/Grid";
import { loadShortestPath } from "./features/grid/gridSlice";

function App() {
	useEffect(() => {
		loadShortestPath();
	}, []);

	return (
		<div className="App">
			<header
				className={css`
					min-height: 100vh;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					margin-top: 2em;
					margin-bottom: 2em;
				`}
			>
				<Grid />

				{/* <img src={logo} className="App-logo" alt="logo" />
				<Counter />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<span>
					<span>Learn </span>
					<a className="App-link" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
						React
					</a>
					<span>, </span>
					<a className="App-link" href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
						Redux
					</a>
					<span>, </span>
					<a
						className="App-link"
						href="https://redux-toolkit.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Redux Toolkit
					</a>
					,<span> and </span>
					<a
						className="App-link"
						href="https://react-redux.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						React Redux
					</a>
	</span> */}
			</header>
		</div>
	);
}

export default App;
