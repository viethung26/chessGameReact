import React, {Component} from 'react'

class History extends Component {
	render() {
		return (
			<div className="history">
				<h3>History</h3>
				<hr/>
				<p>Turn: {this.props.turn} - Team: {this.props.turn%2?1:2}</p>
	
					<span><button onClick={()=>this.props.jumpTo(-1)}>Previous</button>&nbsp; 
					<button onClick={()=>this.props.jumpTo(1)}>Next</button></span>			
			</div>
			);

	}
}



export default History