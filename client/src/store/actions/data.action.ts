import {Dispatch} from "redux";
import {DataActionTypes, ITableData, TDataAction, ITransaction} from "../../types/data.types";
import axios from "../../api/axios";
import { AxiosResponse } from 'axios';

const setData = (currentPage: number, allData : ITransaction[] ) => {
  return (dispatch: Dispatch<TDataAction>) => {
    let currentItem: ITableData[] | undefined = [];

    for(let i = 0; i < allData.length; i++) {
      if(allData[i].pageNumber === currentPage - 1) {
        currentItem = allData[i].data;
        break;
      }
    }

    dispatch({
      payload: {
        currentPage,
        currentData: currentItem ? currentItem : []
      },
      type: DataActionTypes.SET_DATA
    });
  }
};

export interface IPaginationRange {
  startNum: number,
  endNum: number
}

interface IGetDataAxios {
  transactions: ITransaction[],
  pagesNumber: number,
  paginationRange: IPaginationRange
}

interface IGetDataAxiosRequestBody {
  searchValue : string,
  filterType : string,
  pageSize: number,
  currentPage: number
}

const setAllData = (searchValue : string, filterType : string, pageSize : number, currentPage : number, isFiltering: boolean = false) => {
  return (dispatch: Dispatch<TDataAction>) => {
    const reqBody : IGetDataAxiosRequestBody  = { searchValue, filterType, pageSize, currentPage };

    axios.post('get_data', reqBody)
      .then((res: AxiosResponse<IGetDataAxios>) => {

        if(!res || !res.data || !res.data.transactions) {
          throw new Error('Something is wrong with data');
          return;
        }

        console.log(res.data, 'res.data');

        let data : ITransaction[] = res.data.transactions.map(transaction => {
          return {
            pageNumber: transaction.pageNumber, data: transaction.data.map(item => {
              let myObj : ITableData | {} = {};
              for(const key in item) {
                if(key !== '__v' && key !== '_id' && key !== 'transaction_number') Object.assign(myObj, { [key]: item[key as keyof typeof item] });
              }
              return myObj as ITableData;
            })
          }
        });

        if(!data) {
          throw new Error('Something is wrong with the data');
          return;
        }

        dispatch({
          payload: {
            isAllDataRequestSent: false,
            allData: data,
            pagesNumber: res.data.pagesNumber ? res.data.pagesNumber : data.length,
            paginationRange: {
              startNum: res.data.paginationRange.startNum,
              endNum: res.data.paginationRange.endNum,
            },
            currentPage: isFiltering ? 1 : currentPage
          },
          type: DataActionTypes.SET_ALL_DATA
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
};

const setIsAllDataRequestSent = (isAllDataRequestSent : boolean) => {
  return (dispatch: Dispatch<TDataAction>) => {
    dispatch({
      payload: isAllDataRequestSent,
      type: DataActionTypes.SET_IS_ALL_DATA_REQUEST_SENT
    });
  }
};

export const dataActions = {
  setData,
  setAllData,
  setIsAllDataRequestSent
};