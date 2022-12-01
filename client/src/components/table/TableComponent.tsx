import React from 'react';
import './TableComponent.scss';
import TableHeaderComponent from "./subcomponents/table-header/TableHeaderComponent";
import TableContentComponent from "./subcomponents/table-content/TableContentComponent";

const TableComponent : React.FC = () => {

  return(
    <div className="table">
      <TableHeaderComponent />
      <TableContentComponent />
    </div>
  );
};

export default TableComponent;