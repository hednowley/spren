import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";

import "../../css/style.css";
import { ColumnHeader } from "./columnHeader";
import { RowHeader } from "./rowHeader";
import { Cell } from "./cell";

interface Props {
	layoutIndex: number;
}

interface ReduxProps {
	cells: {
		column: number;
		row: number;
		id: string;
	}[];
	maxColumn: number;
	maxRow: number;
}

class TableComponent extends React.Component<ReduxProps & Props> {
	render() {
		const style: React.CSSProperties = {
			display: "grid"
		};

		return (
			<div style={style} className="table">
				{Array.from(new Array(this.props.maxColumn), (val, index) => index + 1).map(i => (
					<ColumnHeader column={i} key={i} layout={this.props.layoutIndex} />
				))}
				{Array.from(new Array(this.props.maxRow), (val, index) => index + 1).map(i => (
					<RowHeader row={i} key={i} layout={this.props.layoutIndex} />
				))}
				{this.props.cells
					.filter(cell => cell.column <= this.props.maxColumn && cell.row <= this.props.maxRow)
					.map(cell => (
						<Cell id={cell.id} key={cell.id} column={cell.column} row={cell.row} />
					))}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, Store> = (
	state: Store,
	ownProps: Props
) => {
	return {
		cells: state.Layouts[ownProps.layoutIndex].cells,
		maxColumn: state.MaxColumn,
		maxRow: state.MaxRow
	};
};

export const Table = connect(mapStateToProps)(TableComponent);
