const processDataPagination = <Type>(data: Type[], pageSize : number) : Type[][] | undefined => {
  let paginationArr = [];

  for(let i = 0; i < data.length; i += pageSize) {
    paginationArr.push(data.slice(i, i + pageSize));
    if(i > data.length) return;
  }

  return paginationArr;
};

export default processDataPagination;