import {Dispatch} from "redux";
import {FilterActionTypes, TFilterAction} from "../../types/filter.types";
import { IFilterState } from "../reducers/filter.reducer";

const setFilter = (filterObj : IFilterState) => {
  return(dispatch: Dispatch<TFilterAction>) => {
    dispatch({
      type: FilterActionTypes.SET_FILTER,
      payload: filterObj
    });
  };
};

export const filterActions = {
  setFilter
};