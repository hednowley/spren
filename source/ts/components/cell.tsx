import * as React from "react";
import { CellContent } from "./cellContent";

interface Props {
	id: string;
	column: number,
	row: number
}

export class Cell extends React.Component<Props> {

	render() {
		const style: React.CSSProperties = {
			gridColumn: this.props.column + 1, // Make space for the row name
			gridRow: this.props.row + 1 // Make space for the column header
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