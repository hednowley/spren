import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";

import "../../css/style.css";
import { Cell } from "./cell";

interface Props {
	selection: string[];
	cells: {
		coordinate: number[];
		value: string;
		id: string;
	}[];
	hovered: string;
}

class TableComponent extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			display: "grid"
		};

		return (
			<div style={style} className="table">
				{this.props.cells.map(c => (
					<Cell
						coordinate={c.coordinate}
						value={c.value}
						id={c.id}
						key={c.id}
						selected={this.props.selection.some(id => id == c.id)}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<Props, {}, Store> = (state: Store) => {
	return {
		cells: Object.keys(state.Cells).map(key => ({
			coordinate: state.Cells[key].coordinate,
			value: state.Cells[key].value,
			id: key
		})),
		selection: state.Selection == null ? [] : state.Selection.Contents,
		hovered: state.CurrentCell
	};
};

export const Table = connect(mapStateToProps)(TableComponent);
