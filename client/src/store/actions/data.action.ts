import {Dispatch} from "redux";
import {DataActionTypes, ITableData, TDataAction} from "../../types/data.types";
import tableData from "../../components/table/data";
import processDataPagination from "../../utils/processPaginationData.util";
import filterData from "../../utils/filter.util";

const setData = (currentPage: number, allData : ITableData[][] ) => {
  return (dispatch: Dispatch<TDataAction>) => {
    dispatch({
      payload: {
        currentPage,
        pagesNumber: !allData || allData.length < 1 ? 1 : allData.length,
        currentData: !allData || allData.length < 1 ? [] : allData[currentPage - 1]
      },
      type: DataActionTypes.SET_DATA
    });
  }
};

const setAllData = (searchValue : string, filterType : string, pageSize : number) => {
  return (dispatch: Dispatch<TDataAction>) => {
    if(!tableData) {
      throw new Error('Something is wrong with data');
      return;
    }

    const data : ITableData[] = filterData(tableData, searchValue, filterType as keyof ITableData);

    if(!data) {
      throw new Error('Something is wrong with filtering data');
      return;
    }

    let processedData = processDataPagination<ITableData>(data, pageSize);

    console.log(processedData,'processed');

    if(!processedData) {
      throw new Error('Something is wrong with the processed data');
      return;
    }

    dispatch({
      payload: processedData,
      type: DataActionTypes.SET_ALL_DATA
    });
  }
};

export const dataActions = {
  setData,
  setAllData
};