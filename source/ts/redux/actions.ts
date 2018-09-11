import { AnyAction } from "redux";
import { ActionTypeKeys } from "./actionTypes";
import { SetCurrentCellAction, SetFocusedCellAction } from "./actionCreators";

export type AllActions =
	| ValueChangedAction
	| SetCurrentCellAction
	| SetFocusedCellAction

export interface ValueChangedAction extends AnyAction {
	readonly type: ActionTypeKeys.VALUE_CHANGED,
	readonly id: string,
	readonly value: string
}