import React from "react";
import { connect } from "react-redux";
import { noAction, playCard } from "../actions";

const w = 30;
const h = 30;

const cellColor = cell => cell.card ? cell.card.color : "gray";

const Cell = ({ cell, click, selectedCard, indexSelectedCard }) => {
  return (
    <svg
      width={w}
      height={h} style={{border: "2px solid black"}}
      onClick={e => {
        e.preventDefault();
        console.log(
          `clicking on a ${cell.name} tile with position [${cell.x} - ${cell.y}]`
        );
        click(cell.x, cell.y, selectedCard, indexSelectedCard);
      }}
    >
      <rect width={w} height={h} style={{fill: cellColor(cell)}} />
    </svg>
  );
};

const mapStateToProps = state => {
  if(state.mapState.selectedCard !== null) {
    return {
      selectedCard: state.mapState.selectedCard,
      indexSelectedCard : state.mapState.indexSelectedCard
     };
  } else {
    return {
      selectedCard: null,
      indexSelectedCard : null
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    click: (x, y, card, index) => {
      if(card !== null && card !== undefined){
        dispatch(playCard(x,y,card,index));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
