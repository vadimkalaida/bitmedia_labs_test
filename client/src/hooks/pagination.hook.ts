import { useState, useEffect } from 'react';
import {useAppSelector} from "./redux.hooks";
import convertNumberToArray from "../utils/convertNumberToArray.util";

const usePagination = () => {
  const [ lengthArr, setLengthArr ] = useState<number[] | null>(null);
  const currentNumber : number = useAppSelector(state => state.data.currentPage);
  const length : number = useAppSelector(state => state.data.pagesNumber);

  useEffect(() => {
    if(!isNaN(length)) {
      let myLength = convertNumberToArray(length, []);
      setLengthArr(myLength);
    }
  }, [length]);

  return { currentNumber, lengthArr };
};

export default usePagination;