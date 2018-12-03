const orderCount = document.querySelector("#orderCount");
const storageData: any = localStorage.getItem("order");
const clearCartBtn = document.querySelector("#clearCart");
const productContainer = document.querySelector("#productContainer");

clearCartBtn.addEventListener("click", () => clearCart());
interface OrderStorage {
	ucookie: string;
	products: string[];
}
let order: OrderStorage;

if (storageData != null) {
	order = JSON.parse(storageData);
	if (order.ucookie != "") {
		orderCount.innerHTML = order.products.length.toString();
		displayProducts();
	}
}

function clearCart() {
	const order = JSON.parse(storageData);
	order.products = [];
	localStorage.setItem("order", JSON.stringify(order));
	orderCount.innerHTML = order.products.length;
}

function productDashboardTemplate(p: Product) {
	return `
		<div class="card col-3">
			<img class="card-img-top" src='data:image/png;base64,${p.img}' alt="Product image">
			<div class="card-body">
				<h5 class="card-title text-center">${p.name}</h5>
				<ul class="list-group list-group-flush">
					<li class="list-group-item">Brand: ${p.brand}</li>
					<li class="list-group-item">Categ: ${p.category}</li>
				</ul>
			</div>				
		</div>`;
}

async function displayProducts() {
	productContainer.innerHTML = "";
	order.products.forEach(async p => {
		const u = "http://" + new URL(location.host + "/products/query/" + p);
		const result = await (await fetch(u)).json();
		productContainer.innerHTML += productDashboardTemplate(result.product);
	});
}
