const processDataPagination = (data, pageSize, currentPage) => {
  currentPage--;
  let paginationArr = [];
  let startNum = currentPage - 4 > -1 ? currentPage - 4 : 0;
  let endNum = currentPage - 4 > -1 ? currentPage + 5 : 9;
  let iterationNumber = startNum;

  for(let i = startNum * pageSize; i < (endNum + 1) * pageSize - 1; i += pageSize) {
    if(data.slice(i, i + pageSize).length < 1) break;
    paginationArr.push({data: data.slice(i, i + pageSize), pageNumber: iterationNumber});
    iterationNumber++;
    if(i > data.length) break;
  }


  return { data: paginationArr, range: { startNum, endNum } };
};

module.exports = processDataPagination;