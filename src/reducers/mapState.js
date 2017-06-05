import { GENERATE_MAP, PLAY_CARD, CARD_SELECTION, noAction } from "../actions";
import { generateMap } from "../engine";

const initialState = {
  gameMap: generateMap(20, 20),
  selectedPower : noAction
};

const cardOnCell = (gameMap, x, y, card) => {
  return gameMap.map( (row,index) => {
    if(index !== x) {
      return row;
    }else{
      return row.map( (cell,index) => {
          if(index !== y) {
            return cell;
          }else{
            return {
              ...cell, card : card
            }
          }
        });
      }
    });
  };

export const mapState = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_MAP:
      return { ...state, gameMap: generateMap(action.x, action.y) };
    case CARD_SELECTION:
      let newSelectedCard = action.card;
      return { ...state, selectedCard: newSelectedCard, indexSelectedCard : action.index };
    case PLAY_CARD:
      return { ...state, gameMap : cardOnCell(state.gameMap, action.x, action.y, action.card ), selectedCard: null, indexSelectedCard: null}
    default:
      return state;
  }
};
