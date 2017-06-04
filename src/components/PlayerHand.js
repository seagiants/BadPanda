import React from "react";
import { connect } from "react-redux";
import uniqueId from "lodash.uniqueid";
import { Card } from "./Card.js";

const styles = {
  alignSelf: "center"
};

export const PlayerHand = ({ cards }) => (
  <div style={styles}>
    <div>
      {cards.map((card, index) => (
        <Card
          key={uniqueId(card.name)}
          card={card}
          index={index}
        />
      ))}
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  console.log(state.playersState);
  return {
    cards: state.playersState.cards
  };
};
export default connect(mapStateToProps)(PlayerHand);
