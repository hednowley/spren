export interface Cell {
	id: string;
	value: string;
}

export interface Store {
	Cells: { [id: string]: Cell };
	CellIds: string[];
	Layout: {
		coordinate: number[];
		id: string
	}[],
	CurrentCell: string,
	EditingCell: string,
	FocusedCell: string,
	MouseIsDown: boolean,
	MaxColumn: number,
	MaxRow: number
};
