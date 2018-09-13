import * as React from "react";
import { MapStateToProps, connect } from "react-redux";
import { Store } from "../redux/store";

interface Props {
	column: number;
}

interface ReduxProps {
	focused: boolean
}

export class ColumnHeaderComponent extends React.Component<Props & ReduxProps> {
	render() {
		const style: React.CSSProperties = {
			gridColumn: this.props.column + 1,
			gridRow: 1
		};

		var className = "column-header";
		if (this.props.focused) {
			className += " focused";
		}

		return (
			<div
				className={className}
				style={style}
			>
				{this.props.column}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, Store> = (store, ownProps) => {
	return {
		focused: store.FocusedCell != null && store.Layout.find(c => c.id == store.FocusedCell).coordinate[1] == ownProps.column
	};
};

export const ColumnHeader = connect<ReduxProps, {}, Props, Store>(
	mapStateToProps
)(ColumnHeaderComponent);