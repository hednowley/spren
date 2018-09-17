export interface Cell {
	id: string;
	value: string;
	coordinate: number[];
}

export interface Layout {
	columnAxis: number;
	rowAxis: number;
	index: number;
	cells: CellLayout[];
}

export interface CellLayout {
	column: number;
	row: number;
	id: string;
}

export interface Axis {
	Index: number;
}

export interface Region {
	Edges: RegionEdge[];
	Id: String
}

export interface RegionEdge {
	Axis: number;
	Min: number;
	Max: number;
	Name: string;
}

export interface Store {
	Cells: { [id: string]: Cell };
	CellIds: string[];
	Layouts: Layout[];
	CurrentCell: string;
	EditingCell: string;
	FocusedCell: string;
	MouseIsDown: boolean;
	MaxColumn: number;
	MaxRow: number;
	Axes: Axis[];
	Regions: Region[];
}
