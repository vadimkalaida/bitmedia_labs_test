import {ITableData, TDataAction, DataActionTypes} from "../../types/data.types";

export interface IDataState {
  currentPage: number,
  pagesNumber: number,
  currentData: ITableData[],
  allData: ITableData[][] | null
}

const initialState : IDataState = {
  currentPage: 1,
  pagesNumber: 1,
  currentData: [],
  allData: null
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
        allData: action.payload
      };
    default:
      return state;
  }
};

export default data;