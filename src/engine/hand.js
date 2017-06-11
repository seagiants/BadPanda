import random from "lodash.random";

export const generateCard = (race,color,classC) => {
  return {
    race : race,
    color : color,
    classC : classC,
    h : 30,
    w : 30,

  };
};

export const generateDeck = (catLib) => {
  let deckTemp = [];
  for (var i = 0; i < catLib.race.length; i++) {
    for (var j = 0; j <catLib.color.length; j++) {
      for (var k = 0; k < catLib.classC.length; k++) {
        deckTemp.push(generateCard(catLib.race[i],catLib.color[j],catLib.classC[k]));
      }
    }
  }
  return deckTemp;
};

const handSize = 5;

const dropAndAddCardFromHand = (playerHand, cardIndex,cardAdded) => {
  return playerHand.map( (card,index) => {
    if (index !== cardIndex) {
      return card;
    }else{
      return (cardAdded);
    }
  });
};

const dropCardFromDeck = (deck, cardIndex) => {
  let newDeck = deck.slice();
  newDeck.splice(cardIndex, 1);
  return newDeck;
};

export const dropAndDrawCardFromHand = (playerHand, deck, cardIndex) => {
  const randInt = random(deck.length - 1);
  return {
    cards: dropAndAddCardFromHand(playerHand, cardIndex, deck[randInt]),
    deck: dropCardFromDeck(deck, randInt)
  }
};

export const fillHand = (deck,playerHand) => {
  //Needed to have a real new array
  let newHand = playerHand.slice();
  let newDeck = deck.slice();
  while (handSize > newHand.length) {
    const randInt = random(deck.length - 1);
    newHand.push(deck[randInt]);
    newDeck.splice(randInt,1);

  }
  return {
    cards: newHand,
    deck: newDeck
  };
};
