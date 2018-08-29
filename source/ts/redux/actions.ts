import { AnyAction } from "redux";
import { ActionTypeKeys } from "./actionTypes";

export type AllActions = 
	NewCellValueAction;

export interface NewCellValueAction extends AnyAction {
	readonly type:  ActionTypeKeys.NEW_CELL_VALUE,
	readonly coordinate: number[],
	readonly newValue: string
}
