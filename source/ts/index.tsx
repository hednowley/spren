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
	MaxColumn: 30,
	MaxRow: 80,
	Axes: [
		{
			IsColumn: true,
			IsRow: false,
			Value: 0
		},
		{
			IsColumn: false,
			IsRow: true,
			Value: 0
		},
		{
			IsColumn: false,
			IsRow: false,
			Value: 1
		}
	]
};

for (let i = 1; i <= 100; i++) {
	for (let j = 1; j <= 100; j++) {
		for (let k = 1; k <= 100; k++) {
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

const store = createStore(reducer, initialStore, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
