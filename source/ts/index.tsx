import { App } from "./components/app";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/reducer";
import { Store } from "./redux/store";
import thunk from 'redux-thunk';

const initialStore: Store = {
	Cells: {},
	CellIds: [],
	Layout: [],
	EditingCell: null,
	FocusedCell: null,
	CurrentCell: null,
	MouseIsDown: false,
	MaxColumn: 30,
	MaxRow: 80
};

for (let i = 1; i < 100; i++) {
	for (let j = 1; j < 100; j++) {
		const key = `${i}.${j}`;
		initialStore.Cells[key] = {
			id: key,
			value: ""
		};
		initialStore.CellIds.push(key);
		initialStore.Layout.push({
			coordinate: [i, j],
			id: key
		});
	}
}

const store = createStore(reducer, initialStore, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
