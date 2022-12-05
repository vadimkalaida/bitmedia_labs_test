import { useState, useEffect } from 'react';
import {useAppSelector} from "./redux.hooks";
import convertNumberToArray from "../utils/convertNumberToArray.util";
import { IPaginationRange } from "../store/actions";

const usePagination = () => {
  const [ lengthArr, setLengthArr ] = useState<number[] | null>(null);
  const currentPage : number = useAppSelector(state => state.data.currentPage);
  const length : number = useAppSelector(state => state.data.pagesNumber);
  const paginationRange : IPaginationRange = useAppSelector(state => state.data.paginationRange);

  useEffect(() => {
    if(!isNaN(length)) {
      let myLength = convertNumberToArray(length, []);
      setLengthArr(myLength);
    }
  }, [length]);

  return { currentPage, lengthArr, shouldMakeAnotherDataRequest: (paginationRange.startNum >= currentPage) || paginationRange.endNum <= currentPage };
};

export default usePagination;