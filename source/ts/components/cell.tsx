import * as React from "react";

interface Props {}

interface State {
	value: string;
}

export class Cell extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			value: "a"
		};
	}

	render() {
		return <div>{this.state.value}</div>;
	}
}
