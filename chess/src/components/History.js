import React, {Component} from 'react'

class History extends Component {
	render() {
		return (
			<div className="history">
				<h3>History</h3>
				<hr/>
				<ul>
					<li><button onClick={()=>this.props.jumpTo(-1)}>Previous</button></li>
					<li><button onClick={()=>this.props.jumpTo(1)}>Next</button></li>
				</ul>
			</div>
			);

	}
}



export default History