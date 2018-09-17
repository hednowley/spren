import { App } from "./components/app";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/reducer";
import { Store, Layout } from "./redux/store";
import thunk from "redux-thunk";

const initialStore: Store = {
	Cells: {},
	CellIds: [],
	Layouts: [],
	EditingCell: null,
	FocusedCell: null,
	CurrentCell: null,
	MouseIsDown: false,
	MaxColumn: 10,
	MaxRow: 10,
	Axes: [
		{
			Index: 0
		},
		{
			Index: 1
		},
		{
			Index: 2
		}
	],
	Regions: [
		{
			Id: "MyRegion",
			Edges: [
				{
					Axis: 0,
					Min: 4,
					Max: 6,
					Name: "Medal"
				},
				{
					Axis: 1,
					Min: 3,
					Max: 5,
					Name: "Country"
				},
				{
					Axis: 2,
					Min: 2,
					Max: 5,
					Name: "Year"
				}
			]
		}
	]
};

for (let i = 1; i <= 10; i++) {
	for (let j = 1; j <= 10; j++) {
		for (let k = 1; k <= 10; k++) {
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

const LayoutXY: Layout = {
	cells: [],
	columnAxis: 0,
	rowAxis: 1,
	index: 0
}

const LayoutZY: Layout = {
	cells: [],
	columnAxis: 2,
	rowAxis: 1,
	index: 1
}

Object.keys(initialStore.Cells).forEach(id => {
	var cell = initialStore.Cells[id];
	if (cell.coordinate[2] == 1) {
		LayoutXY.cells.push({
			column: cell.coordinate[0],
			row: cell.coordinate[1],
			id: id
		});
	}
});

Object.keys(initialStore.Cells).forEach(id => {
	var cell = initialStore.Cells[id];
	if (cell.coordinate[0] == 1) {
		LayoutZY.cells.push({
			column: cell.coordinate[2],
			row: cell.coordinate[1],
			id: id
		});
	}
});

initialStore.Layouts.push(LayoutXY);
initialStore.Layouts.push(LayoutZY);

const getCell = (x: number, y: number, z: number) => {
	for (const id of Object.keys(initialStore.Cells)) {
		const cell = initialStore.Cells[id];
		if (cell.coordinate[0] == x && cell.coordinate[1] == y && cell.coordinate[2] == z) {
			return cell;
		}
	}
};

getCell(4, 2, 1).value = "Gold";
getCell(5, 2, 1).value = "Silver";
getCell(6, 2, 1).value = "Bronze";

getCell(2, 2, 2).value = "46";
getCell(3, 2, 2).value = "10";
getCell(4, 2, 2).value = "58";

getCell(2, 3, 2).value = "90";
getCell(3, 3, 2).value = "20";
getCell(4, 3, 2).value = "6";

getCell(2, 4, 2).value = "20";
getCell(3, 4, 2).value = "10";
getCell(4, 4, 2).value = "100";

getCell(3, 3, 1).value = "USA";
getCell(3, 4, 1).value = "China";
getCell(3, 5, 1).value = "GB";

getCell(1, 1, 2).value = "2014";
getCell(1, 1, 3).value = "2015";
getCell(1, 1, 4).value = "2016";
getCell(1, 1, 5).value = "2017";

const store = createStore(reducer, initialStore, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
