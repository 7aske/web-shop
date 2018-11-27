"use strict";
var orderCount = document.querySelector("#orderCount");
if (localStorage.getItem("order") != null) {
    var order = JSON.parse(localStorage.getItem("order"));
    orderCount.innerHTML = order.products.length;
}
