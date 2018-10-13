import React, {Component} from 'react'

class History extends Component {
	setList() {
		const SIZE = this.props.size;
		const LIST = [];
		for(let i=SIZE-1; i>0; i--) {
			LIST.push(<li key={i}><button className="button" onClick={()=>this.props.jumpTo(i)}>#Step {i}</button></li>)
		}
		
		return(LIST);
	}
	render() {
		const turn = this.props.turn;
		return (
			<div className="history">
				<h2>History</h2>
				<hr/>
				<p>Turn: {turn+1} - Team: {turn%2?1:2}</p>	
				<ul>
					<li><button className="btn2" onClick={()=>this.props.jumpTo(turn-1)}>Previous</button> 
					<button className="btn2" onClick={()=>this.props.jumpTo(turn+1)}>Next</button></li>	
					<li key={0}><button className="button" onClick={()=>this.props.jumpTo(0)}>New Game</button></li>
					{this.setList()}
				</ul>	
			</div>
			);

	}
}



export default History