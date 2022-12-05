import {ITableData, TDataAction, DataActionTypes, ITransaction} from "../../types/data.types";
import { IPaginationRange } from "../actions";

export interface IDataState {
  currentPage: number,
  pagesNumber: number,
  currentData: ITableData[],
  allData: ITransaction[] | null,
  paginationRange: IPaginationRange,
  isAllDataRequestSent: boolean
}

const initialState : IDataState = {
  currentPage: 1,
  pagesNumber: 1,
  currentData: [],
  allData: null,
  isAllDataRequestSent: false,
  paginationRange: {
    startNum: 0,
    endNum: 9
  }
};

const data = (state : IDataState = initialState, action : TDataAction) => {
  switch (action.type) {
    case DataActionTypes.SET_DATA:
      return {
        ...state,
        ...action.payload
      };
    case DataActionTypes.SET_ALL_DATA:
      return {
        ...state,
        ...action.payload
      };
    case DataActionTypes.SET_IS_ALL_DATA_REQUEST_SENT:
      return {
        ...state,
        isAllDataRequestSent: action.payload
      };
    default:
      return state;
  }
};

export default data;