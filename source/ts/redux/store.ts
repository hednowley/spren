interface Cell {
	coordinate: number[];
	value: string;
}

export interface Store {
	cells: Cell[];
};
