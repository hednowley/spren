export interface Cell {
	id: string;
	coordinate: number[];
	value: string;
}

export interface Store {
	Cells: { [id: string]: Cell };
	CellIds: string[];
	CurrentCell: string,
	EditingCell: string,
	FocusedCell: string,
	MouseIsDown: boolean,
	MaxColumn: number,
	MaxRow: number
};
