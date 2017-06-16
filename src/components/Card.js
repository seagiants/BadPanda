import React from "react";
import { connect } from "react-redux";
import { CARD_SELECTION, sendAction } from "../actions";

const h = 60;
const w = 40;

const Card = ({ click, card , index }) => {
  return (
   <svg width={2*w} height={2*h} >
   <text x="0"
      y="20"
      id="text4533">{card.race} / {card.classC} </text>      
    <rect x="20" y="30" width={w} height={h}
    style={{fill: card.color}}
    onClick={e => {
     e.preventDefault();
     console.log(`clicking on a ${card.name} card`);
     click(card,index);
   }}  />
   </svg>
 );
};

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    click: (card, index) => {
      dispatch(sendAction(CARD_SELECTION,{card:card,index:index}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
