import React, {Component} from 'react'
import Piece from './Piece'
class Square extends Component {
	handleClick() {
		this.props.onClick(this.props.pos);
	}
	render() {
		var opacity = this.props.isChosen ? 0.5 : 1;
		// var opacity = this.props.isMovable ? 0.5 : 1;
		const style = this.props.isMovable ? {backgroundColor: "red"} :{backgroundColor: this.props.color, opacity};
		return (
			<td className="btn square" style={style} onClick={()=>this.handleClick()}
			><Piece piece={this.props.occupied ? this.props.occupied.name+this.props.occupied.team : null}/></td>
			);
	}
}

export default Square