import React, { Component } from 'react';
import './App.css';
import Board from './stores/Board'
import {clearBoard, squareClickedAction} from './actions/BoardActions';
import Players from './stores/Player';

class App extends Component {
  constructor(){
    super()
    this.handleBoardChange = this.handleBoardChange.bind(this) // ???
    this.state={
      squares: Board.getSquares()
    }
  }

  handleBoardChange(){
    this.setState({
      squares: Board.getSquares(),
      winner: Board.getWinner()
    }) // or bind(this) aqui?

  }

  componentWillMount(){
    Board.on('changed', this.handleBoardChange) // can do .bind(this) here instead of in constructor??
  }

  componentWillUnmount(){
    Board.removeListener('changed', this.handleBoardChange)
  }

  handleSquareClick(event){
    const target = event.target
    const currentPlayer = Players.currentPlayer()
    squareClickedAction(target.dataset.id, currentPlayer)
  }

  handleNewGame(){
    console.log('entered');
    clearBoard()
  }

  render() {
    const squares = this.state.squares.map(function(square, index){
      return(
        <div
          key={index}
          data-id={index}
          onClick={this.handleSquareClick.bind(this)}
          className='square'>
          {square}
        </div>
      )
    }.bind(this))
    return (
      <div>
        {this.state.winner &&
          <div className="winner-container">
            <div className="winner">
              <h3>And the winner is: {this.state.winner}</h3>
            </div>
            <button onClick={this.handleNewGame.bind(this)}>New Game</button>
          </div>
        }
        <div className="board">
          {squares}
        </div>
      </div>
    );
  }
}

export default App;
