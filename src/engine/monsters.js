import {monsterFactory} from "../libraries/monsterLib.js"

function generateMonster(name){
  return monsterFactory[0].builder();
};

export function generateMonsters(nb) {
    let monsters = {
      active: [],
      stock: []
    };
    for (let i = 0; i < nb; i++) {
      monsters.stock.push(generateMonster("zombie"));
    }
    return monsters;
};
