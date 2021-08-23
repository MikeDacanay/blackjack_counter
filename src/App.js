import React, { useReducer } from 'react';

import './App.scss';

const initState = {
  positive: 0,
  neutral: 0,
  negative: 0,
  decks: 8,
  trueCount: 0,
  lastClick: null,
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
    case 'lastClick': 
      return {
        ...state,
        lastClick: action.val    
      }      
    case 'reset':
      return {
        ...initState
      }
    default: 
      return state
  }  
}

export const App = props => {
  const [state, dispatch] = useReducer(reducer, initState);

  const positiveHandlr = () => {
    dispatch({
      type: 'positive'
    })

    dispatch({
      type: 'lastClick',
      val: '2, 3, 4, 5, 6'
    })
  }
                                                    
  const neutralHandlr = () => {
    dispatch({
      type: 'neutral',
    })

    dispatch({
      type: 'lastClick',
      val: '7, 8, 9',
    })
  }
  
  const negativeHandlr = () => {
    dispatch({
      type: 'negative'
    })

    dispatch({
      type: 'lastClick',
      val: '10, J, Q, K, A'
    })
  }

  const setDeckHandlr = () => {
    dispatch({
      type: 'setDeck'
    });
  }

  const resetHandlr = () => {
    dispatch({
      type: 'reset'
    })
  }
  
  const retTrueCount = () => {
    return (state.positive - state.negative)*(52/(52*state.decks - state.positive - state.neutral - state.negative));
  }


  const retBetCount = () => {
    if(retTrueCount() < 1){
      return 'BET 1 UNIT'
    }
    if(retTrueCount() < 2 && retTrueCount() >= 1){
      return 'BET 2 UNIT'
    }
    if(retTrueCount() < 3 && retTrueCount() >= 2){
      return 'BET 3 UNIT'
    }
    
    if(retTrueCount() < 4 && retTrueCount() >= 3){
      return 'BET 4 UNIT'
    }
    
    return 'BET 5 UNIT'
  }

  const percOfTypeDrawn = type => Math.trunc(type/(state.positive+state.negative+state.neutral)*100)

  return (
    <>
      <div className="">Positive Count = {`${state.positive} : ${percOfTypeDrawn(state.positive)}%`}</div>
      <div className="">Neutral Count = {`${state.neutral} : ${percOfTypeDrawn(state.neutral)}%`}</div>
      <div className="">Negative Count = {`${state.negative} : ${percOfTypeDrawn(state.negative)}%`}</div>
      <div className="">Set Deck = {state.decks}</div>
      <div className="">FALSE COUNT = {state.positive - state.negative}</div>
      <div className="bold">TRUE COUNT = {retTrueCount()}</div>
      <div className="bold">BET = {retBetCount()}</div>
      <div>
      <label htmlFor=""></label>
      <input type="text" />
      </div>
      <button
        className='button--1' onClick={positiveHandlr}>2, 3, 4, 5, 6</button>
      <button
        className='button--1' onClick={neutralHandlr}>7, 8, 9</button>
      <button
        className='button--1' onClick={negativeHandlr}>10, J, Q, K, A</button>
      <button
        blassName='button--2' onClick={setDeckHandlr}>Add # Decks</button>
      <button
        blassName='button--2' onClick={resetHandlr}>Reset</button>
      <div className="">LAST CLICKED = {state.lastClick}</div>
    </>
  )
}

export default App;