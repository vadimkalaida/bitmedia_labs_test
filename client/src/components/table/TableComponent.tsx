import React from 'react';
import './TableComponent.scss';
import TableContentComponent from "./subcomponents/table-content/TableContentComponent";
import TableHeaderComponent from "./subcomponents/table-header/TableHeaderComponent";

const TableComponent : React.FC = () => {

  return(
    <div className="table">
      <TableHeaderComponent />
      <TableContentComponent />
    </div>
  );
};

export default TableComponent;