
export const getMonsters= (monsters,x,y)=>{
  console.log(monsters);
  if (monsters && monsters.length > 0) {
    return monsters.filter((element)=>(element.position.x===x && element.position.y===y));
  }else{
    return null;
  }
};
