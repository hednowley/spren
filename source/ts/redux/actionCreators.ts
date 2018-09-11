import { ValueChangedAction } from "./actions";
import { ActionTypeKeys } from "./actionTypes";
import { ActionCreator, AnyAction } from "redux";

export const createValueChangedAction = (value: string, id: string): ValueChangedAction => ({
	type: ActionTypeKeys.VALUE_CHANGED,
	id: id,
	value: value
});

export interface SetCurrentCellAction extends AnyAction {
	readonly type: ActionTypeKeys.SET_CURRENT_CELL;
	readonly id: string;
}

export const createSetCurrentCellAction: ActionCreator<SetCurrentCellAction> = (id: string) => ({
	type: ActionTypeKeys.SET_CURRENT_CELL,
	id: id
});

export interface SetFocusedCellAction extends AnyAction {
	readonly type: ActionTypeKeys.SET_FOCUSED_CELL;
	readonly id: string;
}

export const createSetFocusedCellAction: ActionCreator<SetFocusedCellAction> = (id: string) => ({
	type: ActionTypeKeys.SET_FOCUSED_CELL,
	id: id
});

export interface SetCellSelectionAction extends AnyAction {
	readonly type: ActionTypeKeys.SET_CELL_SELECTION;
	readonly id: string;
}

export const createSetCellSelectionAction: ActionCreator<SetCellSelectionAction> = (cells: string[]) => ({
	type: ActionTypeKeys.SET_CELL_SELECTION,
	id: id
});
