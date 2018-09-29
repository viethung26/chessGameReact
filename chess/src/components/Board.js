import React, {Component} from 'react'
import Square from './Square'

class Board extends Component {
	setRow(row){
		const color1 = row % 2 ? "white" : "green";
		const color2 = row % 2 ? "green" : "white";
		let squares = [];
		for(let i=0; i<8; i++) {
			squares.push(<Square key={row*8 + i} color={i%2 ? color1 : color2}/>);
		}
		return squares;
	}
	render() {	
		const rows = [];
			for(let i = 0; i<8; i++) {
				rows.push(<tr key={i}>{this.setRow(i)}</tr>);
			}	
		return (
			<table className="table board">
				<tbody>
					{rows}
				</tbody>
			</table>
			);
	}
}

export default Board;