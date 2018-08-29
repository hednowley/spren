import { Store } from "./store";
import { AllActions } from "./actions";
import { ActionTypeKeys } from "./actionTypes";

export const reducer = (store: Store, action: AllActions) => {
	switch (action.type) {
		case ActionTypeKeys.NEW_CELL_VALUE:
			return {
				...store,
				cells: store.cells.map(c => {
					if (c.coordinate[0] != action.coordinate[0] || c.coordinate[1] != action.coordinate[1]) {
						return c;
					}

					return {
						...c,
						value: action.newValue
					};
				})
			};
	}

	return store;
};
