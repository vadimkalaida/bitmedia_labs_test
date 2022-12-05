import React, {useEffect} from 'react';
import './PaginationComponent.scss';
import {ITransaction} from "../../types/data.types";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hooks";
import { dataActions } from "../../store/actions";
import {bindActionCreators} from "redux";
import PaginationControlsComponent from "./subcomponents/PaginationControlsComponent/PaginationControlsComponent";
import usePagination from "../../hooks/pagination.hook";
import { useFilterData } from "../../hooks/filter.hooks";
import {IFilter} from "../../types/filter.types";

export interface ISetDataAdapter {
  (getCurrentPage?: () => number) : void
}

const PaginationComponent : React.FC = () => {
  const pageSize = 14;
  useFilterData(pageSize);

  const isAllDataRequestSent = useAppSelector(state => state.data.isAllDataRequestSent);

  const { currentPage, lengthArr, shouldMakeAnotherDataRequest } = usePagination();

  const allData : ITransaction[] | null = useAppSelector(state => state.data.allData);

  const dispatch = useAppDispatch();
  const { setData, setAllData, setIsAllDataRequestSent } = bindActionCreators(dataActions, dispatch);

  const currentFilter : IFilter = useAppSelector(state => state.filter.filterType);
  const searchVal : string = useAppSelector(state => state.filter.searchValue);

  const setDataAdapter : ISetDataAdapter = (getCurrentPage) => {
    if(!allData) return;
    setData(getCurrentPage ? getCurrentPage() : currentPage, allData);
  };

  useEffect(() => {
    if(shouldMakeAnotherDataRequest && !isAllDataRequestSent) {
      setAllData(searchVal, currentFilter.value, pageSize, currentPage);
      setIsAllDataRequestSent(true);
    }
  }, [shouldMakeAnotherDataRequest, isAllDataRequestSent]);

  useEffect(() => {
    if(allData) {
      setDataAdapter();
      setIsAllDataRequestSent(false);
    }
  }, [allData]);

  const switchCurrentNumber = (isNext : boolean) => {
    if(!lengthArr) return;

    if(isNext) {
      setDataAdapter(() => currentPage < lengthArr[lengthArr.length - 1] ? currentPage + 1 : currentPage);
    } else {
      setDataAdapter(() => currentPage > lengthArr[0] ? currentPage - 1 : currentPage);
    }
  };

  return(
    lengthArr && lengthArr.length > 0 ?
    <div className="pagination">
      <button className={`paginationArrowButton ${ lengthArr[0] >= currentPage || shouldMakeAnotherDataRequest ? 'active' : '' }`} onClick={() => switchCurrentNumber(false)}>
        <svg viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.6653 0.348093C15.219 -0.116031 14.4953 -0.116031 14.049 0.348093L8 6.63851L1.95098 0.348092C1.50467 -0.116032 0.781049 -0.116032 0.334736 0.348092C-0.111578 0.812217 -0.111578 1.56471 0.334736 2.02884L8 10L15.6653 2.02884C16.1116 1.56471 16.1116 0.812218 15.6653 0.348093Z" fill={'#3A80BA'}/>
        </svg>
      </button>
      <div className={`paginationControls ${ shouldMakeAnotherDataRequest ? 'disabled' : '' }`}>
        { currentPage < 10 || lengthArr?.length < 11 ?
          <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={0} sliceSecond={10} DotsCondition={() => lengthArr?.length > 10 ? <p className="paginationDots">...</p> : null} />
           :
          <>
            <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={0} sliceSecond={3} DotsCondition={() => <p className="paginationDots">...</p>} />
            { lengthArr.length - currentPage > 4 ?
              <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={currentPage - 2} sliceSecond={currentPage + 1} DotsCondition={() => <p className="paginationDots">...</p>} />
              :
              <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={lengthArr?.length - 6} sliceSecond={lengthArr?.length - 3} DotsCondition={() => null} />
            }
            <PaginationControlsComponent setDataAdapterFunc={ setDataAdapter } sliceFirst={lengthArr?.length - 3} sliceSecond={lengthArr?.length} DotsCondition={() => null} />
          </>
        }
      </div>
      <button className={`paginationArrowButton ${ lengthArr[lengthArr.length - 1] <= currentPage || shouldMakeAnotherDataRequest ? 'active' : '' }`} onClick={() => switchCurrentNumber(true)}>
        <svg viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.6653 0.348093C15.219 -0.116031 14.4953 -0.116031 14.049 0.348093L8 6.63851L1.95098 0.348092C1.50467 -0.116032 0.781049 -0.116032 0.334736 0.348092C-0.111578 0.812217 -0.111578 1.56471 0.334736 2.02884L8 10L15.6653 2.02884C16.1116 1.56471 16.1116 0.812218 15.6653 0.348093Z" fill={'#3A80BA'}/>
        </svg>
      </button>
    </div> : null
  );
};

export default PaginationComponent;