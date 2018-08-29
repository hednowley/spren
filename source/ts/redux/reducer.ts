import { Store } from "./store";
import { AllActions } from "./actions";
import { ActionTypeKeys } from "./actionTypes";

const getId = (coordinate: number[]) => coordinate.join(".");

export const reducer = (store: Store, action: AllActions) => {
	switch (action.type) {
		case ActionTypeKeys.NEW_CELL_VALUE:

			const id = getId(action.coordinate);
			const cellsCopy = { ...store.cells };

			cellsCopy[id] = {
				...store.cells[id],
				value: action.newValue
			};

			return {
				...store,
				cells: cellsCopy
			}
	}

	return store;
};
