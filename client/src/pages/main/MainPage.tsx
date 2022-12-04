import React from 'react';
import LayoutComponent from "../../components/layout/LayoutComponent";
import FilterComponent from "../../components/filter/FilterComponent";
import PaginationComponent from "../../components/pagination/PaginationComponent";
import TableComponent from "../../components/table/TableComponent";
import './MainPage.scss';

const MainPage : React.FC = () => {
  return(
    <LayoutComponent>
      <main className="main">
        <div className="container mainContainer">
          <FilterComponent />
          <TableComponent />
          <PaginationComponent />
        </div>
      </main>
    </LayoutComponent>
  );
};

export default MainPage;