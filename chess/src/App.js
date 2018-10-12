import React, {Component} from 'react'
import Board from './components/Board'
import History from './components/History'
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {history: [], current: 0};
		this.jumpTo = this.jumpTo.bind(this);
		this.onMove = this.onMove.bind(this);
	}

	componentWillMount(){
		this.reset();
	}

	reset() {
		const history = [];
		const Pawn = 'P', Castle = 'C', Knight = 'Kn', Bishop = 'B', Queen = 'Q', King ='K';
		function Piece(name,x,y,team) {
			this.name = name;
			this.x = x;
			this.y = y;
			this.team = team;
			this.id = name+y;
			this.isMoved = false;
		}
		var board = [];
		var row = [];
		row.push(new Piece(Castle,0,0,1,));
		row.push(new Piece(Knight,0,1,1));
		row.push(new Piece(Bishop,0,2,1));
		row.push(new Piece(Queen,0,3,1));
		row.push(new Piece(King,0,4,1));
		row.push(new Piece(Bishop,0,5,1));
		row.push(new Piece(Knight,0,6,1));
		row.push(new Piece(Castle,0,7,1));
		board.push(row);
		row = [];
		for(let i = 0; i< 8; i++) row.push(new Piece(Pawn,1,i,1));
		board.push(row);
		for (let i=0; i<4; i++) {
			row = new Array(8).fill(null);
			board.push(row);
		}
		row = [];
		for(let i = 0; i< 8; i++) row.push(new Piece(Pawn,6,i,2));
		board.push(row);
		row = [];
		row.push(new Piece(Castle,7,0,2));
		row.push(new Piece(Knight,7,1,2));
		row.push(new Piece(Bishop,7,2,2));
		row.push(new Piece(Queen,7,3,2));
		row.push(new Piece(King,7,4,2));
		row.push(new Piece(Bishop,7,5,2));
		row.push(new Piece(Knight,7,6,2));
		row.push(new Piece(Castle,7,7,2));
		board.push(row);
		history.push(board);
		// board[3][2] = new Piece(Castle,3,2,2);
		// board[4][5] = new Piece(King,4,5,1);
		this.setState({history});
	}

	jumpTo(step) {
		const current = this.state.current + step;
		if(current>=0 && current<this.state.history.length) this.setState({current});
	}

	onMove(newHis) {
		const history2 = [];
		history2.push(newHis);
		let {history,current} = this.state;
		history[++current] = newHis;
		if(current+1<history.length) {
			history = history.slice(0,current+1);
		}
		this.setState({history,current});
	}

	render() {
    	return (
    		<table className="table noborder">
    			<tbody>
    				<tr>
    					<td><Board history={this.state.history[this.state.current]} turn={this.state.current} 
    					onMove={this.onMove}/></td>
    					<td style={{verticalAlign: "top"}}><History jumpTo={this.jumpTo} turn={this.state.current}/></td>
    				</tr>
    			</tbody>
    			 
    		</table>
	     
	      );
	  }
}

export default App;