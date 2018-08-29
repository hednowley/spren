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

		case ActionTypeKeys.TOGGLE_SELECT_CELL:

			const index = store.selected.indexOf(action.id);
			let selectedCopy = store.selected.splice(0);
			
			if (index == -1) {
				selectedCopy.push(action.id);
			} else {
				selectedCopy = [
					...selectedCopy.slice(0, index),
					...selectedCopy.slice(index + 1)
				];
			}

			return {
				...store,
				selected: selectedCopy
			};
	}

	return store;
};
