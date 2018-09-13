import * as React from "react";
import { MapStateToProps, connect } from "react-redux";
import { Store } from "../redux/store";

interface ReduxProps {
	axes: {
		IsColumn: boolean;
		IsRow: boolean;
		Value: number;
	}[];
}

class AxisPanelComponent extends React.Component<ReduxProps> {
	render() {
		return (
			<div className="axis-panel">
				{this.props.axes.map((axis, index) => (
					<div>{`${index} ${axis.IsColumn} ${axis.IsRow}`}</div>
				))}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, Store> = store => ({
	axes: store.Axes
});

export const AxisPanel = connect<ReduxProps, {}, {}, Store>(mapStateToProps)(AxisPanelComponent);
