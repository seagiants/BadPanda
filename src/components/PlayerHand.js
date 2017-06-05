import React from "react";
import { connect } from "react-redux";
import uniqueId from "lodash.uniqueid";
import Card from "./Card";

const styles = {
  alignSelf: "center"
};

export const PlayerHand = ({ cards }) => (
  <div style={styles}>
      {cards.map((card, index) => (
        <Card
          key={uniqueId(card.name)}
          card={card}
          index={index}
          />
      ))}
  </div>
);

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.playersState.cards
  };
};
export default connect(mapStateToProps)(PlayerHand);
