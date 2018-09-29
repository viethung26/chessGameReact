import React, {Component} from 'react'

class Square extends Component {
	render() {
		const style = {backgroundColor: this.props.color};
		return (
			<td className="btn square" style={style}
			></td>
			);
	}
}

export default Square