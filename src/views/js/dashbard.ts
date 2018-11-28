const orderCount = document.querySelector("#orderCount");
const storageData: any = localStorage.getItem("order");
const clearCartBtn = document.querySelector("#clearCart");
clearCartBtn.addEventListener("click", () => clearCart());
if (storageData != null) {
	const order = JSON.parse(storageData);
	if (order.ucookie != "") {
		orderCount.innerHTML = order.products.length;
	}
}

function clearCart() {
	const order = JSON.parse(storageData);
	console.log(order);
	order.products = [];
	localStorage.setItem("order", JSON.stringify(order));
	orderCount.innerHTML = order.products.length;
}
