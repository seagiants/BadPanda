
import {getMatches} from "../selectors/getMatches.js";
import { getMonsters} from "../selectors/getMonsters.js"

/* Action types */
export const START_GAME = "START_GAME";
export const GENERATE_MAP = "GENERATE_MAP";
export const DISCOVER_CELL = "DISCOVER_CELL";
export const DRAW = "DRAW";
export const NO_ACTION = "NO_ACTION";
export const PLAY_CARD = "PLAY_CARD";
export const CARD_SELECTION = "CARD_SELECTION";
export const END_TURN = "END_TURN";
export const PRE_SHOW_MATCHES = "PRE_SHOW_MATCHES";
export const SHOW_MATCHES = "SHOW_MATCHES";
export const CLICK_CELL = "CLICK_CELL";
export const ATTACK = "ATTACK"

export function sendAction(type,payload) {
  return{
    type:type,
    payload:payload
  };
};

export function clickCell(payload,dispatch){
//  console.log(payload);
  //First Check if a card is selectionned
  if(payload.card){
      const matches = getMatches(payload.card,payload.neighbours);
      dispatch(sendAction(PLAY_CARD,{...payload,matches:matches}));
      /* Auto attack on 1st monster
      if(matches && matches.total > 1){
        dispatch(sendAction(ATTACK,{...payload,matches:matches}));
      }*/
  //Second getMonsters then Attack
  } else {
    const monsters = getMonsters(payload.monsters,payload.x, payload.y);
    if(monsters){
    dispatch(sendAction(ATTACK,{...payload,monsters:monsters}));
    }
  }
};
