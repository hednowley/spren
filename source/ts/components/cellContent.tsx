import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";
import { createValueChangedAction } from "../redux/actionCreators";
import * as React from "react";
import { createMouseEnterCellThunk, createMouseExitCellThunk } from "../redux/mouse";

interface Props {
	id: string;
}

interface ReduxProps {
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
		let className = "table-cell";

		if (this.props.focused) {
			className += " focused";
		}

		return (
			<div
				className={className}
				onMouseEnter={this.props.onMouseEnter}
				onMouseLeave={this.props.onMouseExit}
			>
				<div className="cell-contents">{this.props.value}</div>
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, Store> = (store, ownProps) => {
	const reduxCell = store.Cells[ownProps.id];
	return {
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

export const CellContent = connect<ReduxProps, DispatchProps, Props, Store>(
	mapStateToProps,
	mapDispatchToProps
)(CellComponent);
