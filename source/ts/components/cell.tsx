import * as React from "react";
import { MapDispatchToProps, connect } from "react-redux";
import { Store } from "../redux/store";
import { createNewCellValueAction, createToggleSelectCellAction } from "../redux/actionCreators";

interface Props {
	coordinate: number[];
	value: string;
	id: string;
	selected: boolean
}

interface DispatchProps {
	onValueChange: (newValue: string) => void,
	onSelect: () => void
}

class CellComponent extends React.Component<Props & DispatchProps> {

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onValueChange(event.target.value);
	}

	private handleClick = () => {
		this.props.onSelect();
	}

	render() {
		const style: React.CSSProperties = {
			gridColumn: this.props.coordinate[1] + 1,
			gridRow: this.props.coordinate[0] + 1
		};

		return (
			<div onClick={this.handleClick} className="table-cell" style={style}>
				<input
					type="text"
					className={this.props.selected ? "selected" : ""}
					value={this.props.value}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch, ownProps) => ({
	onValueChange: (newValue: string) => dispatch(createNewCellValueAction(ownProps.coordinate, newValue)),
	onSelect: () => dispatch(createToggleSelectCellAction(ownProps.id))
});

export const Cell = connect<{}, DispatchProps, Props, Store>(
	null,
	mapDispatchToProps
)(CellComponent);
