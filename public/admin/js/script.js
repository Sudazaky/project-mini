// ** Button Status **
const buttonStatus = document.querySelectorAll("[button-status]");
// console.log(buttonStatus);
if(buttonStatus.length > 0) {
  const url = new URL(window.location.href);
  // console.log(url.href);

  buttonStatus.forEach(item => {
    item.addEventListener("click", () => {
      const status = item.getAttribute("button-status");
      // console.log(status);
      status ? url.searchParams.set("status", status) : url.searchParams.delete("status");

      window.location.href = url.href;
    })
  })
}
// ** End Button Status**

// ** Search **
const formSearch = document.querySelector("#form-search");
// console.log(formSearch);
if(formSearch) {
  const url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e.target.elements.keyword.value);
    const keyword = e.target.elements.keyword.value;
  
    if(keyword) {
      url.searchParams.set("keyword", keyword);
    }
    else{
      url.searchParams.delete("keyword");
    }
    
    window.location.href = url.href;
  })
}
// ** End Search **

// ** Pagination **
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination.length > 0) {
  const url = new URL(window.location.href);
  buttonPagination.forEach(item => {
    item.addEventListener("click", () => {
      const totalPage = item.getAttribute("button-pagination");
      url.searchParams.set("page", totalPage);

      window.location.href = url.href;
    })
  })
}
// ** End Pagination**

// Show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
}
// End Show alert

// Model Trash
const trash = document.querySelector("[trash]");
if(trash) {
  trash.addEventListener("click", () => {
    const modalTrash = document.querySelector(".modal-trash");
    const modal = document.querySelector(".modal");
    modal.classList.remove("d-none");
    const closeModal = document.querySelector(".close-modal");
    closeModal.addEventListener("click", () => {
      modal.classList.add("d-none");
    });
  })
}
// End Model Trash

// Prview image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    // console.log(e);
    const file = e.target.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      const buttonClosePreview = document.querySelector(".button-close-preview");
      buttonClosePreview.classList.remove("d-none");
      buttonClosePreview.addEventListener("click", () => {
        uploadImageInput.value = "";
        uploadImagePreview.src = "";
        buttonClosePreview.classList.add("d-none");
      });
    }
  })
}
// End Prview image