// Update quantity
const inputQuantity = document.querySelectorAll("input[name='quantity']");
if(inputQuantity.length > 0) {
  inputQuantity.forEach( item => {
    item.addEventListener('change', (e) => {
      const productId = item.getAttribute("product-id");
      const quantity = e.target.value;
      window.location.href = `/cart/update/${productId}/${quantity}`
    });
  })
}
// End Update quantity