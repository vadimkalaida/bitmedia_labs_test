import React, { useState, useRef } from 'react';
import './DropDownComponent.scss'
import OutsideClickHandler from 'react-outside-click-handler';
import { IFilter } from "../../types/filter.types";

interface IDropDownProps {
  width: string,
  height?: string,
  options: IFilter[],
  currentFilterType: IFilter | undefined,
  setCurrentFilterType: (item:IFilter) => void
}

const DropDownComponent : React.FC<IDropDownProps> = ({ options, width, height, currentFilterType, setCurrentFilterType }) => {
  const [ isDropDownExpanded, setIsDropDownExpanded ] = useState<boolean>(false);

  const dropdownRef = useRef(null) as React.RefObject<HTMLDivElement>;

  const changeStatusOfDropDown = (isOutSide: boolean) => {
    setIsDropDownExpanded(isOutSide ? false : prev => !prev);
  };

  const setNewCurrentItem = (item : IFilter) => {
    setCurrentFilterType(item);
    setIsDropDownExpanded(false);
  };

  return(
    <OutsideClickHandler onOutsideClick={() => changeStatusOfDropDown(true)}>
      <div className="dropdown" style={{ minWidth: width, height: height ? height : '100%' }} ref={ dropdownRef } onClick={ () => changeStatusOfDropDown(false) }>
        <p className="dropdownTitle">{ currentFilterType?.name }</p>
        <button className="dropdownButton">
          <svg viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.6653 0.348093C15.219 -0.116031 14.4953 -0.116031 14.049 0.348093L8 6.63851L1.95098 0.348092C1.50467 -0.116032 0.781049 -0.116032 0.334736 0.348092C-0.111578 0.812217 -0.111578 1.56471 0.334736 2.02884L8 10L15.6653 2.02884C16.1116 1.56471 16.1116 0.812218 15.6653 0.348093Z" fill="#3A80BA"/>
          </svg>
        </button>
      </div>
      { isDropDownExpanded ?
        <div className="dropdownExpanded" style={ dropdownRef && dropdownRef.current ? { top: `${ dropdownRef.current.clientHeight + 5 }px`, minWidth: `${ dropdownRef.current.clientWidth }px` } : {} }>
          { options.map((item, index) =>
            <p className={`dropdownExpandedItem ${ item.name === currentFilterType?.name ? 'active' : '' }`} key={ index } onClick={ () => setNewCurrentItem(item) }>{ item.name }</p>
          ) }
        </div> : null
      }
    </OutsideClickHandler>
  );
};

export default DropDownComponent;