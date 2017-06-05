import { drawCards } from "../engine";
import { PLAY_CARD } from "../actions"

const initialState = {
    cards : drawCards(5)
  };

const dropAndDrawCardFromHand = (playerHand, cardIndex) => {
  return playerHand.map( (card,index) => {
    if (index !== cardIndex) {
      return card;
    }else{
      return drawCards(1)[0];
    }
  });
}

export const playersState = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_CARD :
       return {
         ...state, cards: dropAndDrawCardFromHand(state.cards, action.index)
       };

    default:
      return state;
    }
  };
