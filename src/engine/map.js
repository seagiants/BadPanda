
function isDoor(x,y,xMax,yMax){
  return (x+1===xMax && (y+3==yMax || y+2===yMax));
};

function isWall(x,y,xMax,yMax){
  return (!(isDoor(x,y,xMax,yMax)) && (x===0 || x+1===xMax || y===0 || y+1===yMax) );
};



function generateCell(x, y, xMax, yMax) {
  return { x: x, y: y, showMatches: false, card: null, isWall: isWall(x,y,xMax,yMax)  };
}

/* Generate an x by y matrix, each cell being of a particular type */
export const generateMap = (x, y) => {
  let map = [];
  for (let i = 0; i < x; i++) {
    map.push([]);
    for (let j = 0; j < y; j++) {
      map[i].push(generateCell(i, j, x, y));
    }
  }
  return map;
};
