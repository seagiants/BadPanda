import React from "react";
import { connect } from "react-redux";
import { startGame, endTurn } from "../actions";

const h = 40;
const w = 60;

const RenderTextButton = (isStarted) => {
  return (isStarted ? "End Turn" : "Start");
};

const StartButton = ({isStarted, click}) => {
  return (
   <svg width={3*w} height={3*h} onClick={e => {
    e.preventDefault();
    console.log(`clicking on a ${RenderTextButton(isStarted)}`);
    click(isStarted);}} >
    <g>

   <rect x="10" y="10" width={w} height={h}
    style={{fill: "gray"}}
  />
   <text x="20"
      y="35"
      id="startButtonText" width={w} height={h}> {RenderTextButton(isStarted)} </text>
      </g>
</svg>
 );
};

const mapStateToProps = state => {
  return {isStarted : state.playersState.isStarted};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    click: (isStarted) => {
      if(!(isStarted)){
        dispatch(startGame());
      }else{
        dispatch(endTurn());
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartButton);
