import * as React from "react";
import { MapStateToProps, connect } from "react-redux";
import { Store } from "../redux/store";

interface Props {
	column: number;
	layout: number;
	name: string;
}

interface ReduxProps {
	focused: boolean;
}

class ColumnHeaderComponent extends React.Component<Props & ReduxProps> {
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
			<div className={className} style={style}>
				{this.props.name}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, Store> = (store, ownProps) => {
	return {
		focused:
			store.FocusedCell != null &&
			store.Layouts[ownProps.layout].cells.find(c => c.id == store.FocusedCell).column ==
				ownProps.column
	};
};

export const RegionColumnHeader = connect<ReduxProps, {}, Props, Store>(mapStateToProps)(
	ColumnHeaderComponent
);
