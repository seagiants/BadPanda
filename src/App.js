import React from "react";
import PlayerHand from "./components/PlayerHand.js";
import MapDisplay from "./components/MapDisplay";

const styles = {
  display: "flex",
  flexDirection: "column"
};

const App = () => (
  <div style={styles}>
    <PlayerHand />
    <MapDisplay />
  </div>
);

export default App;
