import { Store } from "./store";
import { AllActions } from "./actions";
import { ActionTypeKeys } from "./actionTypes";

const getId = (coordinate: number[]) => coordinate.join(".");

export const reducer = (store: Store, action: AllActions): Store => {
	switch (action.type) {
		case ActionTypeKeys.NEW_CELL_VALUE:
			const id = getId(action.coordinate);
			const cellsCopy = { ...store.Cells };

			cellsCopy[id] = {
				...store.Cells[id],
				value: action.newValue
			};

			return {
				...store,
				Cells: cellsCopy
			};

		case ActionTypeKeys.MOUSE_ENTER_CELL: {
			if (store.Selection.InProgress) {
				const startCell = store.Cells[store.Selection.Start];
				const endCell = store.Cells[action.id];

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

				return {
					...store,
					CurrentCell: action.id,
					Selection: {
						...store.Selection,
						End: endCell.id,
						Contents: others
					}
				};
			}

			return {
				...store,
				CurrentCell: action.id
			};
		}

		case ActionTypeKeys.MOUSE_EXIT_CELL: {
			if (store.CurrentCell == action.id) {
				return {
					...store,
					CurrentCell: null
				};
			}
			return store;
		}

		case ActionTypeKeys.MOUSE_DOWN: {
			return {
				...store,
				EditingCell: store.CurrentCell,
				Selection: {
					Start: store.CurrentCell,
					End: store.CurrentCell,
					Contents: [],
					InProgress: true
				}
			};
		}

		case ActionTypeKeys.MOUSE_UP: {
			if (store.Selection.InProgress) {
				return {
					...store,
					Selection: {
						...store.Selection,
						InProgress: false
					}
				};
			}
			
			return store;
		}
	}

	return store;
};
