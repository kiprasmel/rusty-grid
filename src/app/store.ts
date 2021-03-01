import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import counterReducer from "../features/counter/counterSlice";
// eslint-disable-next-line import/no-cycle
import gridReducer from "../features/grid/gridSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		grid: gridReducer,
	},
	middleware: getDefaultMiddleware({
		/**
		 * allow using `Uint8Array`s
		 */
		serializableCheck: {
			ignoredActions: ["grid/clickSquare"],
			ignoredPaths: ["grid.grid", "grid.indicesOfShortestPathSquares"],
		},
	}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
