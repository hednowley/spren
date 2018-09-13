import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";

import "../../css/style.css";
import { ColumnHeader } from "./columnHeader";
import { RowHeader } from "./rowHeader";
import { Cell } from "./cell";

interface Props {
	layout: {
		column: number;
		row: number;
		id: string;
	}[];
	maxColumn: number;
	maxRow: number;
}

class TableComponent extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			display: "grid"
		};

		return (
			<div style={style} className="table">
				{Array.from(new Array(this.props.maxColumn), (val, index) => index + 1).map(i => (
					<ColumnHeader column={i} />
				))}
				{Array.from(new Array(this.props.maxRow), (val, index) => index + 1).map(i => (
					<RowHeader row={i} />
				))}
				{this.props.layout
					.filter(cell => cell.column <= this.props.maxColumn && cell.row <= this.props.maxRow)
					.map(cell => (
						<Cell id={cell.id} key={cell.id} column={cell.column} row={cell.row} />
					))}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<Props, {}, Store> = (state: Store) => {
	return {
		layout: state.Layout,
		maxColumn: state.MaxColumn,
		maxRow: state.MaxRow
	};
};

export const Table = connect(mapStateToProps)(TableComponent);
