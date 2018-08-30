import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";

import "../../css/style.css";
import { Cell } from "./cell";

interface Props {
	cellIds: string[];
}

class TableComponent extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			display: "grid"
		};

		return (
			<div style={style} className="table">
				{this.props.cellIds.map(id => (
					<Cell id={id} key={id} />
				))}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<Props, {}, Store> = (state: Store) => {
	return {
		cellIds: state.CellIds
	};
};

export const Table = connect(mapStateToProps)(TableComponent);
