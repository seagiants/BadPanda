import React from "react";
import { connect } from "react-redux";
import { selectedCard } from "../actions";

const h = "60";
const w = "40";

export const Card = ({ card, index, player, click }) => {
  return (
    <svg width={2*w} height={2*h} >
    <text x="0"
       y="20"
       id="text4533">{card.name} / {card.cost}</text>
    <rect x="20" y="30" width={w} height={h} style={{fill: card.color}} onClick={e => {
      e.preventDefault();
      console.log(`clicking on a ${card.name} card`);
      click(player,card,index);
    }} />
    </svg>
);
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    click: (player, card, cardIndex) => {
      dispatch(selectedCard(player, card, cardIndex));
    }
  };
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Card);