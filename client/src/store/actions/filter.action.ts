import {Dispatch} from "redux";
import {FilterActionTypes, TFilterAction} from "../../types/filter.types";
import { IFilter } from "../../types/filter.types";
import { IFilterState } from "../reducers/filter.reducer";

const setFilter = (filterObj : IFilterState) => {
  return(dispatch: Dispatch<TFilterAction>) => {
    dispatch({
      type: FilterActionTypes.SET_FILTER,
      payload: filterObj
    });
  };
};

// const setFilterType = (filterType : IFilter) => {
//   return(dispatch: Dispatch<TFilterAction>) => {
//     dispatch({
//       type: FilterActionTypes.SET_FILTER_TYPE,
//       payload: filterType
//     });
//   };
// };
//
// const setFilterValue = (searchVal : string) => {
//   return(dispatch: Dispatch<TFilterAction>) => {
//     dispatch({
//       type: FilterActionTypes.SET_FILTER_SEARCH,
//       payload: searchVal
//     });
//   };
// };

export const filterActions = {
  setFilter
};