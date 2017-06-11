import React from "react";
import { connect } from "react-redux";
import uniqueId from "lodash.uniqueid";
import Card from "./Card";

const styles = {
  alignSelf: "center"
};

const renderHand = (cards) => {
if(cards) {
  return cards.map((card, index) => (
    <Card
      key={uniqueId(card.name)}
      card={card}
      index={index}
    />));}
  else {
        return [];
        }};


export const PlayerHand = ({ cards }) =>{
      return (
              <div style={styles}>{renderHand(cards)}</div>
              );}

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.playersState.cards
  };
};
export default connect(mapStateToProps)(PlayerHand);
