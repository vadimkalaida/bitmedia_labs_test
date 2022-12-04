import {Dispatch} from "redux";
import {DataActionTypes, ITableData, TDataAction} from "../../types/data.types";
import processDataPagination from "../../utils/processPaginationData.util";
import axios from "../../api/axios";
import { AxiosResponse } from 'axios';

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

interface IGetDataAxios {
  transactions: ITableData[]
}

interface IGetDataAxiosRequestBody {
  searchValue : string,
  filterType : string
}

const setAllData = (searchValue : string, filterType : string, pageSize : number) => {
  return (dispatch: Dispatch<TDataAction>) => {
    const reqBody : IGetDataAxiosRequestBody  = { searchValue, filterType };
    axios.post('get_data', reqBody)
      .then((res: AxiosResponse<IGetDataAxios>) => {
        if(!res || !res.data || !res.data.transactions) {
          throw new Error('Something is wrong with data');
          return;
        }

        console.log(res.data, 'res.data');

        const data : ITableData[] = res.data.transactions.map(item => {
          let myObj : ITableData | {} = {};
          for(const key in item) {
            if(key !== '__v' && key !== '_id') Object.assign(myObj, { [key]: item[key as keyof typeof item] });
          }
          return myObj as ITableData;
        });

        console.log(data);

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
      })
      .catch(err => {
        console.error(err);
      });
  }
};

export const dataActions = {
  setData,
  setAllData
};