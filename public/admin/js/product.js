// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonChangeStatus.forEach(item => {
    item.addEventListener("click", () => {
      const statusCurrent = item.getAttribute("data-status");
      const id = item.getAttribute("data-id");

      let statusChange = statusCurrent == "active" ? "inactive" : "active";
      // console.log(statusCurrent);
      // console.log(id);
      // console.log(statusChange);

      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      console.log(action);
      formChangeStatus.action = action;

      formChangeStatus.submit();
    })
  })
}
// End Change Status

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  // console.log(inputCheckAll);
  // console.log(inputsId);

  inputCheckAll.addEventListener("click", () => {
    if(inputCheckAll.checked) {
      inputsId.forEach(item => {
        item.checked = true;
      })
    } else {
      inputsId.forEach(item => {
        item.checked = false;
      })
    }
  })

  inputsId.forEach(item => {
    item.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      if(countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    })
  })
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputtChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

    const changeType = e.target.elements.type.value;
    // console.log(changeType);
    if(changeType == "delete-all") {
      const isConfim = confirm("Bạn có chắc muốn xoá?");
      if(!isConfim) {
        return;
      }
    }
    
    if(inputtChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputtChecked.forEach(item => {
        const id = item.value;

        if(changeType == "change-position") {
          const position = item.closest("tr").querySelector("input[name=position]").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }

      })

      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    }
  })
}
// End Form Change Multi

// Delete
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");
  buttonDelete.forEach(item => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      if(id) {
        const action = `${path}/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    })
  })
}
// End Delete

// Restore
const buttonTrash = document.querySelectorAll("[button-trash");
if(buttonTrash.length > 0) {
  const formRestoreItem = document.querySelector("#form-restore-item");
  const path = formRestoreItem.getAttribute("data-path");
  buttonTrash.forEach(item => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      if(id) {
        const action = `${path}/${id}?_method=PATCH`;
        console.log(action);
        formRestoreItem.action = action;
        formRestoreItem.submit();
      }
    })
  })
}
// End Restore