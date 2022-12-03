const filterData = (data, searchValue, filterType) => {
  if(!data || !filterType) return [];

  return data.filter((itemObj)  => {
    return itemObj[filterType] && itemObj[filterType].toString().startsWith(searchValue);
  });
};

module.exports = filterData;