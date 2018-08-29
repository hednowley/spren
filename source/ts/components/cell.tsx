import * as React from "react";
import { MapDispatchToProps, connect } from "react-redux";
import { Store } from "../redux/store";
import { createNewCellValueAction } from "../redux/actionCreators";

interface Props {
	coordinate: number[];
	value: string;
}

interface DispatchProps {
	onValueChange: (newValue: string) => void
}

class CellComponent extends React.Component<Props & DispatchProps> {

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onValueChange(event.target.value);
	}

	render() {
		const style: React.CSSProperties = {
			gridColumn: this.props.coordinate[1] + 1,
			gridRow: this.props.coordinate[0] + 1
		};

		return (
			<input
				style={style}
				type="text"
				className="table-cell"
				value={this.props.value}
				onChange={this.handleChange}
			/>
		);
	}
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch, ownProps) => ({
	onValueChange: (newValue: string) => dispatch(createNewCellValueAction(ownProps.coordinate, newValue))
});

export const Cell = connect<{}, DispatchProps, Props, Store>(
	null,
	mapDispatchToProps
)(CellComponent);
