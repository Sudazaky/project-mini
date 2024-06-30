// Delete
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0) {
  const formDeleteCategory = document.querySelector("#form-delete-category");
  const dataPath = formDeleteCategory.getAttribute("data-path");
  buttonDelete.forEach(item => {
    item.addEventListener('click', () => {

      const isConfirm = confirm("Bạn chắc chắn muốn xoá?");
      if(!isConfirm) return;

      const dataId = item.getAttribute("data-id");
      const path = dataPath + "/" + dataId + "?_method=DELETE";
      formDeleteCategory.action = path;
      formDeleteCategory.submit();
    });
  });
}
// End Delete

// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0) {
  const formStatusCategory = document.querySelector("#form-status-category");
  const dataPath = formStatusCategory.getAttribute("data-path");
  buttonChangeStatus.forEach(item => {
    item.addEventListener('click', () => {
      const dataStatus = item.getAttribute("data-status");
      const dataId = item.getAttribute("data-id");
      const path = `${dataPath}/${dataStatus}/${dataId}?_method=PATCH`;
      if(path) {
        formStatusCategory.action = path;
        formStatusCategory.submit();
      }
    });
  });
}
// End Change Status