import React from "react";
import { connect } from "react-redux";
import uniqueId from "lodash.uniqueid";
import { PlayerHand } from "./PlayerHand.js"

const styles = {
  alignSelf: "center"
};

const PlayerBoard = () => (
  <div style={styles}>
      <div>
        {<PlayerHand/>}
    </div>
  </div>
);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PlayerBoard);
