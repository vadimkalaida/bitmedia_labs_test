import React, { useEffect } from 'react';
import './TableComponent.scss';
import TableHeaderComponent from "./subcomponents/table-header/TableHeaderComponent";
import TableContentComponent from "./subcomponents/table-content/TableContentComponent";
import axios from '../../api/axios';

const TableComponent : React.FC = () => {

  useEffect(() => {
    axios.post('get_data')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return(
    <div className="table">
      <TableHeaderComponent />
      <TableContentComponent />
    </div>
  );
};

export default TableComponent;