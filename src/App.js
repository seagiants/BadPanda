import React from "react";
import PlayerHand from "./components/PlayerHand";
import MapDisplay from "./components/MapDisplay";
import MatchesBox from "./components/MatchesBox";

const styles = {
  display: "flex",
  flexDirection: "column"
};

const App = () => (
  <div style={styles}>
    <PlayerHand/>
    <MatchesBox/>
    <MapDisplay />
  </div>
);

export default App;
