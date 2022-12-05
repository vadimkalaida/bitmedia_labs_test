import { IDataState } from "../store/reducers/data.reducer";

interface ISetAllDataPayload extends Pick<IDataState, 'pagesNumber' | 'paginationRange' | 'currentPage' | 'isAllDataRequestSent'>{
  allData: ITransaction[],
}

export interface ITableData {
  block_number: number,
  transaction_id: string,
  sender_address: string,
  recipient_address: string,
  block_confirmations: number,
  date: Date,
  value: number,
  transaction_fee: number
}

export interface ITransaction {
  data : ITableData[],
  pageNumber: number
}

export enum DataActionTypes {
  SET_DATA = 'SET_DATA',
  SET_ALL_DATA = 'SET_ALL_DATA',
  SET_IS_ALL_DATA_REQUEST_SENT = 'SET_IS_ALL_DATA_REQUEST_SENT'
}

interface ISetData {
  payload: Omit<IDataState, 'allData' | 'pagesNumber' | 'paginationRange' | 'isAllDataRequestSent'>,
  type: DataActionTypes.SET_DATA
}

interface ISetAllData {
  payload: ISetAllDataPayload,
  type: DataActionTypes.SET_ALL_DATA
}

interface ISetIsAllDataRequestSent {
  payload: boolean,
  type: DataActionTypes.SET_IS_ALL_DATA_REQUEST_SENT
}

export type TDataAction = ISetData | ISetAllData | ISetIsAllDataRequestSent;
