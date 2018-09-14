import { ThunkAction } from "redux-thunk";
import { Store } from "./store";
import { AnyAction, ActionCreator } from "redux";
import { createSetCurrentCellAction, createSetFocusedCellAction } from "./actionCreators";

export const createMouseEnterCellThunk: ActionCreator<ThunkAction<void, Store, {}, AnyAction>> = (
	cell: string
) => dispatch => {
	dispatch(createSetCurrentCellAction(cell));
};

export const createMouseExitCellThunk: ActionCreator<
	ThunkAction<void, Store, {}, AnyAction>
> = () => dispatch => {
	dispatch(createSetCurrentCellAction(null));
};

export const createMouseDownThunk: ActionCreator<ThunkAction<void, Store, {}, AnyAction>> = () => (
	dispatch,
	getStore
) => {
	const currentCell = getStore().CurrentCell;
	if (currentCell != null) {
		dispatch(createSetFocusedCellAction(currentCell));
	}
};

export const createMouseUpThunk: ActionCreator<ThunkAction<void, Store, {}, AnyAction>> = () => (
	dispatch,
	getStore
) => {};
