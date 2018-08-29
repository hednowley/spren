import { AnyAction } from "redux";
import { ActionTypeKeys } from "./actionTypes";

export type AllActions =
	NewCellValueAction |
	ToggleSelectCellAction;

export interface NewCellValueAction extends AnyAction {
	readonly type: ActionTypeKeys.NEW_CELL_VALUE,
	readonly coordinate: number[],
	readonly newValue: string
}

export interface ToggleSelectCellAction extends AnyAction {
	readonly type: ActionTypeKeys.TOGGLE_SELECT_CELL,
	readonly id: string
}

