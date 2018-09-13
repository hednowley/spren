import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";
import { createValueChangedAction } from "../redux/actionCreators";
import * as React from "react";
import { createMouseEnterCellThunk, createMouseExitCellThunk, createMouseDownThunk } from "../redux/mouse";

interface Props {
	id: string;
}

interface ReduxProps {
	coordinate: number[];
	value: string;
	focused: boolean;
	editing: boolean;
}

interface DispatchProps {
	onMouseEnter: () => void;
	onMouseExit: () => void;
	onValueChanged: (value: string) => void;
}

class CellComponent extends React.Component<Props & DispatchProps & ReduxProps> {

	render() {
		const style: React.CSSProperties = {
			gridColumn: this.props.coordinate[1] + 1, // Make space for the row name
			gridRow: this.props.coordinate[0] + 1 // Make space for the column header
		};

		let className = "table-cell";

		if (this.props.focused) {
			className += " focused";
		}

		return (
			<div
				className={className}
				onMouseEnter={this.props.onMouseEnter}
				onMouseLeave={this.props.onMouseExit}
				style={style}
			>
				<div className="cell-contents">{this.props.value}</div>
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, Store> = (store, ownProps) => {
	const reduxCell = store.Cells[ownProps.id];
	return {
		coordinate: reduxCell.coordinate,
		value: reduxCell.value,
		editing: store.EditingCell == ownProps.id,
		focused: store.FocusedCell == ownProps.id
	};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props & ReduxProps> = (
	dispatch,
	ownProps
) => ({
	onMouseEnter: () => dispatch<any>(createMouseEnterCellThunk(ownProps.id)),
	onMouseExit: () => dispatch<any>(createMouseExitCellThunk()),
	onValueChanged: value => dispatch(createValueChangedAction(value, ownProps.id))
});

export const Cell = connect<ReduxProps, DispatchProps, Props, Store>(
	mapStateToProps,
	mapDispatchToProps
)(CellComponent);
