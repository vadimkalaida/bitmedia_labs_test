import React from 'react';
import { ISetDataAdapter } from "../../PaginationComponent";
import usePagination from "../../../../hooks/pagination.hook";

interface IPaginationControls {
  setDataAdapterFunc: ISetDataAdapter,
  sliceFirst: number,
  sliceSecond: number,
  DotsCondition: () => React.ReactElement | null
}

const PaginationControlsComponent: React.FC<IPaginationControls> = ({ setDataAdapterFunc, sliceFirst, sliceSecond, DotsCondition }) => {
  const { currentPage, lengthArr } = usePagination();

  return(
    <>
      {lengthArr?.slice(sliceFirst, sliceSecond).map((item, index) =>
        <button onClick={() => setDataAdapterFunc(() => item)}
                key={ index } disabled={ item === currentPage }
                className={`paginationButton ${ item === currentPage ? 'active' : '' }`}>

          { item }

        </button>
      )}
      <DotsCondition />
    </>
  );
};

export default PaginationControlsComponent;