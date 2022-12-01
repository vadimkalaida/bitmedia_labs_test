import { ITableData } from "../types/data.types";

const filterData = (data : ITableData[], searchValue : string, filterType : keyof ITableData) : ITableData[] => {
  return data.filter((itemObj)  => {
    return itemObj[filterType] && itemObj[filterType].toString().startsWith(searchValue);
  });
};

export default filterData;