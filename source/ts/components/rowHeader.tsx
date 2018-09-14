import * as React from "react";
import { MapStateToProps, connect } from "react-redux";
import { Store } from "../redux/store";

interface Props {
	row: number;
	layout: number;
}

interface ReduxProps {
	focused: boolean;
}

class RowHeaderComponent extends React.Component<Props & ReduxProps> {
	render() {
		const style: React.CSSProperties = {
			gridColumn: 1,
			gridRow: this.props.row + 1
		};

		var className = "row-header";
		if (this.props.focused) {
			className += " focused";
		}

		return (
			<div className={className} style={style}>
				{this.props.row}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, Store> = (store, ownProps) => {
	return {
		focused:
			store.FocusedCell != null &&
			store.Layouts[ownProps.layout].cells.find(c => c.id == store.FocusedCell).row == ownProps.row
	};
};

export const RowHeader = connect<ReduxProps, {}, Props, Store>(mapStateToProps)(RowHeaderComponent);
