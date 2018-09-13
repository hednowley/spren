import { MapDispatchToProps, connect, MapStateToProps } from "react-redux";
import { Store } from "../redux/store";
import { createValueChangedAction } from "../redux/actionCreators";
import * as React from "react";
import { createMouseEnterCellThunk, createMouseExitCellThunk, createMouseDownThunk } from "../redux/mouse";
import { CellContent } from "./cellContent";

interface Props {
	id: string;
	coordinate: number[]
}

export class Cell extends React.Component<Props> {

	render() {
		const style: React.CSSProperties = {
			gridColumn: this.props.coordinate[1] + 1, // Make space for the row name
			gridRow: this.props.coordinate[0] + 1 // Make space for the column header
		};

		return (
			<div
				className="table-cell"
				style={style}
			>
				<CellContent id={this.props.id}/>
			</div>
		);
	}
}