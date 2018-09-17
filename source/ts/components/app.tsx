import * as React from "react";
import { Table } from "./table";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Store, Region } from "../redux/store";
import { createKeyDownThunk } from "../redux/keyboard";
import { createMouseDownThunk, createMouseUpThunk } from "../redux/mouse";
import { AxisPanel } from "./axisPanel";

interface DispatchProps {
	onKeyPress: (key: string) => void;
	onMouseDown: () => void;
	onMouseUp: () => void;
}

export class AppComponent extends React.Component<DispatchProps> {
	private handleKeyPress = (event: React.KeyboardEvent) => {
		this.props.onKeyPress(event.key);
		event.preventDefault();
	};

	private getTable = (layout: number) => {
		return (
			<div
				className="table-container"
				tabIndex={0}
				onKeyDown={this.handleKeyPress}
				onMouseDown={this.props.onMouseDown}
			>
				<Table layoutIndex={layout} />
			</div>
		);
	};

	render() {
		const style: React.CSSProperties = {
			height: "100%"
		};

		return (
			<div style={style}>
				{this.getTable(0)}
				{this.getTable(1)}
				<AxisPanel />
			</div>
		);
	}
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
	onKeyPress: key => dispatch<any>(createKeyDownThunk(key)),
	onMouseDown: () => dispatch<any>(createMouseDownThunk()),
	onMouseUp: () => dispatch<any>(createMouseUpThunk())
});

export const App = connect<{}, DispatchProps, {}, Store>(
	null,
	mapDispatchToProps
)(AppComponent);
