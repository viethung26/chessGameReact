import React, {Component} from 'react'
class Piece extends Component {
	select() {
		const Piece = this.props.piece;
		const Team = this.props.team === 1 ? "64px" : "0px";
		switch(Piece) {
			case 'P': 
			return {backgroundPosition: "64px "+Team};
			case 'Q': return {backgroundPosition: "-64px "+Team};
			case 'K': return {backgroundPosition: "0px "+Team};
			case 'C': return {backgroundPosition: "-128px "+Team};
			case 'Kn': return {backgroundPosition: "-192px "+Team};
			case 'B': return {backgroundPosition: "-256px "+Team};
			default:
			break;
		}
	}
	render() {
		return (
			<span><div className={this.props.piece? "piece": ""} style={this.select()}></div></span>
			);
	}
}

export default Piece;