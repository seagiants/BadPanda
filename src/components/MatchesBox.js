import React from "react";
import { connect } from "react-redux";

const h = 40;
const w = 60;

const MatchesBox = ({matches,scoredMatches}) => {
  const renderScoredMatches = (scoredMatches)=>{
    if(scoredMatches!==null && scoredMatches !==undefined){
      return ("scored : "+scoredMatches.total+"")
    }
  };
  return (
   <svg width={3*w} height={3*h}>
   <g>
   <rect x="10" y="10" width={w} height={h}
   style={{fill: "gray"}}
   />
   <text x="20"
     y="35"
     id="scoreText" width={w} height={h}> {renderScoredMatches(scoredMatches)} </text>
     </g>
   </svg>
 );
};

const mapStateToProps = state => {
  return {matches : state.mapState.matches, scoredMatches: state.mapState.scoredMatches};
};


export default connect(mapStateToProps, null)(MatchesBox);
