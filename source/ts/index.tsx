import { App } from "./components/app";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/reducer";
import { Store } from "./redux/store";

const initialStore: Store = {
	cells: []
};

for (let i = 0; i < 10; i++) {
	for (let j = 0; j < 5; j++) {
		initialStore.cells.push({
			coordinate: [i, j],
			value: `value_${i}_${j}`
		});
	}
}

const store = createStore(reducer, initialStore);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
