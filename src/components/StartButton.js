import React from "react";
import { connect } from "react-redux";
import { START_GAME, sendAction, END_TURN } from "../actions";


const h = 20;
const w = 80;

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
   <rect x="0" y="0" width={w} height={h}
    style={{fill: "gray"}}
  />
   <text x="10"
      y="15"
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
        dispatch(sendAction(START_GAME));
      }else{
        dispatch(sendAction(END_TURN));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartButton);
