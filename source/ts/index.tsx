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
	Selection: {
		Contents: [],
		End: null,
		Start: null,
		InProgress: false
	},
	CurrentCell: null,
	MouseIsDown: false
};

for (let i = 0; i < 50; i++) {
	for (let j = 0; j < 50; j++) {
		initialStore.Cells[`${i}.${j}`] = {
			id: `${i}.${j}`,
			coordinate: [i, j],
			value: `value_${i}_${j}`
		};
	}
}

const store = createStore(reducer, initialStore, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
