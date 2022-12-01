const cutWord = (word: string, maxSize : number) : string => {
  if(maxSize >= word.toString().length) {
    return word;
  } else {
    return word.toString().split('').slice(0, maxSize - 1).join('') + '...';
  }
};

export default cutWord;