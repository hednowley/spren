export interface Cell {
	id: string;
	value: string;
	coordinate: number[];
}

export interface Store {
	Cells: { [id: string]: Cell };
	CellIds: string[];
	Layout: {
		column: number;
		row: number;
		id: string;
	}[];
	CurrentCell: string;
	EditingCell: string;
	FocusedCell: string;
	MouseIsDown: boolean;
	MaxColumn: number;
	MaxRow: number;
	Axes: {
		IsColumn: boolean;
		IsRow: boolean;
		Value: number;
	}[];
}
