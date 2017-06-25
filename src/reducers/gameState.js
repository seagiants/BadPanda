import { generateDeck, fillHand, dropAndDrawCardFromHand } from "../engine";
import { PLAY_CARD, START_GAME } from "../actions";
import { catLib } from "../libraries/catLib.js"

const initialState = {
    deck : generateDeck(catLib),
    isStarted : false
  };

export const playersState = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case START_GAME :
      newState = fillHand(state.deck,[]);
      return {
        ...state, cards: newState.cards, deck: newState.deck , isStarted : true
      };
    case PLAY_CARD :
      newState = dropAndDrawCardFromHand(state.cards, state.deck, action.payload.index)
      return {
         ...state, cards: newState.cards, deck: newState.deck
              };
    default:
      return state;
    }
  };
