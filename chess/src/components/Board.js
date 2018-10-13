import React, {Component} from 'react'
import Square from './Square'

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [],
			deadZone: [],
			movable: [],
			turn: 0,	
			current: null
		};
		this.handleCurrentChange = this.handleCurrentChange.bind(this);
	}
	reset(props) {
		const history = props.history;
		let board = [];
		const turn = props.turn%2 ?1 :2;
		for(let i in history) {
			board[i] = [];
			for(let j in history[i]) {
				const PIECE = JSON.stringify(history[i][j]);
				board[i][j] = JSON.parse(PIECE);
			}
		}
		this.setState({board,turn});
	}
	componentWillMount() {
		this.reset(this.props);
	}
	componentDidMount() {
		this.setDeadZone();
	}
	componentWillReceiveProps(nextProps) {
		this.reset(nextProps);
		this.setState({current: null});
		this.setDeadZone();
		this.canMove(null);
	}
	setRow(row){
		const {board, movable} = this.state;
		const color1 = row % 2 ? "white" : "green";
		const color2 = row % 2 ? "green" : "white";
		let squares = [];
		const current = this.state.current ? this.state.current.toString() : "";
		for(let i=0; i<8; i++) {
			var isMovable = false;
			for(let j in movable) {if(movable[j].x === row && movable[j].y === i) isMovable = true}
			const isChosen = current === [row,i].toString() ? true : false;
			squares.push(<Square key={row*8 + i} color={i%2 ? color1 : color2} 
				pos = {{x: row, y: i}}
				isChosen={isChosen} 
				isMovable={isMovable}
				occupied={board[row][i]} 
				onClick={this.handleCurrentChange}
				onMove={this.handleMove}/>);
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
	canMove(PIECE) {
		function Pos(x,y) {
			this.x=x;
			this.y=y;
		}
		var movable = [];
		var special = 0;
		if(!PIECE) {this.setState({movable}); return special}
		const {board} = this.state;
		const NAME = PIECE.name;
		const X = PIECE.x;
		const Y = PIECE.y; 
		switch(NAME) {
			case "P": 
				let inc = PIECE.team === 1 ? 1 : -1;
				if(X===7 || X===0) {special = 1;break;}
				if(board[X+inc][Y] === null) movable.push(new Pos(X+inc,Y));
				if(!PIECE.isMoved) if(board[X+inc*2][Y] === null && board[X+inc][Y] === null) movable.push(new Pos(X+inc*2,Y));
				if(Y>0 && board[X+inc][Y-1]) if(board[X+inc][Y-1].team !== PIECE.team) movable.push(new Pos(X+inc,Y-1));
				if(Y<7 && board[X+inc][Y+1]) if(board[X+inc][Y+1].team !== PIECE.team) movable.push(new Pos(X+inc,Y+1));
			break;
			case "C":
				for(let i=X+1; i<8; i++)
					if(board[i][Y] === null) movable.push(new Pos(i,Y));
					else {
						if(board[i][Y].team !== PIECE.team) movable.push(new Pos(i,Y));
					}
				for(let i=X-1; i>=0; i--)
					if(board[i][Y] === null) movable.push(new Pos(i,Y));
					else {
						if(board[i][Y].team !== PIECE.team) movable.push(new Pos(i,Y));
						break;
					}
				for(let i=Y-1; i>=0; i--)
					if(board[X][i] === null) movable.push(new Pos(X,i));
					else {
						if(board[X][i].team !== PIECE.team) movable.push(new Pos(X,i));
						break;
					}
				for(let i=Y+1; i<8; i++)
					if(board[X][i] === null) movable.push(new Pos(X,i));
					else {
						if(board[X][i].team !== PIECE.team) movable.push(new Pos(X,i));
						break;
					}				
			break;
			case "Kn":
				const STEP = [[2,1], [2,-1], [1,-2], [1,2], [-1,-2], [-1,2], [-2,-1], [-2,1]];
				for(let i in STEP) {
					const xnew = X+STEP[i][0];
					const ynew = Y+STEP[i][1];
					if(xnew<8 && xnew>=0 &&	ynew<8 && ynew>=0)
						if(board[xnew][ynew]) {
							if(board[xnew][ynew].team!==PIECE.team) movable.push(new Pos(xnew, ynew));
						}
						else movable.push(new Pos(xnew, ynew));
				}
			break;
			case "B":
				for(let i=1; i<8; i++)
					if(X+i<8 && Y+i<8) {
						if(board[X+i][Y+i] === null) movable.push(new Pos(X+i,Y+i));
						else {
							if(board[X+i][Y+i].team !== PIECE.team) movable.push(new Pos(X+i,Y+i));
							break;
						}
					}
				for(let i=1; i<8; i++)
					if(X-i>=0 && Y-i>=0) {
						if(board[X-i][Y-i] === null) movable.push(new Pos(X-i,Y-i));
						else {
							if(board[X-i][Y-i].team !== PIECE.team) movable.push(new Pos(X-i,Y-i));
							break;
						}
					}
				for(let i=1; i<8; i++)
					if(X+i<8 && Y-i>=0) {
						if(board[X+i][Y-i] === null) movable.push(new Pos(X+i,Y-i));
						else {
							if(board[X+i][Y-i].team !== PIECE.team) movable.push(new Pos(X+i,Y-i));
							break;
						}
					}
				for(let i=1; i<8; i++)
					if(X-i>=0 && Y+i<8) {
						if(board[X-i][Y+i] === null) movable.push(new Pos(X-i,Y+i));
						else {
							if(board[X-i][Y+i].team !== PIECE.team) movable.push(new Pos(X-i,Y+i));
							break;
						}
					}
			break;
			case "Q":
				for(let i=X+1; i<8; i++)
					if(board[i][Y] === null) movable.push(new Pos(i,Y));
					else {
						if(board[i][Y].team !== PIECE.team) movable.push(new Pos(i,Y));
						break;
					}
				for(let i=X-1; i>=0; i--)
					if(board[i][Y] === null) movable.push(new Pos(i,Y));
					else {
						if(board[i][Y].team !== PIECE.team) movable.push(new Pos(i,Y));
						break;
					}
				for(let i=Y-1; i>=0; i--)
					if(board[X][i] === null) movable.push(new Pos(X,i));
					else {
						if(board[X][i].team !== PIECE.team) movable.push(new Pos(X,i));
						break;
					}
				for(let i=Y+1; i<8; i++)
					if(board[X][i] === null) movable.push(new Pos(X,i));
					else {
						if(board[X][i].team !== PIECE.team) movable.push(new Pos(X,i));
						break;
					}			
				for(let i=1; i<8; i++)
					if(X+i<8 && Y+i<8) {
						if(board[X+i][Y+i] === null) movable.push(new Pos(X+i,Y+i));
						else {
							if(board[X+i][Y+i].team !== PIECE.team) movable.push(new Pos(X+i,Y+i));
							break;
						}
					}
				for(let i=1; i<8; i++)
					if(X-i>=0 && Y-i>=0) {
						if(board[X-i][Y-i] === null) movable.push(new Pos(X-i,Y-i));
						else {
							if(board[X-i][Y-i].team !== PIECE.team) movable.push(new Pos(X-i,Y-i));
							break;
						}
					}
				for(let i=1; i<8; i++)
					if(X+i<8 && Y-i>=0) {
						if(board[X+i][Y-i] === null) movable.push(new Pos(X+i,Y-i));
						else {
							if(board[X+i][Y-i].team !== PIECE.team) movable.push(new Pos(X+i,Y-i));
							break;
						}
					}
				for(let i=1; i<8; i++)
					if(X-i>=0 && Y+i<8) {
						if(board[X-i][Y+i] === null) movable.push(new Pos(X-i,Y+i));
						else {
							if(board[X-i][Y+i].team !== PIECE.team) movable.push(new Pos(X-i,Y+i));
							break;
						}
					}	
			break;
			case "K":
				const STEPK = [[1,0], [1,-1], [1,1], [0,1], [0,-1], [-1,1], [-1,0], [-1,-1]];
				if(!PIECE.isMoved && !this.isInDeadZone(X,4,PIECE.team)) {
					if(board[X][7] && !board[X][5] && !board[X][6]){
						if(!board[X][7].isMoved && !this.isInDeadZone(X,5,PIECE.team) && !this.isInDeadZone(X,6,PIECE.team)) {
							movable.push(new Pos(X,6));
						}
					}
					if(board[X][0] && !board[X][3] && !board[X][2]) {
						if(!board[X][0].isMoved && !this.isInDeadZone(X,3,PIECE.team) && !this.isInDeadZone(X,2,PIECE.team))
							movable.push(new Pos(X,2));
					}
						
				}
				for(let i in STEPK) {
					const xnew = X+STEPK[i][0];
					const ynew = Y+STEPK[i][1];
					if(xnew<8 && xnew>=0 &&	ynew<8 && ynew>=0 && !this.isInDeadZone(xnew,ynew,PIECE.team)){
						if(board[xnew][ynew]) {
							if(board[xnew][ynew].team!==PIECE.team) movable.push(new Pos(xnew, ynew));
						}
						else movable.push(new Pos(xnew, ynew));
					}	
				}
			break;
			default: 
			break;
		}
		this.setState({movable});
		return special;
	}
	setDeadZone() {
		const {board} = this.state;
		var deadZone = new Array(8).fill(0);
		for(let i in deadZone) deadZone[i] = new Array(8).fill(0);
		for(let i=0; i<8; i++)
			for(let j=0; j<8; j++)
			{
				const PIECE = board[i][j];
				if(!PIECE) continue;
				const NAME = PIECE.name;
				const X = PIECE.x;
				const Y = PIECE.y; 
				switch(NAME) {
					case "P": 
						let inc = PIECE.team === 1 ? 1 : -1;
						if(Y>0)	deadZone[X+inc][Y-1]=setFlag(PIECE.team,deadZone[X+inc][Y-1]);
						if(Y<7)	deadZone[X+inc][Y+1]=setFlag(PIECE.team,deadZone[X+inc][Y+1]);
					break;
					case "C":
						for(let i=X+1; i<8; i++){
							deadZone[i][Y] = setFlag(PIECE.team,deadZone[i][Y]);
							if(board[i][Y]) if (board[i][Y].name !== "K"||board[i][Y].team === PIECE.team) break;
						}
						for(let i=X-1; i>=0; i--){
							deadZone[i][Y] = setFlag(PIECE.team,deadZone[i][Y]);
							if(board[i][Y]) if (board[i][Y].name !== "K"||board[i][Y].team === PIECE.team) break;
						}
						for(let i=Y+1; i<8; i++){
							deadZone[X][i] = setFlag(PIECE.team,deadZone[X][i]);
							if(board[X][i]) if (board[X][i].name !== "K"||board[X][i].team === PIECE.team) break;
						}
						for(let i=Y-1; i>=0; i--){
							deadZone[X][i] = setFlag(PIECE.team,deadZone[X][i]);
							if(board[X][i]) if (board[X][i].name !== "K"||board[X][i].team === PIECE.team) break;
						}			
					break;
					case "Kn":
						const STEP = [[2,1], [2,-1], [1,-2], [1,2], [-1,-2], [-1,2], [-2,-1], [-2,1]];
						for(let i in STEP) {
							const xnew = X+STEP[i][0];
							const ynew = Y+STEP[i][1];
							if(xnew<8 && xnew>=0 &&	ynew<8 && ynew>=0)
								deadZone[xnew][ynew] = setFlag(PIECE.team, deadZone[xnew][ynew]);
						}
					break;
					case "B":
						for(let i=1; i<8; i++)
							if(X+i<8 && Y+i<8) {
								deadZone[X+i][Y+i] = setFlag(PIECE.team,deadZone[X+i][Y+i]);
								if(board[X+i][Y+i]) if (board[X+i][Y+i].name !== "K"|board[X+i][Y+i].team === PIECE.team) break;
							}
						for(let i=1; i<8; i++)
							if(X-i>=0 && Y-i>=0) {
								deadZone[X-i][Y-i] = setFlag(PIECE.team,deadZone[X-i][Y-i]);
								if(board[X-i][Y-i]) if (board[X-i][Y-i].name !== "K"|board[X-i][Y-i].team === PIECE.team) break;
							}
						for(let i=1; i<8; i++)
							if(X+i<8 && Y-i>=0) {
								deadZone[X+i][Y-i] = setFlag(PIECE.team,deadZone[X+i][Y-i]);
								if(board[X+i][Y-i]) if (board[X+i][Y-i].name !== "K"|board[X+i][Y-i].team === PIECE.team) break;
							}
						for(let i=1; i<8; i++)
							if(X-i>=0 && Y+i<8) {
								deadZone[X-i][Y+i] = setFlag(PIECE.team,deadZone[X-i][Y+i]);
								if(board[X-i][Y+i]) if (board[X-i][Y+i].name !== "K"|board[X-i][Y+i].team === PIECE.team) break;
							}
					break;
					case "Q":
						for(let i=X+1; i<8; i++){
							deadZone[i][Y] = setFlag(PIECE.team,deadZone[i][Y]);
							if(board[i][Y]) if (board[i][Y].name !== "K"||board[i][Y].team === PIECE.team) break;
						}
						for(let i=X-1; i>=0; i--){
							deadZone[i][Y] = setFlag(PIECE.team,deadZone[i][Y]);
							if(board[i][Y]) if (board[i][Y].name !== "K"||board[i][Y].team === PIECE.team) break;
						}
						for(let i=Y+1; i<8; i++){
							deadZone[X][i] = setFlag(PIECE.team,deadZone[X][i]);
							if(board[X][i]) if (board[X][i].name !== "K"||board[X][i].team === PIECE.team) break;
						}
						for(let i=Y-1; i>=0; i--){
							deadZone[X][i] = setFlag(PIECE.team,deadZone[X][i]);
							if(board[X][i]) if (board[X][i].name !== "K"||board[X][i].team === PIECE.team) break;
						}
						for(let i=1; i<8; i++)
							if(X+i<8 && Y+i<8) {
								deadZone[X+i][Y+i] = setFlag(PIECE.team,deadZone[X+i][Y+i]);
								if(board[X+i][Y+i]) if (board[X+i][Y+i].name !== "K"|board[X+i][Y+i].team === PIECE.team) break;
							}
						for(let i=1; i<8; i++)
							if(X-i>=0 && Y-i>=0) {
								deadZone[X-i][Y-i] = setFlag(PIECE.team,deadZone[X-i][Y-i]);
								if(board[X-i][Y-i]) if (board[X-i][Y-i].name !== "K"|board[X-i][Y-i].team === PIECE.team) break;
							}
						for(let i=1; i<8; i++)
							if(X+i<8 && Y-i>=0) {
								deadZone[X+i][Y-i] = setFlag(PIECE.team,deadZone[X+i][Y-i]);
								if(board[X+i][Y-i]) if (board[X+i][Y-i].name !== "K"|board[X+i][Y-i].team === PIECE.team) break;
							}
						for(let i=1; i<8; i++)
							if(X-i>=0 && Y+i<8) {
								deadZone[X-i][Y+i] = setFlag(PIECE.team,deadZone[X-i][Y+i]);
								if(board[X-i][Y+i]) if (board[X-i][Y+i].name !== "K"|board[X-i][Y+i].team === PIECE.team) break;
							}		
					break;
					case "K":
						const STEPK = [[1,0], [1,-1], [1,1], [0,1], [0,-1], [-1,1], [-1,0], [-1,-1]];
						for(let i in STEP) {
							const xnew = X+STEPK[i][0];
							const ynew = Y+STEPK[i][1];
							if(xnew<8 && xnew>=0 &&	ynew<8 && ynew>=0)
								deadZone[xnew][ynew] = setFlag(PIECE.team, deadZone[xnew][ynew]);
						}
					break;
					default: 
					break;
				}
			}
		console.log("deadZone was reset");
		this.setState({deadZone});
	}
	isInDeadZone(x,y,team) {
		const {deadZone} = this.state;
		if(deadZone[x][y]!==0 && deadZone[x][y]!==team) return true;
		return false;
	}

	handleCurrentChange(pos) {
		var {board,current,movable,turn} = this.state;
		let wasMoved = false;
		//Can move
		if(current !== null) {
			let isMovable = false;
			for(let mov of movable) {if(mov.x === pos.x && mov.y === pos.y) isMovable = true}
			if(isMovable) {
				board[current.x][current.y] = null;
				if(current.name === 'K' ) {
					if(current.y - pos.y === 2) {
						let old = board[current.x][0];
						old.y = 3;
						old.isMoved = true;
						board[current.x][3] = old;
						board[current.x][0] = null;

					} else if(current.y - pos.y === -2) {
						let old = board[current.x][7];
						old.y = 5;
						old.isMoved = true;
						board[current.x][5] = old;
						board[current.x][7] = null;
					}
				}
				current.x = pos.x;
				current.y = pos.y;
				current.isMoved = true;
				if(this.canMove(current) === 1) {current.name = 'Q';current.id = current.name+current.id;}
				board[pos.x][pos.y] = current;
				current = null;
				wasMoved = true;
			} else if(board[pos.x][pos.y]){
				if(board[pos.x][pos.y].team===turn)
					current = board[pos.x][pos.y];
			} else current = board[pos.x][pos.y];

		} else if(board[pos.x][pos.y]) {
			if(board[pos.x][pos.y].team===turn)
				current = board[pos.x][pos.y];
		}
		if(wasMoved) {
			turn = turn % 2 +1;
			this.setDeadZone();
			this.props.onMove(board);
		}
		this.canMove(current);
		this.setState({current});
	}
}
function setFlag(team,flag) {
	switch(flag) {
		case 0: return team;
		case 1: if(team!==1) return 3;
		break;
		case 2: if(team!==2) return 3;
		break;
		default: 
		break;
	}
	return flag;
}
export default Board;