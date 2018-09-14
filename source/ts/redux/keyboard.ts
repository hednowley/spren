import { ThunkAction } from "redux-thunk";
import { Store } from "./store";
import { AnyAction, ActionCreator } from "redux";
import { createValueChangedAction, createSetFocusedCellAction } from "./actionCreators";

const literalKeys = [
	" ",
	".",
	",",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"0",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z"
];

export const createKeyDownThunk: ActionCreator<ThunkAction<void, Store, {}, AnyAction>> = (
	key: string
) => (dispatch, getStore) => {
	const focusedCell = getStore().FocusedCell;
	if (focusedCell == null) {
		return;
	}

	const oldValue = getStore().Cells[focusedCell].value;

	if (key.length == 1 && literalKeys.indexOf(key) > -1) {
		dispatch(createValueChangedAction(oldValue + key, focusedCell));
		return;
	}

	if (key == "Backspace") {
		dispatch(createValueChangedAction((" " + oldValue).slice(0, -1), focusedCell));
		return;
	}

	if (key == "Delete") {
		dispatch(createValueChangedAction("", focusedCell));
		return;
	}

	const focusedLayout = getStore().Layout.find(cell => cell.id == focusedCell);

	if (key == "ArrowLeft") {
		const targetCell = getStore().Layout.find(
			cell => cell.row == focusedLayout.row && cell.column == focusedLayout.column - 1
		);
		if (targetCell != null) {
			dispatch(createSetFocusedCellAction(targetCell.id));
		}
	}

	if (key == "ArrowRight" || key == "Tab") {
		const targetCell = getStore().Layout.find(
			cell => cell.row == focusedLayout.row && cell.column == focusedLayout.column + 1
		);
		if (targetCell != null) {
			dispatch(createSetFocusedCellAction(targetCell.id));
		}
	}

	if (key == "ArrowDown") {
		const targetCell = getStore().Layout.find(
			cell => cell.row == focusedLayout.row + 1 && cell.column == focusedLayout.column
		);
		if (targetCell != null) {
			dispatch(createSetFocusedCellAction(targetCell.id));
		}
	}

	if (key == "ArrowUp") {
		const targetCell = getStore().Layout.find(
			cell => cell.row == focusedLayout.row - 1 && cell.column == focusedLayout.column
		);
		if (targetCell != null) {
			dispatch(createSetFocusedCellAction(targetCell.id));
		}
	}
};
