"use strict";
var productForm = document.querySelector("#productForm");
var inputs = productForm.getElementsByTagName("input");
var submitButton = document.querySelector('#productForm [type="submit"]');
var cancelButton = document.querySelector('[type="reset"]');
cancelButton.addEventListener("click", function (e) {
    submitButton.innerHTML = "Add";
    productForm.setAttribute("action", "/products");
});
var productList = document.querySelectorAll("#productList li");
productList.forEach(function (li) {
    li.addEventListener("click", function (e) {
        handleListClick(li);
    }, false);
});
function handleListClick(target) {
    var product = {
        name: target.getAttribute("data-name"),
        brand: target.getAttribute("data-brand"),
        pid: target.getAttribute("data-pid"),
        price: parseInt(target.getAttribute("data-price")),
        quantity: parseInt(target.getAttribute("data-quantity"))
    };
    inputs.namedItem("name").value = product.name;
    inputs.namedItem("brand").value = product.brand;
    inputs.namedItem("quantity").value = product.quantity.toString();
    inputs.namedItem("pid").value = product.pid;
    inputs.namedItem("price").value = product.price.toString();
    productForm.setAttribute("action", "/products/" + product.pid);
    submitButton.innerHTML = "Update";
}
