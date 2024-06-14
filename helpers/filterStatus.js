module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "active"
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    }
  ]

  if(query.status) {
    const index = filterStatus.findIndex(item => item.status == query.status);
    // console.log(index);
    filterStatus[index].class="active";
    if(filterStatus[0].class == "active") {
      filterStatus[0].class = "";
    }
  }

  return filterStatus;
}