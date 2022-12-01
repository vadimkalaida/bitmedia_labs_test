import React, { useState, useEffect, useLayoutEffect } from 'react';
import './PaginationComponent.scss';
import tableData from "../table/data";
import processDataPagination from "../../utils/processPaginationData.util";
import { ITableData } from "../../types/data.types";
import convertNumberToArray from "../../utils/convertNumberToArray.util";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hooks";
import { dataActions } from "../../store/actions/data.action";
import {bindActionCreators} from "redux";
import {IFilter} from "../../types/filter.types";

const PaginationComponent : React.FC = () => {
  // const dataArr = useMemo(() => processDataPagination<ITableData>(tableData, 14), []);
  const [ lengthArr, setLengthArr ] = useState<number[] | null>(null);
  const pageSize = 14;
  // const [ currentNumber, setCurrentNumber ] = useState<number>(1);

  const currentNumber : number = useAppSelector(state => state.data.currentPage);
  const length : number = useAppSelector(state => state.data.pagesNumber);
  const myData : ITableData[] = useAppSelector(state => state.data.currentData);
  const allData : ITableData[][] | null = useAppSelector(state => state.data.allData);

  const currentFilter : IFilter = useAppSelector(state => state.filter.filterType);
  const searchVal : string = useAppSelector(state => state.filter.searchValue);

  const dispatch = useAppDispatch();
  const { setData, setAllData } = bindActionCreators(dataActions, dispatch);

  const setDataAdapter = (isFiltering : boolean, getCurrentNumber?: () => typeof currentNumber) => {
    if(!allData) return;
    setData(isFiltering ? 1 : getCurrentNumber ? getCurrentNumber() : currentNumber, allData);
  };

  useLayoutEffect(() => {
    setAllData(searchVal, currentFilter.value, pageSize);
  }, [currentFilter, searchVal]);

  useEffect(() => {
    if(allData) setDataAdapter(true);
  }, [allData]);

  useEffect(() => {
    if(length) {
      let myLength = convertNumberToArray(length, []);
      setLengthArr(myLength);
    }
  }, [length]);

  const switchCurrentNumber = (isNext : boolean) => {
    if(!lengthArr) return;

    if(isNext) {
      setDataAdapter(false, () => currentNumber < lengthArr[lengthArr.length - 1] ? currentNumber + 1 : currentNumber);
      // setData(currentNumber < lengthArr[lengthArr.length - 1] ? currentNumber + 1 : currentNumber, pageSize, searchVal, currentFilter);
      // setCurrentNumber(prev => prev < lengthArr[lengthArr.length - 1] ? prev + 1 : prev);
    } else {
      setDataAdapter(false, () => currentNumber > lengthArr[0] ? currentNumber - 1 : currentNumber);
      // setData(currentNumber > lengthArr[0] ? currentNumber - 1 : currentNumber, pageSize, searchVal, currentFilter);
      // setCurrentNumber(prev => prev > lengthArr[0] ? prev - 1 : prev);
    }
  };

  return(
    lengthArr && lengthArr.length > 0 ?
    <div className="pagination">
      <button className={`paginationArrowButton ${ lengthArr[0] >= currentNumber ? 'active' : '' }`} onClick={() => switchCurrentNumber(false)}>
        <svg viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.6653 0.348093C15.219 -0.116031 14.4953 -0.116031 14.049 0.348093L8 6.63851L1.95098 0.348092C1.50467 -0.116032 0.781049 -0.116032 0.334736 0.348092C-0.111578 0.812217 -0.111578 1.56471 0.334736 2.02884L8 10L15.6653 2.02884C16.1116 1.56471 16.1116 0.812218 15.6653 0.348093Z" fill={'#3A80BA'}/>
        </svg>
      </button>
      <div className="paginationControls">
        { lengthArr.map((item, index) =>
          <button onClick={() => setDataAdapter(false, () => item)} key={ index } disabled={ item === currentNumber } className={`paginationButton ${ item === currentNumber ? 'active' : '' }`}>
            { item }
          </button>
        ) }
      </div>
      <button className={`paginationArrowButton ${ lengthArr[lengthArr.length - 1] <= currentNumber ? 'active' : '' }`} onClick={() => switchCurrentNumber(true)}>
        <svg viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.6653 0.348093C15.219 -0.116031 14.4953 -0.116031 14.049 0.348093L8 6.63851L1.95098 0.348092C1.50467 -0.116032 0.781049 -0.116032 0.334736 0.348092C-0.111578 0.812217 -0.111578 1.56471 0.334736 2.02884L8 10L15.6653 2.02884C16.1116 1.56471 16.1116 0.812218 15.6653 0.348093Z" fill={'#3A80BA'}/>
        </svg>
      </button>
    </div> : null
  );
};

export default PaginationComponent;