import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { Store, Axis } from "../redux/store";
import { createSetColumnAction } from "../redux/actionCreators";

interface ReduxProps {
	axes: Axis[];
}

interface DispatchProps {
	setColumn: (axis: number) => void;
	setRow: (axis: number) => void;
}

class AxisPanelComponent extends React.Component<ReduxProps & DispatchProps> {
	render() {
		return (
			<div className="axis-panel">
				{this.props.axes.map(axis => (
					<div>
						<span>{`Index:${axis.Index} Column:${axis.IsColumn} Row:${axis.IsRow} Value:${axis.Value}`}</span>
						<button onClick={() => this.props.setColumn(axis.Index)}>Set column</button>
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
