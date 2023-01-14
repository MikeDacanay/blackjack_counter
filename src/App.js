import React, { useReducer } from 'react';
import useKeyPress from './hooks';

import './App.scss';

const initState = {
  positive: 0,
  neutral: 0,
  negative: 0,
  decks: 8,
  trueCount: 0,
  ante: 0,
  lastClick: null,
};

const reducer = (state, action) => {
  switch(action.type){
    case 'setAnte': {
        return {
          ...state,
          ante: action.val,
        }
    }
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

  const setAnteHandlr = (e) => {
    dispatch({
      type: 'setAnte',
      val: e.target.value
    });
  };
  
  const retTrueCount = () => {
    return (state.positive - state.negative)*(52/(52*state.decks - state.positive - state.neutral - state.negative));
  }


  const retBetCount = () => {

    if(retTrueCount() < 0) return `${state.ante} or pause`;

    return state.ante * 1 + Math.trunc(state.ante * retTrueCount());
  }

  const percOfTypeDrawn = type => Math.trunc(type/(state.positive+state.negative+state.neutral)*100)

  useKeyPress('a', positiveHandlr);
  useKeyPress('s', neutralHandlr);
  useKeyPress('d', negativeHandlr);

  return (
    <>
      <div className="">Positive Count = {`${state.positive} : ${percOfTypeDrawn(state.positive)}%`}</div>
      <div className="">Neutral Count = {`${state.neutral} : ${percOfTypeDrawn(state.neutral)}%`}</div>
      <div className="">Negative Count = {`${state.negative} : ${percOfTypeDrawn(state.negative)}%`}</div>
      <div className="">Set Deck = {state.decks}</div>
      <div className="">FALSE COUNT = {state.positive - state.negative}</div>
      <div className="bold">TRUE COUNT = {retTrueCount()}</div>
      <div className="bold bet">BET = {retBetCount()}</div>
      <div>
        <label className='bold' htmlFor="ante">Ante:</label>
        <input 
          id='ante' 
          name='ante' 
          type="text" 
          onChange={(e) => setAnteHandlr(e)}/>
        {/* <span>Bet Amount: <span className='bold'>{retTrueCount() > 0 ? 'greater than 1' : }</span></span>  */}
        {/* state.ante */}
      </div>
      <button
        className='button--1' onClick={positiveHandlr}>2, 3, 4, 5, 6</button>
      <button
        className='button--1' onClick={neutralHandlr}>7, 8, 9</button>
      <button
        className='button--1' onClick={negativeHandlr}>10, J, Q, K, A</button>
      <button
        className='button--2' onClick={setDeckHandlr}>Add # Decks</button>
      <button
        className='button--2' onClick={resetHandlr}>Reset</button>
      <div className="">LAST CLICKED = {state.lastClick}</div>
    </>
  )
}

export default App;