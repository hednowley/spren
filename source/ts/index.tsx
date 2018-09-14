import { App } from "./components/app";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/reducer";
import { Store } from "./redux/store";
import thunk from "redux-thunk";

const initialStore: Store = {
	Cells: {},
	CellIds: [],
	Layout: [],
	EditingCell: null,
	FocusedCell: null,
	CurrentCell: null,
	MouseIsDown: false,
	MaxColumn: 20,
	MaxRow: 50,
	Axes: [
		{
			IsColumn: true,
			IsRow: false,
			Value: 1,
			Index: 0
		},
		{
			IsColumn: false,
			IsRow: true,
			Value: 1,
			Index: 1
		},
		{
			IsColumn: false,
			IsRow: false,
			Value: 1,
			Index: 2
		}
	]
};

for (let i = 1; i <= 50; i++) {
	for (let j = 1; j <= 50; j++) {
		for (let k = 1; k <= 30; k++) {
			const key = `${i}.${j}.${k}`;
			initialStore.Cells[key] = {
				id: key,
				value: "",
				coordinate: [i, j, k]
			};
			initialStore.CellIds.push(key);
		}
	}
}

Object.keys(initialStore.Cells).forEach(id => {
	var cell = initialStore.Cells[id];
	if (cell.coordinate[2] == 1) {
		initialStore.Layout.push({
			column: cell.coordinate[0],
			row: cell.coordinate[1],
			id: id
		});
	}
});

const getCell = (x: number, y: number, z: number) => {
	for (const id of Object.keys(initialStore.Cells)) {
		const cell = initialStore.Cells[id];
		if (cell.coordinate[0] == x && cell.coordinate[1] == y && cell.coordinate[2] == z) {
			return cell;
		}
	}
};

getCell(2, 1, 1).value = "A";
getCell(3, 1, 1).value = "B";
getCell(4, 1, 1).value = "C";
getCell(5, 1, 1).value = "D";

getCell(2, 2, 1).value = "1";
getCell(3, 2, 1).value = "2";
getCell(4, 2, 1).value = "3";
getCell(5, 2, 1).value = "4";

getCell(2, 3, 1).value = "5";
getCell(3, 3, 1).value = "6";
getCell(4, 3, 1).value = "7";
getCell(5, 3, 1).value = "8";

getCell(2, 4, 1).value = "9";
getCell(3, 4, 1).value = "10";
getCell(4, 4, 1).value = "11";
getCell(5, 4, 1).value = "12";

getCell(1, 2, 1).value = "a";
getCell(1, 3, 1).value = "b";
getCell(1, 4, 1).value = "c";

getCell(1, 1, 2).value = "AA";
getCell(1, 1, 3).value = "BB";
getCell(1, 1, 4).value = "CC";
getCell(1, 1, 5).value = "DD";

const store = createStore(reducer, initialStore, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
