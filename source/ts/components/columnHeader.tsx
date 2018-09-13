import * as React from "react";

interface Props {
	column: number;
}

export class ColumnHeader extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			gridColumn: this.props.column + 1,
			gridRow: 1
		};

		return (
			<div
				className="column-header"
				style={style}
			>
				{this.props.column}
			</div>
		);
	}
}