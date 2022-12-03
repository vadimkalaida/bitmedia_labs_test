import React, { useEffect } from 'react';
import './PaginationComponent.scss';
import { ITableData } from "../../types/data.types";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hooks";
import { dataActions } from "../../store/actions/data.action";
import {bindActionCreators} from "redux";
import PaginationControlsComponent from "./subcomponents/PaginationControlsComponent/PaginationControlsComponent";
import usePagination from "../../hooks/pagination.hook";
import { useFilterData } from "../../hooks/filter.hooks";

export interface ISetDataAdapter {
  (isFiltering : boolean,
  getCurrentNumber?: () => number) : void
}

const PaginationComponent : React.FC = () => {
  const pageSize = 14;
  const { currentNumber, lengthArr } = usePagination();

  const allData : ITableData[][] | null = useAppSelector(state => state.data.allData);

  const filterData = useFilterData(pageSize);

  const dispatch = useAppDispatch();
  const { setData } = bindActionCreators(dataActions, dispatch);

  const setDataAdapter : ISetDataAdapter = (isFiltering, getCurrentNumber) => {
    if(!allData) return;
    setData(isFiltering ? 1 : getCurrentNumber ? getCurrentNumber() : currentNumber, allData);
  };

  useEffect(() => {
    if(allData) setDataAdapter(true);
  }, [allData]);

  const switchCurrentNumber = (isNext : boolean) => {
    if(!lengthArr) return;

    if(isNext) {
      setDataAdapter(false, () => currentNumber < lengthArr[lengthArr.length - 1] ? currentNumber + 1 : currentNumber);
    } else {
      setDataAdapter(false, () => currentNumber > lengthArr[0] ? currentNumber - 1 : currentNumber);
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
        { currentNumber < 10 || lengthArr?.length < 11 ?
          <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={0} sliceSecond={10} DotsCondition={() => lengthArr?.length > 10 ? <p className="paginationDots">...</p> : null} />
           :
          <>
            <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={0} sliceSecond={3} DotsCondition={() => <p className="paginationDots">...</p>} />
            { lengthArr.length - currentNumber > 4 ?
              <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={currentNumber - 2} sliceSecond={currentNumber + 1} DotsCondition={() => <p className="paginationDots">...</p>} />
              :
              <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={lengthArr?.length - 6} sliceSecond={lengthArr?.length - 3} DotsCondition={() => null} />
            }
            <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={lengthArr?.length - 3} sliceSecond={lengthArr?.length} DotsCondition={() => null} />
          </>
        }
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