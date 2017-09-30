import React from "react";
import StartButton from "./StartButton";
import { connect } from "react-redux";

const h = 80;
const w = 160;

const MatchesBox = ({scoredMatches}) => {
  return (
  <div>
   <StartButton/>
   <svg width={3*w} height={3*h}>
   <g>
     <text x="10" y="20">{scoredMatches?"Total : "+scoredMatches.total:""}</text>
     <text x="10" y="40">{scoredMatches?scoredMatches.color.type + " : " + scoredMatches.color.score:""}</text>
     <text x="10" y="60">{scoredMatches?scoredMatches.classC.type + " : " + scoredMatches.classC.score:""}</text>
     <text x="10" y="80">{scoredMatches?scoredMatches.race.type + " : " + scoredMatches.race.score:""}</text>
    </g>
   </svg>
   </div>
 );
};

const mapStateToProps = state => {
  return {scoredMatches:state.mapState.scoredMatches};
};


export default connect(mapStateToProps, null)(MatchesBox);
