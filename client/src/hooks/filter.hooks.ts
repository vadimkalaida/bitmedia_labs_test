import {useLayoutEffect} from 'react';
import {IFilter} from "../types/filter.types";
import {useAppDispatch, useAppSelector} from "./redux.hooks";
import {bindActionCreators} from "redux";
import {dataActions} from "../store/actions";

interface IFilterHookReturnObj {
  currentFilter: IFilter,
  searchVal: string
}

const useFilterData = (pageSize : number) : IFilterHookReturnObj => {
  const currentFilter : IFilter = useAppSelector(state => state.filter.filterType);
  const searchVal : string = useAppSelector(state => state.filter.searchValue);

  const dispatch = useAppDispatch();
  const { setAllData } = bindActionCreators(dataActions, dispatch);

  useLayoutEffect(() => {
    setAllData(searchVal, currentFilter.value, pageSize);
  }, [currentFilter, searchVal]);

  return {
    currentFilter,
    searchVal
  }
};

export {
  useFilterData
};