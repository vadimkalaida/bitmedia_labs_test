import React from 'react';
import { ISetDataAdapter } from "../../PaginationComponent";
import usePagination from "../../../../hooks/pagination.hook";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux.hooks";
import {bindActionCreators} from "redux";
import {dataActions} from "../../../../store/actions/data.action";
import {ITableData} from "../../../../types/data.types";

interface IPaginationControls {
  setDataAdapterFunc: ISetDataAdapter,
  sliceFirst: number,
  sliceSecond: number,
  DotsCondition: () => React.ReactElement | null
}

const PaginationControlsComponent: React.FC<IPaginationControls> = ({ setDataAdapterFunc, sliceFirst, sliceSecond, DotsCondition }) => {
  const { currentNumber, lengthArr } = usePagination();

  const allData : ITableData[][] | null = useAppSelector(state => state.data.allData);

  const dispatch = useAppDispatch();
  const { setData } = bindActionCreators(dataActions, dispatch);

  return(
    <>
      {lengthArr?.slice(sliceFirst, sliceSecond).map((item, index) =>
        <button onClick={() => setDataAdapterFunc(false, () => item)}
                key={ index } disabled={ item === currentNumber }
                className={`paginationButton ${ item === currentNumber ? 'active' : '' }`}>

          { item }

        </button>
      )}
      <DotsCondition />
    </>
  );
};

export default PaginationControlsComponent;