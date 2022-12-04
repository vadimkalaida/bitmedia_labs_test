import React, {useEffect, useState} from 'react';
import './FilterComponent.scss';
import DropDownComponent from "../dropdown/DropDownComponent";
import { IFilter } from "../../types/filter.types";
import { filterActions } from "../../store/actions";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hooks";
import {bindActionCreators} from "redux";
import filters from "./filters";

const FilterComponent = () => {
  const [ searchValue, setSearchValue ] = useState<string>('');
  const [ currentFilterType, setCurrentFilterType ] = useState<IFilter>();
  const dispatch = useAppDispatch();
  const filterType : IFilter = useAppSelector(state => state.filter.filterType);
  const { setFilter } = bindActionCreators(filterActions, dispatch);

  useEffect(() => {
    if(filterType) setCurrentFilterType(filterType);
  }, []);

  return(
    <div className="filterRow">
      <div className="filterForm">
        <input type="text" value={ searchValue } onChange={ (e) => setSearchValue(e.target.value) } name="Search" placeholder='Search...' className='filterInput'/>
        <DropDownComponent options={ filters } width="143px" height="48px" currentFilterType={ currentFilterType } setCurrentFilterType={(item) => setCurrentFilterType(item)} />
      </div>
      <button className="filterButton" onClick={() => {
        if(!currentFilterType) return;
        setFilter({
          filterType: currentFilterType,
          searchValue
        })
      }}>
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 6.92313C0 3.10631 3.10351 0 6.92451 0C10.7418 0 13.849 3.1026 13.849 6.92313C13.849 8.42815 13.3664 9.8228 12.5483 10.9597L15.6726 14.0833C16.1076 14.5183 16.1091 15.2281 15.6771 15.6649C15.4538 15.894 15.1591 16 14.8795 16C14.5864 16 14.2988 15.8817 14.0865 15.6695L10.962 12.5457C9.82484 13.3637 8.42986 13.8463 6.92451 13.8463C3.10698 13.8463 0 10.7402 0 6.92313ZM6.92127 2.2472C4.344 2.2472 2.24415 4.3441 2.24415 6.92313C2.24415 9.5027 4.34454 11.6023 6.92127 11.6023C9.5007 11.6023 11.5984 9.49999 11.5984 6.92313C11.5984 4.34681 9.50124 2.2472 6.92127 2.2472Z" fill="white"/>
        </svg>
      </button>
    </div>
  );
};

export default FilterComponent;