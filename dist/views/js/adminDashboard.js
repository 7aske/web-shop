"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var productForm = document.querySelector("#productForm");
var productInputs = __spread(productForm.getElementsByTagName("input"), productForm.getElementsByTagName("select"));
var productSubmit = document.querySelector('#productForm [type="submit"]');
var productCancel = document.querySelector('#productForm [type="reset"]');
var productList = document.querySelectorAll("#productList li");
productCancel.addEventListener("click", function (e) {
    productSubmit.innerHTML = "Add";
    productForm.setAttribute("action", "/products");
});
productList.forEach(function (li) {
    li.addEventListener("click", function (e) {
        handleProductClick(li);
    });
});
var userForm = document.querySelector("#userForm");
var userInputs = userForm.getElementsByTagName("input");
var userSubmit = document.querySelector('#userForm [type="submit"]');
var userCancel = document.querySelector('#userForm [type="reset"]');
var userList = document.querySelectorAll("#userList li");
userCancel.addEventListener("click", function (e) {
    userCancel.innerHTML = "Add";
    userForm.setAttribute("action", "/users");
});
userList.forEach(function (li) {
    li.addEventListener("click", function (e) {
        handleUserClick(li);
    });
});
function handleUserClick(target) {
    var user = {
        username: target.getAttribute("data-username"),
        lastName: target.getAttribute("data-lastName"),
        uid: target.getAttribute("data-uid"),
        firstName: target.getAttribute("data-firstName"),
        email: target.getAttribute("data-email")
    };
    userInputs.namedItem("username").value = user.username;
    userInputs.namedItem("lastName").value = user.lastName;
    userInputs.namedItem("firstName").value = user.firstName;
    userInputs.namedItem("uid").value = user.uid;
    userInputs.namedItem("email").value = user.email;
    userForm.setAttribute("action", "/users/" + user.uid);
    userSubmit.innerHTML = "Update";
}
function handleProductClick(target) {
    var product = {
        name: target.getAttribute("data-name"),
        brand: target.getAttribute("data-brand"),
        pid: target.getAttribute("data-pid"),
        price: parseInt(target.getAttribute("data-price")),
        quantity: parseInt(target.getAttribute("data-quantity")),
        category: target.getAttribute("data-category")
    };
    productInputs.find(function (e) { return e.name == "pid"; }).value = product.pid;
    productInputs.find(function (e) { return e.name == "brand"; }).value = product.brand;
    productInputs.find(function (e) { return e.name == "name"; }).value = product.name;
    productInputs.find(function (e) { return e.name == "category"; }).value = product.category;
    productInputs.find(function (e) { return e.name == "quantity"; }).value = product.quantity.toString();
    productInputs.find(function (e) { return e.name == "price"; }).value = product.price.toString();
    // productInputs.namedItem("name").value = product.name;
    // productInputs.namedItem("brand").value = product.brand;
    // productInputs.namedItem("quantity").value = product.quantity.toString();
    // productInputs.namedItem("pid").value = product.pid;
    // productInputs.namedItem("price").value = product.price.toString();
    productForm.setAttribute("action", "/products/" + product.pid);
    productSubmit.innerHTML = "Update";
}
