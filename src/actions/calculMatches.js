
import { catLib } from "../libraries/catLib.js"

const calculMatch =  (card, neighbours, category, tempScore = 0) => {
  //console.log("neighbours:" + neighbours + " category: "+ category + " score: "+tempScore );
  var sum = 0;
  if(neighbours.length > 0){
    const cardCat = card[category];
    const isMatch = (neighbour,category)=>(cardCat === neighbours[0][category])
    for (var i = 0; i < neighbours.length; i++) {
      sum += isMatch(neighbours[i],category);
    }
    return {score:sum,category:category,type:cardCat};
  };
};


const calculTotal = (matches)=>{
  var sum = 0;
  for( var cat in matches ) {
    if( matches.hasOwnProperty( cat ) && cat !== "total" ) {
      sum += parseFloat( matches[cat].score );
    }
  }
  return sum!==null&&sum!==undefined?sum:0;
};

export const calculMatches = (card, neighbours) => {
  //console.log("neighbours");
  //console.log(neighbours);
  const realNeighbours = neighbours.filter((element)=>(element !== null && element !== undefined));
  //console.log("real");
  //console.log(realNeighbours);
  const neighboursWithCards = realNeighbours.filter((element)=> (element.card !== null && element.card !== undefined))
  //console.log("withCards");
  //console.log(neighboursWithCards);
  const neighboursCards = neighboursWithCards.map((element)=>(element.card));
  var matches = null;
  if(neighboursCards.length > 0){
    matches = {total : 0};
    for (var category in catLib) {
      if(catLib.hasOwnProperty(category)){
        const match = calculMatch(card,neighboursCards,category);
  //      console.log("match!");
//        console.log(match);
      matches[category] = match;
      }
    }
    //console.log(matches);
    matches.total = calculTotal(matches);
  }
//  console.log(matches);
  return matches;
};
