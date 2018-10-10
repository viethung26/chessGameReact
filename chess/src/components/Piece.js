import React, {Component} from 'react'
import Queen from '../images/queen.png'

class Piece extends Component {
	render() {
		return (
			<span>{this.props.piece}<img src={Queen} alt='Queen' /></span>
			);
	}
}

export default Piece;