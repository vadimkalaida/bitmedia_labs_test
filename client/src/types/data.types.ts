import { IDataState } from "../store/reducers/data.reducer";

export interface ITableData {
  block_number: number,
  transaction_id: string,
  sender_address: string,
  recipient_address: string,
  block_confirmations: string,
  date: string,
  value: number,
  transaction_fee: number
}

export enum DataActionTypes {
  SET_DATA = 'SET_DATA',
  SET_ALL_DATA = 'SET_ALL_DATA'
}

interface ISetData {
  payload: Omit<IDataState, 'allData'>,
  type: DataActionTypes.SET_DATA
}

interface ISetAllData {
  payload: ITableData[][],
  type: DataActionTypes.SET_ALL_DATA
}

export type TDataAction = ISetData | ISetAllData;
