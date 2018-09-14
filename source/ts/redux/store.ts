export interface Cell {
	id: string;
	value: string;
	coordinate: number[];
}

export interface Layout {
	column: number;
	row: number;
	id: string;
}
[];

export interface Axis {
	IsColumn: boolean;
	IsRow: boolean;
	Value: number;
	Index: number;
}

export interface Store {
	Cells: { [id: string]: Cell };
	CellIds: string[];
	Layout: Layout[];
	CurrentCell: string;
	EditingCell: string;
	FocusedCell: string;
	MouseIsDown: boolean;
	MaxColumn: number;
	MaxRow: number;
	Axes: Axis[];
}
