import {FilterActionTypes, IFilter, TFilterAction} from "../../types/filter.types";
import filters from "../../components/filter/filters";

export interface IFilterState {
  searchValue: string,
  filterType: IFilter
}

const initialState : IFilterState = {
  searchValue: '',
  filterType: filters && filters.length > 0 ? filters[0] : {
    value: 'from',
    name: 'Sender Address'
  }
};

const filter = (state : IFilterState = initialState, action : TFilterAction) => {
  switch (action.type) {
    case FilterActionTypes.SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default filter;