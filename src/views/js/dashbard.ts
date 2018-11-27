const orderCount = document.querySelector("#orderCount");
if (localStorage.getItem("order") != null) {
	const order = JSON.parse(localStorage.getItem("order"));
	orderCount.innerHTML = order.products.length;
}
