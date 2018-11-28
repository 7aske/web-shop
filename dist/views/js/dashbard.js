"use strict";
var orderCount = document.querySelector("#orderCount");
var storageData = localStorage.getItem("order");
var clearCartBtn = document.querySelector("#clearCart");
clearCartBtn.addEventListener("click", function () { return clearCart(); });
if (storageData != null) {
    var order = JSON.parse(storageData);
    if (order.ucookie != "") {
        orderCount.innerHTML = order.products.length;
    }
}
function clearCart() {
    var order = JSON.parse(storageData);
    console.log(order);
    order.products = [];
    localStorage.setItem("order", JSON.stringify(order));
    orderCount.innerHTML = order.products.length;
}
