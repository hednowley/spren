import { ThunkAction } from "redux-thunk";
import { Store } from "./store";
import { AnyAction, ActionCreator } from "redux";
import { createSetCurrentCellAction, createSetFocusedCellAction } from "./actionCreators";

export const createMouseEnterCellThunk: ActionCreator<ThunkAction<void, Store, {}, AnyAction>> = (
	cell: string
) => (dispatch, getStore) => {
	dispatch(createSetCurrentCellAction(cell));

	const store = getStore();
	if (store.Selection.InProgress) {
		const startCell = store.Cells[store.Selection.Start];
		const endCell = store.Cells[cell];

		const top = Math.min(startCell.coordinate[0], endCell.coordinate[0]);
		const bottom = Math.max(startCell.coordinate[0], endCell.coordinate[0]);
		const left = Math.min(startCell.coordinate[1], endCell.coordinate[1]);
		const right = Math.max(startCell.coordinate[1], endCell.coordinate[1]);

		const others = Object.keys(store.Cells).filter(key => {
			const cell = store.Cells[key];
			return (
				cell.coordinate[0] >= top &&
				cell.coordinate[0] <= bottom &&
				cell.coordinate[1] >= left &&
				cell.coordinate[1] <= right
			);
		});

		/*
		return {
			...store,
			CurrentCell: action.id,
			Selection: {
				...store.Selection,
				End: endCell.id,
				Contents: others
			}
		};
		*/
	}
};

export const createMouseExitCellThunk: ActionCreator<
	ThunkAction<void, Store, {}, AnyAction>
> = () => dispatch => {
	dispatch(createSetCurrentCellAction(null));
};

export const createMouseDownThunk: ActionCreator<ThunkAction<void, Store, {}, AnyAction>> = () => (dispatch, getStore) => {

	const currentCell = getStore().CurrentCell;
	if (currentCell != null) {
		dispatch(createSetFocusedCellAction(currentCell));
	}

	

	/*
	Selection: {
					Start: store.CurrentCell,
					End: store.CurrentCell,
					Contents: [],
					InProgress: true
				}
				*/
};

export const createMouseUpThunk: ActionCreator<ThunkAction<void, Store, {}, AnyAction>> = () => (dispatch, getStore) => {

	/*
	if (store.Selection.InProgress) {
				return {
					...store,
					Selection: {
						...store.Selection,
						InProgress: false
					}
				};
			}
				*/
};
