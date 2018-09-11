import { Store } from "./store";
import { AllActions } from "./actions";
import { ActionTypeKeys } from "./actionTypes";

const getId = (coordinate: number[]) => coordinate.join(".");

export const reducer = (store: Store, action: AllActions): Store => {
	switch (action.type) {

		case ActionTypeKeys.SET_CURRENT_CELL: {
			return {
				...store,
				CurrentCell: action.id
			}
		}

		case ActionTypeKeys.SET_FOCUSED_CELL: {
			return {
				...store,
				FocusedCell: action.id
			}
		}

		case ActionTypeKeys.VALUE_CHANGED: {
			return {
				...store,
				Cells: {
					...store.Cells,
					[action.id]: {
						...store.Cells[action.id],
						value: action.value
					}
				}
			};
		}
	}

	return store;
};
