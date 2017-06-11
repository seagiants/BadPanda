import React from "react";
import PlayerHand from "./components/PlayerHand";
import StartButton from "./components/StartButton";
import MapDisplay from "./components/MapDisplay";
import MatchesBox from "./components/MatchesBox";

const styles = {
  display: "flex",
  flexDirection: "column"
};

const App = () => (
  <div style={styles}>
    <PlayerHand />
    <StartButton />
    <MatchesBox/>
    <MapDisplay />
  </div>
);

export default App;
