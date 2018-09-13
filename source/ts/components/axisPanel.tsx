import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { Store } from "../redux/store";
import { createSetColumnAction } from "../redux/actionCreators";

interface ReduxProps {
	axes: {
		IsColumn: boolean;
		IsRow: boolean;
		Value: number;
	}[];
}

interface DispatchProps {
	setColumn: (axis: number) => void;
	setRow: (axis: number) => void;
}

class AxisPanelComponent extends React.Component<ReduxProps & DispatchProps> {
	render() {
		return (
			<div className="axis-panel">
				{this.props.axes.map((axis, index) => (
					<div>
						<span>{`${index} ${axis.IsColumn} ${axis.IsRow}`}</span>
						<button onClick={() => this.props.setColumn(index)}>C</button>
						<button onClick={() => this.props.setRow(index)}>R</button>
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, Store> = store => ({
	axes: store.Axes
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, ReduxProps> = dispatch => ({
	setColumn: (axis: number) => dispatch(createSetColumnAction(axis)),
	setRow: (axis: number) => {}
});

export const AxisPanel = connect<ReduxProps, DispatchProps, {}, Store>(
	mapStateToProps,
	mapDispatchToProps
)(AxisPanelComponent);
