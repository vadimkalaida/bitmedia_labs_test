const processDataPagination = (data, pageSize, paginationRange, isFilter = false) => {
  let paginationArr = [];
  let iterationNumber = paginationRange.startNum;

  for(let i = isFilter ? (paginationRange.startNum * pageSize) : 0; i < isFilter ? (paginationRange.endNum + 1) * pageSize - 1 : data.length; i += pageSize) {
    if(data.slice(i, i + pageSize).length < 1) break;
    paginationArr.push({data: data.slice(i, i + pageSize), pageNumber: iterationNumber});
    iterationNumber++;
    if(i > data.length) break;
  }

  return { data: paginationArr };
};

module.exports = processDataPagination;