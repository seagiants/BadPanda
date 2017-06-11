import { GENERATE_MAP, PLAY_CARD, CARD_SELECTION, PRE_SHOW_MATCHES, noAction } from "../actions";
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
              ...cell, card : card, showMatches : false
            }
          }
        });
      }
    });
  };

const matchesOnCell = (gameMap, x, y) => {
  return gameMap.map( (row) => {
    return row.map( (cell)=> {
      if (cell.x === x && cell.y === y) {
          return {
            ...cell, showMatches : true
          };
        }else{
          if (cell.showMatches === false) {
            return cell;
          }else{
            return {
              ...cell, showMatches : false
            };
          }
        }
      });
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
      return { ...state, gameMap : cardOnCell(state.gameMap, action.x, action.y, action.card ), selectedCard: null, indexSelectedCard: null, scoredMatches: action.matches}
    case PRE_SHOW_MATCHES:
      return { ...state, gameMap : matchesOnCell(state.gameMap, action.x, action.y), matches : action.matches }
    default:
      return state;
  }
};
