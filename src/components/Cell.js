import React from "react";
import { connect } from "react-redux";
import { playCard, preshowMatches } from "../actions";

const w = 30;
const h = 30;

const cellColor = cell => {
  if(cell.isWall)
  {
    return "black";
  }else{
    return (cell.card ? cell.card.color : "gray");
  }
};
const Cell = ({ cell, click, cellOver, selectedCard, indexSelectedCard, matches, top, right, bot , left}) => {
  //Keep only cards of neighbours
  //console.log("Là nom d'un cul !!");
  const realNeighbours = [top, right, bot, left].filter((element)=>(element !== null && element !== undefined));
  //console.log("real");
  //console.log(realNeighbours);
  const neighboursWithCards = realNeighbours.filter((element)=> (element.card !== null && element.card !== undefined))
  //console.log("withCards");
  //console.log(neighboursWithCards);
  const neighbours = neighboursWithCards.map((element)=>(element.card));
  //console.log("cards");
  //console.log(neighbours);
  const cellText = (showMatches,matches)=>{
    if(showMatches){
      return matches?matches.total:"0";
    }else{
      return "";
    }
  };
  return (
    <svg
      width={w}
      height={h} style={{border: "2px solid black"}}
      onClick={e => {
        e.preventDefault();
        console.log(
          `clicking on a ${cell.name} tile with position [${cell.x} - ${cell.y}]`
        );
        click(cell.x, cell.y, cell.isWall, selectedCard, indexSelectedCard, matches);
      }}
      onMouseEnter={()=>{
        cellOver(cell.x,cell.y,selectedCard, neighbours);
      }}
      onMouseLeave={()=>{
        console.log("Out");
      }}
    >
      <rect width={w} height={h} style={{fill: cellColor(cell)}} />
      <text x="10" y="20">{cellText(cell.showMatches,matches)}</text>
    </svg>
  );
};

const mapStateToProps = (state, ownProps) => {
  if(state.mapState.selectedCard !== null) {
    const x = ownProps.cell.x;
    const y = ownProps.cell.y;
    const xLength = state.mapState.gameMap.length;
    const yLength = state.mapState.gameMap[0].length;
    const top = y + 1 < yLength?state.mapState.gameMap[x][y+1]:null;
    const right = x + 1 < xLength?state.mapState.gameMap[x+1][y]:null;
    const bot =  y > 0?state.mapState.gameMap[x][y-1]:null;
    const left =  x > 0?state.mapState.gameMap[x-1][y]:null;
    return {
      selectedCard: state.mapState.selectedCard,
      indexSelectedCard: state.mapState.indexSelectedCard,
      top: top,
      right: right,
      bot: bot,
      left: left,
      matches: state.mapState.matches
    };
  } else {
    return {
      showMatches: null,
      selectedCard: null,
      indexSelectedCard : null,
      matches: null
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    click: (x, y, isWall, card, index,matches) => {
      if( !isWall && card !== null && card !== undefined){
        dispatch(playCard(x,y,card,index,matches));
      }
    },
    cellOver: (x,y,card,neighbours) => {
      if(card !== null && card !== undefined){
        dispatch(preshowMatches(x,y,card,neighbours));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
