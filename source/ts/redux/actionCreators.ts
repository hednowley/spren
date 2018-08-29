import { NewCellValueAction } from "./actions";
import { ActionTypeKeys } from "./actionTypes";

export const createNewCellValueAction = (
	coordinate: number[],
	newValue: string
): NewCellValueAction => ({
	type: ActionTypeKeys.NEW_CELL_VALUE,
	coordinate: coordinate,
	newValue: newValue
});
