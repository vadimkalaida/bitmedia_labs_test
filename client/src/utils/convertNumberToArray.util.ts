const convertNumberToArray = (num : number, arr : number[] = []) : number[] => {
  if(num < 1) return arr.reverse();

  let myArr = [...arr];
  myArr.push(num);
  let myNum = num - 1;

  return convertNumberToArray(myNum, myArr);
};

export default convertNumberToArray;