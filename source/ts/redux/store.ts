export interface Cell {
	id: string;
	coordinate: number[];
	value: string;
}

export interface Selection {
	Start: string,
	End: string,
	Contents: string[],
	InProgress: boolean
}

export interface Store {
	Cells: { [id: string]: Cell };
	CellIds: string[];
	Selection: Selection
	CurrentCell: string,
	EditingCell: string,
	MouseIsDown: boolean
};
