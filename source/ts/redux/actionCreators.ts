import { NewCellValueAction, MouseEnterCellAction, MouseExitCellAction, MouseDownAction, MouseUpAction } from "./actions";
import { ActionTypeKeys } from "./actionTypes";

export const createNewCellValueAction = (
	coordinate: number[],
	newValue: string
): NewCellValueAction => ({
	type: ActionTypeKeys.NEW_CELL_VALUE,
	coordinate: coordinate,
	newValue: newValue
});

export const createMouseEnterCellAction = (id: string): MouseEnterCellAction => ({
	type: ActionTypeKeys.MOUSE_ENTER_CELL,
	id: id
});

export const createMouseExitCellAction = (id: string): MouseExitCellAction => ({
	type: ActionTypeKeys.MOUSE_EXIT_CELL,
	id: id
})

export const createMouseDownAction = (id: string): MouseDownAction => ({
	type: ActionTypeKeys.MOUSE_DOWN,
})

export const createMouseUpAction = (id: string): MouseUpAction => ({
	type: ActionTypeKeys.MOUSE_UP,
})