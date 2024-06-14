module.exports = (objeactPagination, query, countProducts) => {
  // console.log(query.page);
  if(query.page && query.page >= "1" ) {
    objeactPagination.currentPage = parseInt(query.page);
  }

  objeactPagination.skip = (objeactPagination.currentPage - 1) * objeactPagination.limitItems;

  const totalPage = Math.ceil(countProducts / objeactPagination.limitItems);
  objeactPagination.totalPage = totalPage;
  
  return objeactPagination;
}