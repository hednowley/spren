import { AnyAction } from "redux";
import { ActionTypeKeys } from "./actionTypes";

export type AllActions =
	| NewCellValueAction
	| MouseEnterCellAction
	| MouseExitCellAction
	| MouseDownAction
	| MouseUpAction
	| ValueChangedAction
	| KeyPressAction

export interface NewCellValueAction extends AnyAction {
	readonly type: ActionTypeKeys.NEW_CELL_VALUE;
	readonly coordinate: number[];
	readonly newValue: string;
}

export interface MouseEnterCellAction extends AnyAction {
	readonly type: ActionTypeKeys.MOUSE_ENTER_CELL;
	readonly id: string;
}

export interface MouseExitCellAction extends AnyAction {
	readonly type: ActionTypeKeys.MOUSE_EXIT_CELL;
	readonly id: string;
}

export interface MouseDownAction extends AnyAction {
	readonly type: ActionTypeKeys.MOUSE_DOWN
}

export interface MouseUpAction extends AnyAction {
	readonly type: ActionTypeKeys.MOUSE_UP
}

export interface KeyPressAction extends AnyAction {
	readonly type: ActionTypeKeys.KEY_PRESS,
	readonly key: string
}

export interface ValueChangedAction extends AnyAction {
	readonly type: ActionTypeKeys.VALUE_CHANGED,
	readonly id: string,
	readonly value: string
}