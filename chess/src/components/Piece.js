import React, {Component} from 'react'
class Piece extends Component {
	select() {
		const Piece = this.props.piece;
		const Team = this.props.team === 1 ? "64px" : "0px";
		switch(Piece) {
			case 'P': 
			return {backgroundPosition: "66px "+Team};
			case 'Q': return {backgroundPosition: "-62px "+Team};
			case 'K': return {backgroundPosition: "2px "+Team};
			case 'C': return {backgroundPosition: "-126px "+Team};
			case 'Kn': return {backgroundPosition: "-190px "+Team};
			case 'B': return {backgroundPosition: "-254px "+Team};
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