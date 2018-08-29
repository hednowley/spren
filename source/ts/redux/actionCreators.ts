import { NewCellValueAction, ToggleSelectCellAction } from "./actions";
import { ActionTypeKeys } from "./actionTypes";

export const createNewCellValueAction = (
	coordinate: number[],
	newValue: string
): NewCellValueAction => ({
	type: ActionTypeKeys.NEW_CELL_VALUE,
	coordinate: coordinate,
	newValue: newValue
});

export const createToggleSelectCellAction = (id: string): ToggleSelectCellAction => ({
	type: ActionTypeKeys.TOGGLE_SELECT_CELL,
	id: id
});
