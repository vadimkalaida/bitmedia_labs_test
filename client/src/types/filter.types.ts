import { IFilterState } from "../store/reducers/filter.reducer";

export interface IFilter {
  value: string,
  name: string
}

export enum FilterActionTypes {
  SET_FILTER = 'SET_FILTER',
}

interface ISetFilter {
  payload: Omit<IFilterState, 'allData'>,
  type: FilterActionTypes.SET_FILTER
}

export type TFilterAction = ISetFilter;
