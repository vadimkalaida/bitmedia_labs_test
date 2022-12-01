import React from 'react';
import './TableComponent.scss';
import tableData from "./data";
import processDataPagination from "../../utils/processPaginationData.util";
import { ITableData } from "../../types/data.types";

const TableComponent : React.FC = () => {

  console.log(processDataPagination<ITableData>(tableData, 14));

  return(
    <div className="table">

    </div>
  );
};

export default TableComponent;