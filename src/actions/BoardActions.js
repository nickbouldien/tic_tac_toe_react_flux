import Dispatcher from '../dispatchers/Dispatcher';

export function squareClickedAction(index, player){
  Dispatcher.dispatch({
    type: 'SQUARE_SET',
    index: index,
    player: player
  })
}

export function clearBoard(){
  Dispatcher.dispatch({
    type: 'CLEAR_BOARD'
  })
}
