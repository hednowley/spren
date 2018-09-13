import * as React from "react";
import { Table } from "./table";
import { connect, MapDispatchToProps } from "react-redux";
import { Store } from "../redux/store";
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

	render() {
		return (
			<div>
				<div tabIndex={0} onKeyDown={this.handleKeyPress} onMouseDown={this.props.onMouseDown}>
					<Table />
				</div>
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
