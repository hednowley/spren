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
			};
		}

		case ActionTypeKeys.SET_FOCUSED_CELL: {
			return {
				...store,
				FocusedCell: action.id
			};
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

		case ActionTypeKeys.SET_COLUMN: {

			var rowAxis = store.Axes.find(a => a.IsRow);

			var layout: any[] = [];

			Object.keys(store.Cells).forEach(id => {
				var cell = store.Cells[id];
				if (cell.coordinate[2] == 1) {
					layout.push({
						column: cell.coordinate[0],
						row: cell.coordinate[1],
						id: id
					});
				}
			});

			return {
				...store,
				Axes: store.Axes.map((axis, index) => ({
					...axis,
					IsColumn: index == action.axis
				})),
				Layout: store.Cells.filter(c => c.)
			};
		}
	}

	return store;
};
