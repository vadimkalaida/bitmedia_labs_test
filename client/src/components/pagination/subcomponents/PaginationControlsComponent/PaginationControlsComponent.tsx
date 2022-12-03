import React from 'react';
import { ISetDataAdapter } from "../../PaginationComponent";

interface IPaginationControls {
  lengthArr: number[],
  currentNumber: number,
  setDataAdapterFunc: ISetDataAdapter
}

const PaginationControlsComponent: React.FC<IPaginationControls> = ({ lengthArr, currentNumber, setDataAdapterFunc }) => {
  return(
    <>
      {lengthArr?.slice(0, 10).map((item, index) =>
        <button onClick={() => setDataAdapterFunc(false, () => item)}
                key={ index } disabled={ item === currentNumber }
                className={`paginationButton ${ item === currentNumber ? 'active' : '' }`}>
          
          { item }

        </button>
      )}
      { lengthArr?.length > 10 ? '...' : null }
    </>
  );
};

export default PaginationControlsComponent;