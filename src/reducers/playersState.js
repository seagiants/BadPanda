import { drawCards } from "../engine";

const initialState = {
    cards : drawCards(5)
  };

export const playersState = (state = initialState, action) => {
  return state;
  };
