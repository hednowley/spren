import * as React from "react";
import { Table } from "./table";
import { connect, MapDispatchToProps } from "react-redux";
import { Store } from "../redux/store";
import { createKeyDownThunk } from "../redux/thunks";

interface DispatchProps {
	onKeyPress: (key: string) => void;
}

export class AppComponent extends React.Component<DispatchProps> {
	private handleKeyPress = (event: React.KeyboardEvent) => {
		this.props.onKeyPress(event.key);
		event.preventDefault();
	};

	render() {
		return (
			<div tabIndex={0} onKeyDown={this.handleKeyPress}>
				<Table />
			</div>
		);
	}
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
	onKeyPress: key => dispatch<any>(createKeyDownThunk(key))
});

export const App = connect<{}, DispatchProps, {}, Store>(
	null,
	mapDispatchToProps
)(AppComponent);
