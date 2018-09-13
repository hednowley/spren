import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";

import "../../css/style.css";
import { Cell } from "./cell";
import { ColumnHeader } from "./columnHeader";
import { RowHeader } from "./rowHeader";

interface Props {
	cellIds: string[];
	maxColumn: number;
	maxRow: number
}

class TableComponent extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			display: "grid"
		};

		return (
			<div style={style} className="table">
				{Array.from(new Array(this.props.maxColumn), (val, index) => index + 1)
					.map(i => <ColumnHeader column={i} />)
				}
				{Array.from(new Array(this.props.maxRow), (val, index) => index + 1)
					.map(i => <RowHeader row={i} />)
				}
				{this.props.cellIds.map(id => (
					<Cell id={id} key={id} />
				))}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<Props, {}, Store> = (state: Store) => {
	return {
		cellIds: state.CellIds,
		maxColumn: state.MaxColumn,
		maxRow: state.MaxRow
	};
};

export const Table = connect(mapStateToProps)(TableComponent);
