import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Store, RegionEdge, Region, Layout } from "../redux/store";

import "../../css/style.css";
import { ColumnHeader } from "./columnHeader";
import { RowHeader } from "./rowHeader";
import { Cell } from "./cell";
import { RegionColumnHeader } from "./regionColumnHeader";

interface Props {
	layoutIndex: number;
}

interface ReduxProps {
	maxColumn: number;
	maxRow: number;
	columnRegions: RegionEdge[];
	rowRegions: RegionEdge[];
	regions: Region[];
	layout: Layout;
}

class TableComponent extends React.Component<ReduxProps & Props> {
	private columnRegions: RegionEdge[];
	private rowRegions: RegionEdge[];

	constructor(props: ReduxProps & Props) {
		super(props);

		const allEdges = props.regions.reduce(
			(edges, value) => (edges = edges.concat(value.Edges)),
			[] as RegionEdge[]
		);

		this.columnRegions = allEdges.filter(e => e.Axis == props.layout.columnAxis).map();
		this.rowRegions = allEdges.filter(e => e.Axis == props.layout.rowAxis);
	}

	private GetActualColumn = (column: number) => {
		let adjustment = 0;
		for (const edge of this.props.columnRegions) {
			if (column >= edge.Min) {
				adjustment++;
			}
			if (column > edge.Max) {
				adjustment++;
			}
		}
		return column + adjustment;
	};

	private GetActualRow = (row: number) => {
		let adjustment = 0;
		for (const edge of this.props.rowRegions) {
			if (row >= edge.Min) {
				adjustment++;
			}
			if (row > edge.Max) {
				adjustment++;
			}
		}
		return row + adjustment;
	};

	render() {
		const style: React.CSSProperties = {
			display: "grid"
		};

		return (
			<div style={style} className="table">
				{Array.from(new Array(this.props.maxColumn), (val, index) => index + 1).map(i => (
					<ColumnHeader
						column={this.GetActualColumn(i)}
						name={i.toString()}
						key={i}
						layout={this.props.layoutIndex}
					/>
				))}
				{Array.from(new Array(this.props.maxRow), (val, index) => index + 1).map(i => (
					<RowHeader
						row={this.GetActualRow(i)}
						name={i.toString()}
						key={i}
						layout={this.props.layoutIndex}
					/>
				))}
				{this.props.layout.cells
					.filter(cell => cell.column <= this.props.maxColumn && cell.row <= this.props.maxRow)
					.map(cell => (
						<Cell
							id={cell.id}
							key={cell.id}
							column={this.GetActualColumn(cell.column)}
							row={this.GetActualRow(cell.row)}
						/>
					))}

				{this.props.columnRegions.map(r => (
					<RegionColumnHeader region={r.Id} />
				))}
			</div>
		);
	}
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, Store> = (
	state: Store,
	ownProps: Props
) => {
	return {
		layout: state.Layouts[ownProps.layoutIndex],
		maxColumn: state.MaxColumn,
		maxRow: state.MaxRow,
		regions: state.Regions
	};
};

export const Table = connect(mapStateToProps)(TableComponent);
