export interface Cell {
	coordinate: number[];
	value: string;
}

export interface Store {
	cells: { [id: string]: Cell };
};
