
import { catLib } from "../libraries/catLib.js"

const calculMatch =  (card, neighbours, category, tempScore = 0) => {
  console.log("neighbours:" + neighbours + " category: "+ category + " score: "+tempScore );
  var sum = 0;
  if(neighbours.length > 0){
    const cardCat = card[category];
    const isMatch = (neighbour,category)=>(cardCat === neighbours[0][category])
    for (var i = 0; i < neighbours.length; i++) {
      sum += isMatch(neighbours[i],category);
    }
    return sum;
  };
};


const calculTotal = (matches)=>{
  var sum = 0;
  for( var cat in matches ) {
    if( matches.hasOwnProperty( cat ) ) {
      sum += parseFloat( matches[cat] );
    }
  }
  return sum!==null&&sum!==undefined?sum:0;
};

export const calculMatches = (card, neighbours) => {
  //console.log("neighbours");
  console.log(neighbours);
  var matches = null;
  if(neighbours.length > 0){
    matches = {total : 0};
    for (var category in catLib) {
      if(catLib.hasOwnProperty(category)){
        const match = calculMatch(card,neighbours,category);
        console.log("match!");
        console.log(match);
      matches[category] = match;
      }
    }
    //console.log(matches);
    matches.total = calculTotal(matches);
  }
  console.log(matches);
  return matches;
};
