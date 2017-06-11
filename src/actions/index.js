
import { calculMatches } from "./calculMatches.js"

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

/* Action creators */
export function startGame() {
    return {
    type: START_GAME
  };
}

export function generateMap(x, y) {
  return {
    type: GENERATE_MAP,
    x: x,
    y: y
  };
}

export function draw(player) {
  return{
    type: DRAW,
    player: player
  };
};

export function noAction(player){
    return {
      type: NO_ACTION,
      player: player
    };
  };

  export function playCard(x,y,card,indexSelectedCard,matches){
    return {
      type: PLAY_CARD,
      index: indexSelectedCard,
      card: card,
      x: x,
      y: y,
      matches: matches
  };
};

export function cardSelection(card,index){
  return {
    type: CARD_SELECTION,
    index: index,
    card: card
  };
};


export function endTurn(){
  return {
    type: END_TURN,
  };
};


export function preshowMatches(x,y,card,neighbours){
  return {
    type: PRE_SHOW_MATCHES,
    x: x,
    y: y,
    matches: calculMatches(card,neighbours)
  };
};
