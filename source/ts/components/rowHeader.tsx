import * as React from "react";

interface Props {
	row: number;
}

export class RowHeader extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			gridColumn: 1,
			gridRow: this.props.row + 1
		};

		return (
			<div
				className="row-header"
				style={style}
			>
				{this.props.row}
			</div>
		);
	}
}