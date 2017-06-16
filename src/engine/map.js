
/*
function isDoor(x,y,level){
  return (x===level.doors[0].x && y===level.doors[0].y);
};
*/

function isPath(x,y,xMax,yMax){
  return false;
};

/*
function isPath2(x,y,xMax,yMax) {
  if(y+3===yMax&&x-4>0){
      return {
        x:x-1,
        y:y
      };
  }else if(y+4===yMax&&x-5<0&&x>1){
      return{
        x:x-1,
        y:y
      };
    }else if(y+3===yMax&&x-4===0){
      return{
        x:x,
        y:y-1
      }
    }
  return false;
};

function unzipPath(path){
  for (var direction in path){

  }
};
*/
export function drawPathAndGetDoors(level,gameMap) {
//  console.log(level);
  const newPrincess = gameMap[level.princess.x][level.princess.y];
  var path = newPrincess;
  var xNext;
  var yNext;
  var xCurrent = newPrincess.x;
  var yCurrent = newPrincess.y
  while(!path.isWall){
    xCurrent=path.x;
    yCurrent=path.y;
    xNext = xCurrent + 1;
    yNext = yCurrent;
    path=gameMap[xNext][yCurrent];
    path.isPath = {x:xCurrent,y:yCurrent};
  }
  path.isWall = false;
  path.isDoor = true;
  return [path];
}

/*
function drawPath(level,gameMap){
  const princess = gameMap[level.princess.x][level.princess.y];
  const unzipPath = (path) => {
    var unZPath = [];
    for (var i = 0; i < path.length; i++) {
      for(var direction in path[i]){
        if(path[i].hasOwnProperty(direction)){
          for (var i = 0; i < path[i][direction] ; i++) {
            unZPath.push(direction);
          }
        }
      }
    }
  };
  console.log(unzipPath(level.paths[0]));
  var stepIndex = 0;
  var step;
  var path = princess;
  var xNext = 0;
  var yNext = 0;
  var breakI = 0
  do {
    var x;
    var y;
    step = level.paths[0][stepIndex];
    console.log(step);
    for (var direction in step){
      if (step.hasOwnProperty(direction)){
        x = path.x;
        y = path.y;
        for (var i = 0; i < step[direction]; i++) {
        xNext=x + 1;
        yNext=y;
        console.log("xNext: "+xNext);
        console.log("yNext: "+yNext);
        path = gameMap[xNext][yNext];
        path.isPath = {x : x, y: y};
        x=xNext;
        y=yNext;
        }
      }
    }
    stepIndex++;
    breakI++;
  } while (!path.isWall || path !== undefined || path !== null || stepIndex < level.paths[0].length || breakI<20)
};
*/

function isWall(x,y,level){
  return (x===0 || x+1===level.mapSize.x || y===0 || y+1===level.mapSize.y);
};


function isPrincess(x,y,level){
  return(x===level.princess.x && y === level.princess.y);
};

function generateCell(x, y,level) {
  const neighbours = [];
  //Adding top
  neighbours.push(x!==0?{x:x-1,y:y}:null);
  //Adding right
  neighbours.push(y+1<level.mapSize.y?{x:x,y:y+1}:null);
  //Adding bot
  neighbours.push(x+1<level.mapSize.x?{x:x+1,y:y}:null);
  //Adding left
  neighbours.push(y!==0?{x:x,y:y-1}:null);
  return { x: x, y: y, neighbours : neighbours, showMatches: false, card: null, isWall: isWall(x,y,level), isPrincess: isPrincess(x,y,level), isPath: isPath(x,y,level.mapSize.x,level.mapSize.y)  };
}

/* Generate an x by y matrix, each cell being of a particular type */
export const generateMap = (level) => {
  //console.log(monsterFactory);
  var map = [];
  for (let i = 0; i < level.mapSize.x; i++) {
    map.push([]);
    for (let j = 0; j < level.mapSize.y; j++) {
      map[i].push(generateCell(i, j, level));
    }
  }
  return map;
};
