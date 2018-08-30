import * as React from "react";
import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";
import {
	createNewCellValueAction,
	createMouseEnterCellAction,
	createMouseExitCellAction,
	createMouseDownAction,
	createMouseUpAction
} from "../redux/actionCreators";

interface Props {
	id: string;
}

interface ReduxProps {
	coordinate: number[];
	value: string;
	selected: boolean;
}

interface DispatchProps {
	onValueChange: (newValue: string) => void;
	onMouseEnter: () => void;
	onMouseExit: () => void;
	onMouseDown: () => void;
	onMouseUp: () => void;
}

interface State {
	isHovered: boolean;
}

class CellComponent extends React.Component<Props & DispatchProps & ReduxProps, State> {
	constructor(props: Props & DispatchProps & ReduxProps) {
		super(props);

		this.state = {
			isHovered: false
		};
	}

	private handleMouseEnter = () => {
		this.props.onMouseEnter();
		this.setState({
			isHovered: true
		});
	};

	private handleMouseExit = () => {
		this.props.onMouseExit();
		this.setState({
			isHovered: false
		});
	};

	private handleMouseDown = () => {
		this.props.onMouseDown();
	};

	private handleMouseUp = () => {
		this.props.onMouseUp();
	};

	render() {
		const style: React.CSSProperties = {
			gridColumn: this.props.coordinate[1] + 1,
			gridRow: this.props.coordinate[0] + 1
		};

		let className = "table-cell";

		if (this.props.selected) {
			className += " selected";
		}

		if (this.state.isHovered) {
			className += " hovered";
		}

		return (
			<div
				className={className}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseExit}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				style={style}
			>
				{this.props.value}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, Store> = (store, ownProps) => {
	const reduxCell = store.Cells[ownProps.id];
	return {
		coordinate: reduxCell.coordinate,
		value: reduxCell.value,
		selected: store.Selection.Contents.some(id => id == ownProps.id)
	}
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props & ReduxProps> = (dispatch, ownProps) => ({
	onValueChange: (newValue: string) =>
		dispatch(createNewCellValueAction(ownProps.coordinate, newValue)),
	onMouseEnter: () => dispatch(createMouseEnterCellAction(ownProps.id)),
	onMouseExit: () => dispatch(createMouseExitCellAction(ownProps.id)),
	onMouseDown: () => dispatch(createMouseDownAction(ownProps.id)),
	onMouseUp: () => dispatch(createMouseUpAction(ownProps.id))
});

export const Cell = connect<ReduxProps, DispatchProps, Props, Store>(
	mapStateToProps,
	mapDispatchToProps
)(CellComponent);
