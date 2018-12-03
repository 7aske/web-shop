interface QueryResponse {
	products: Product[];
}
const form: HTMLFormElement = document.querySelector("#queryForm");
const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll("input, select");
const productOutput = document.querySelector("#productList");
const url = new URL(location.host + "/products/query");
const msgOut = document.querySelector("#msgOut");

inputs[0].addEventListener("change", () => queryProducts());
inputs[1].addEventListener("input", () => queryProducts());

function initOrder() {
	const ucookie = document.cookie.match(new RegExp(/(?<=user=)(.+);?/, "gi"));
	if (ucookie) {
		if (localStorage.getItem("order") == null) {
			const order: any = {
				products: [],
				ucookie: ucookie[0]
			};
			localStorage.setItem("order", JSON.stringify(order));
		}
	}
}

function messageTemplate(text: string, type: string) {
	return `
		<div class="alert alert-${type}">
			${text}
		</div>
	`;
}

function productTemplate(p: Product): string {
	return `
		<li class="list-group-item list-group-item-action d-flex justify-content-between">
			<div><img src='data:image/png;base64,${p.img}'></div>
			<div class="font-weight-bold">
				${p.brand}
				</div><div>${p.name}</div>
			<div class="text-danger">Quantity: ${p.quantity}</div>
			<div><span class="text-danger">Price: ${p.price}</div>
			<div><small>Category: ${p.category}</small></div>
			<button class="btn btn-success" data-pid="${p.pid}" onclick="addToCart(this)">Cart</button>
		</li>`;
}

function addToCart(btn: HTMLButtonElement) {
	const ucookie = document.cookie.match(new RegExp(/(?<=user=)(.+);?/, "gi"));
	msgOut.innerHTML = "";

	if (ucookie) {
		const pid = btn.getAttribute("data-pid");
		let order = JSON.parse(localStorage.getItem("order"));
		if (ucookie != order.ucookie) {
			order.products = [];
		}
		order.products.push(pid);
		order.ucookie = ucookie[0];
		localStorage.setItem("order", JSON.stringify(order));
		msgOut.innerHTML = messageTemplate("Added to cart.", "success");
	} else {
		msgOut.innerHTML = messageTemplate("You must be logged in.", "danger");
	}
}
async function queryProducts(): Promise<void> {
	const query = "c=" + inputs[0].value + "&s=" + inputs[1].value;
	url.search = query;
	let results: QueryResponse;
	try {
		results = await (await fetch("http://" + url.href)).json();
		productOutput.innerHTML = "";
		results.products.forEach(p => (productOutput.innerHTML += productTemplate(p)));
	} catch (err) {}
}
initOrder();
