export interface Cell {
	id: string;
	coordinate: number[];
	value: string;
}

export interface Store {
	cells: { [id: string]: Cell };
	selected: string[];
	hovered: string
};
