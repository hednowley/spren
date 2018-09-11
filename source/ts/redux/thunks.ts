import { ThunkAction } from "redux-thunk";
import { Store } from "./store";
import { AnyAction, ActionCreator } from "redux";
import { createValueChangedAction } from "./actionCreators";

const literalKeys = [
	" ",
	".",
	",",
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
};
