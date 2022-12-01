import {FilterActionTypes, IFilter, TFilterAction} from "../../types/filter.types";

export interface IFilterState {
  searchValue: string,
  filterType: IFilter
}

const initialState : IFilterState = {
  searchValue: '',
  filterType: {
    value: 'sender_address',
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