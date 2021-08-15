import React, { useReducer } from 'react';

import './App.scss';

const initState = {
  positive: 0,
  neutral: 0,
  negative: 0,
  decks: 0,
  trueCount: 0,
};

const reducer = (state, action) => {
  switch(action.type){
    case 'positive':
      return {
        ...state,
        positive: state.positive + 1
      }
    case 'neutral':
      return {
        ...state,
        neutral: state.neutral + 1
      }
    case 'negative':
      return {
        ...state,
        negative: state.negative + 1
      }
    case 'setDeck':
      return {
        ...state,
        decks: state.decks + 1
      }
    default: 
      return state
  }  
}

const App = props => {
  const [state, dispatch] = useReducer(reducer, initState);

  const positiveHandlr = () => {
    dispatch({
      type: 'positive'
    })
  }
                                                    
  const neutralHandlr = () => {
    dispatch({
      type: 'neutral'
    })
  }
  
  const negativeHandlr = () => {
    dispatch({
      type: 'negative'
    })
  }

  const setDeckHandlr = () => {
    dispatch({
      type: 'setDeck'
    });
  }

  const returnTrueCount = () => {
    return (state.positive - state.negative)*(52/(52*state.decks - state.positive - state.neutral - state.negative));
  }

  //Card count 2 = Bet 2 unit

  return (
    <>
      <div className="">Positive Count = {state.positive}</div>
      <div className="">Neutral Count = {state.neutral}</div>
      <div className="">Negative Count = {state.negative}</div>
      <div className="">Set Deck = {state.decks}</div>
      <div className="">FALSE COUNT = {state.positive - state.negative}</div>
      {/* <div className="bold">TRUE COUNT = {(state.positive - state.negative)*(52/(52*state.decks - state.positive - state.neutral - state.negative))}</div> */}
      <div className="bold">TRUE COUNT = {returnTrueCount()}</div>
      {/* <div className="bold">BET = {(state.positive - state.negative)*(52/(52*state.decks - state.positive - state.neutral - state.negative))}</div> */}
      <button
        onClick={positiveHandlr}>2, 3, 4, 5, 6</button>
      <button
        onClick={neutralHandlr}>7, 8, 9</button>
      <button
        onClick={negativeHandlr}>10, J, Q, K, A</button>
      <button
        onClick={setDeckHandlr}>Add # Decks</button>
    </>
  )
}

export default App;