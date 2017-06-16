import React from "react";
import { connect } from "react-redux";
import { PRE_SHOW_MATCHES, clickCell,sendAction } from "../actions";
import { calculMatches} from "../actions/calculMatches.js"

const w = 30;
const h = 30;
const isClickable = (cell) => !cell.isWall && !cell.isPrincess;
const isHooverable = (cell) => !cell.isWall && !cell.isPrincess;
const cellColor = (cell,monsters) => {
  if(cell.isPrincess){return "pink";}
  if(monsters.length > 0){return "black";}
  if(cell.isWall){return "gray";}
  if(cell.isPath){return "sienna";}
  return (cell.card ? cell.card.color : "white");
};


const Cell = ({ cell, click, cellOver, selectedCard, indexSelectedCard, monsters, matches, neighbours}) => {

  const cellText = (cell,matches)=>{
    if(cell.card){
      return cell.card.race.substring(0,1)+"/"+cell.card.classC.substring(0,1)
    }
    else if(cell.showMatches){
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
          click(cell, selectedCard, indexSelectedCard, matches,neighbours,monsters);
        }}
        onMouseEnter={()=>{
          cellOver(cell,selectedCard, neighbours);
        }}>
        <g>
          <rect
             width="30.000002"
             height="30.000002"
             x="0"
             y="0"
             style={{fill:cellColor(cell,monsters),strokeWidth:"0.26458332"}} />
            <text x={cell.card?"0":"10"} y="20">{cellText(cell,matches)}</text>
        </g>
      </svg>);
};



const mapStateToProps = (state, ownProps) => {
    //Getting neighbours
    const neighbours = ownProps.cell.neighbours.map(neighbour=>neighbour!==null?state.mapState.gameMap[neighbour.x][neighbour.y]:null);
    //Getting monsters on this cell
    const selectedCard = state.mapState.selectedCard;
    const monsters = state.mapState.monsters.active.filter((monster)=>(monster.position?monster.position.x===ownProps.cell.x&&monster.position.y===ownProps.cell.y:false));
    const matches = selectedCard?calculMatches(selectedCard,neighbours):null;
    return {
      selectedCard: selectedCard,
      indexSelectedCard: state.mapState.indexSelectedCard,
      neighbours: neighbours,
      //matches: state.mapState.matches,
      matches: matches,
      monsters: monsters
    };
  };

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    click: (cell, card, index,matches,neighbours,monsters) => {
//      console.log(card);
      if( isClickable(cell) && card !== null && card !== undefined){
        clickCell({x:cell.x,y:cell.y,card:card,index:index,matches:matches,neighbours:neighbours,monsters:monsters},dispatch);
      }
    },
    cellOver: (cell, card,neighbours) => {
      if(isHooverable(cell) && card !== null && card !== undefined){
        dispatch(sendAction(PRE_SHOW_MATCHES,{x:cell.x,y:cell.y,card:card,neighbours:neighbours}));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
