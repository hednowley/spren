import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";

import "../../css/style.css";
import { Cell } from "./cell";

interface Props {
	cells: {
		coordinate: number[];
		value: string;
	}[];
}

class TableComponent extends React.Component<Props> {

	render() {
		
		const style: React.CSSProperties = {
			display: "grid"
		};

		return (
			<div style={style} className="table">
				{this.props.cells.map(c => <Cell coordinate={c.coordinate} value={c.value}/>)}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<Props, {}, Store> = (state: Store) => {
	return {
		cells: Object.keys(state.cells).map(key => ({
			coordinate: state.cells[key].coordinate,
			value: state.cells[key].value
		}))
	};
};

export const Table = connect(mapStateToProps)(TableComponent);
