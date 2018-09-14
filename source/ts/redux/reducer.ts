import { Store, Layout, CellLayout } from "./store";
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
			const focusedCell = store.Cells[action.id];

			const layouts: Layout[] = [];

			for (const layout of store.Layouts) {
				const hiddenAxes = store.Axes.filter(
					axis => axis.Index != layout.columnAxis && axis.Index != layout.rowAxis
				).map(axis => ({
					Index: axis.Index,
					FocusedValue: focusedCell.coordinate[axis.Index]
				}));

				const cells: CellLayout[] = [];

				Object.keys(store.Cells).forEach(id => {
					var cell = store.Cells[id];
					var shouldShowCell = hiddenAxes.every(
						axis => cell.coordinate[axis.Index] == axis.FocusedValue
					);

					if (shouldShowCell) {
						cells.push({
							column: cell.coordinate[layout.columnAxis],
							row: cell.coordinate[layout.rowAxis],
							id: cell.id
						});
					}
				});

				layouts.push({
					...layout,
					cells: cells
				})
			}

			return {
				...store,
				FocusedCell: action.id,
				Layouts: layouts
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
	}

	return store;
};
