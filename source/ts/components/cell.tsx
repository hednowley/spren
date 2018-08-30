import * as React from "react";
import { MapDispatchToProps, connect } from "react-redux";
import { Store } from "../redux/store";
import {
	createNewCellValueAction,
	createMouseEnterCellAction,
	createMouseExitCellAction,
	createMouseDownAction,
	createMouseUpAction
} from "../redux/actionCreators";

interface Props {
	coordinate: number[];
	value: string;
	id: string;
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

class CellComponent extends React.Component<Props & DispatchProps, State> {
	constructor(props: Props & DispatchProps) {
		super(props);

		this.state = {
			isHovered: false
		};
	}

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onValueChange(event.target.value);
	};

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

		let className = "";

		if (this.props.selected) {
			className += " selected";
		}

		if (this.state.isHovered) {
			className += " hovered";
		}

		return (
			<div className="table-cell" style={style}>
				<input
					type="text"
					className={className}
					value={this.props.value}
					onChange={this.handleChange}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseExit}
					onMouseDown={this.handleMouseDown}
					onMouseUp={this.handleMouseUp}
				/>
			</div>
		);
	}
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch, ownProps) => ({
	onValueChange: (newValue: string) =>
		dispatch(createNewCellValueAction(ownProps.coordinate, newValue)),
	onMouseEnter: () => dispatch(createMouseEnterCellAction(ownProps.id)),
	onMouseExit: () => dispatch(createMouseExitCellAction(ownProps.id)),
	onMouseDown: () => dispatch(createMouseDownAction(ownProps.id)),
	onMouseUp: () => dispatch(createMouseUpAction(ownProps.id))
});

export const Cell = connect<{}, DispatchProps, Props, Store>(
	null,
	mapDispatchToProps
)(CellComponent);
