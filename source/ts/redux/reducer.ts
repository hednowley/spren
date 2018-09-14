import { Store, Layout } from "./store";
import { AllActions } from "./actions";
import { ActionTypeKeys } from "./actionTypes";

export const reducer = (store: Store, action: AllActions): Store => {
	switch (action.type) {
		case ActionTypeKeys.SET_CURRENT_CELL: {
			return {
				...store,
				CurrentCell: action.id
			};
		}

		case ActionTypeKeys.SET_FOCUSED_CELL: {
			const cell = store.Cells[action.id];

			return {
				...store,
				FocusedCell: action.id,
				Axes: store.Axes.map(axis => ({
					...axis,
					Value: cell.coordinate[axis.Index]
				}))
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
			var newAxes = store.Axes.map(axis => ({
				...axis,
				IsColumn: axis.Index == action.axis
			}));
			var rowAxis = store.Axes.find(a => a.IsRow);

			var layout: Layout[] = [];

			Object.keys(store.Cells).forEach(id => {
				var cell = store.Cells[id];
				var shouldShowCell = newAxes.every(
					(axis, index) => axis.IsColumn || axis.IsRow || cell.coordinate[index] == axis.Value
				);

				if (shouldShowCell) {
					layout.push({
						column: cell.coordinate[action.axis],
						row: cell.coordinate[rowAxis.Index],
						id: cell.id
					});
				}
			});

			return {
				...store,
				Axes: newAxes,
				Layout: layout
			};
		}
	}

	return store;
};
