import * as actions from "../actions";
import { generateMap, generateMonsters, drawPathAndGetDoors } from "../engine";
import { level1 } from "../levels/level1.js"

export function generateInitialState(level) {
  var map = generateMap(level);
  //console.log(map);
  var doors = drawPathAndGetDoors(level,map);
  //console.log(doors);
  var monsters = generateMonsters(2);
  return {
    gameMap: map,
    selectedPower: actions.noAction,
    doors: doors,
    monsters: monsters
  };
};

const initialState = generateInitialState(level1);

const cardOnCell = (gameMap, x, y, card) => {
  return gameMap.map( (row,index) => {
    if(index !== x) {
      return row;
    }else{
      return row.map( (cell,index) => {
          if(index !== y) {
            return cell;
          }else{
            return {
              ...cell, card : card, showMatches : false
            }
          }
        });
      }
    });
  };
/*
  const updateMonstersOnCell = (gameMap,monsters) => {
    return gameMap.map( (row,y) => {
      return row.map((cell,x) => {
        var monstersOnCell = monsters.filter((element)=>(element.position&&(element.position===cell)));
        if (monstersOnCell.length>0){
          return {
            ...cell, monsters: monstersOnCell
          }
        }else{
          return cell;
        }
      });
    });
  };
*/

const moveMonster = (monster,gameMap) => {
  var monsterPosition = {x:monster.next.x,y:monster.next.y};
  var nextPosition = monster.next;
//  console.log(monsterPosition);
  var cellPosition = gameMap[monsterPosition.x][monsterPosition.y];
//  console.log(cellPosition);
  if(cellPosition.isPath){
    nextPosition = {x:cellPosition.isPath.x,y:cellPosition.isPath.y};
  }
  return {...monster, position : monsterPosition, next : nextPosition };
};

const enterMonster = (monster,door) => {
  const doorPosition = {x:door.x, y:door.y};
  return{...monster, next: doorPosition};
};

const moveMonsters = (monsters,door,gameMap) => {
  var activeMonsters = monsters.active.map(monster=>moveMonster(monster,gameMap));
  var stockMonsters = monsters.stock;
  if(monsters.stock.length > 0){
    activeMonsters.push(enterMonster(monsters.stock[0],door));
    stockMonsters = stockMonsters.slice(1);
  }
  return {
    ...monsters, active: activeMonsters, stock: stockMonsters
  };
};

const attackMonsters = (monsters, matches,index=0) => {
//  console.log(monsters);
//  console.log(matches);

  if(monsters.active.length >index&&matches){
    var attackedMonster = monsters.active[index];
    if(!(attackedMonster.hp > matches.total)){
      return {...monsters, active:monsters.active.slice(1)};
    }
  }
  return monsters;
};

const matchesOnCell = (gameMap, x, y) => {
  return gameMap.map( (row) => {
    return row.map( (cell)=> {
      if (cell.x === x && cell.y === y) {
          return {
            ...cell, showMatches : true
          };
        }else{
          if (cell.showMatches === false) {
            return cell;
          }else{
            return {
              ...cell, showMatches : false
            };
          }
        }
      });
    });
  };

export const mapState = (state = initialState, action) => {
  switch (action.type) {
    case actions.GENERATE_MAP:
      return { ...state, gameMap: generateMap(action.payload.x, action.payload.y) };
    case actions.START_GAME:
      return { ...state, monsters: moveMonsters(state.monsters,state.doors[0],state.gameMap) };
    case actions.CARD_SELECTION:
      let newSelectedCard = action.payload.card;
      return { ...state, selectedCard: newSelectedCard, indexSelectedCard : action.payload.index };
    case actions.PLAY_CARD:
      return { ...state, gameMap : cardOnCell(state.gameMap, action.payload.x, action.payload.y, action.payload.card ), selectedCard: null, indexSelectedCard: null, scoredMatches: action.payload.matches, monsters: moveMonsters(state.monsters,state.doors[0],state.gameMap)}
    case actions.PRE_SHOW_MATCHES:
      return { ...state, gameMap : matchesOnCell(state.gameMap, action.payload.x, action.payload.y), matches : action.payload.matches }
    case actions.END_TURN:
      return { ...state, monsters: moveMonsters(state.monsters,state.doors[0],state.gameMap) };
   case actions.ATTACK:
      return { ...state, monsters : attackMonsters(state.monsters,state.scoredMatches) };

    default:
      return state;
  }
};
