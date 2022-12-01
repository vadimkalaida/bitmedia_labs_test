import { IFilterState } from "../store/reducers/filter.reducer";

export interface IFilter {
  value: string,
  name: string
}

export enum FilterActionTypes {
  SET_FILTER = 'SET_FILTER',
  // SET_FILTER_TYPE = 'SET_FILTER_TYPE',
  // SET_FILTER_SEARCH = 'SET_FILTER_SEARCH',
}

interface ISetFilter {
  payload: Omit<IFilterState, 'allData'>,
  type: FilterActionTypes.SET_FILTER
}

// interface ISetFilterType {
//   payload: IFilter,
//   type: FilterActionTypes.SET_FILTER_TYPE
// }
//
// interface ISetFilterSearch {
//   payload: string,
//   type: FilterActionTypes.SET_FILTER_SEARCH
// }

// export type TFilterAction = ISetFilterType | ISetFilterSearch;
export type TFilterAction = ISetFilter;
