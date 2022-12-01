import React from 'react';
import './TableHeaderComponent.scss';
import headers from "./headers";

const TableHeaderComponent = () => {
  return(
    <div className="tableHeader">
      { headers.map((item, index) =>
        <p className="tableHeaderItem" key={ index } style={{ width: item.width }}>{ item.name }</p>
      ) }
    </div>
  );
};

export default TableHeaderComponent;