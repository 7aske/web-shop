interface QueryResponse {
	products: Product[];
}
const form: HTMLFormElement = document.querySelector("#queryForm");
const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll("input, select");
const productOutput = document.querySelector("#productList");
const url = new URL(location.host + "/products/query");

inputs[0].addEventListener("change", () => queryProducts());
inputs[1].addEventListener("input", () => queryProducts());
function productTemplate(p: Product): string {
	return ` <li class="list-group-item list-group-item-action d-flex justify-content-around">
    <span class="font-weight-bold">${p.brand}</span><span>${p.name}</span> <span class="text-danger">Quantity: ${
		p.quantity
	}</span>
    <span class="text-danger">Price: ${p.price}</span>
    <small>Category: ${p.category}</small>
</li>`;
}
async function queryProducts(): Promise<void> {
	const query = "c=" + inputs[0].value + "&s=" + inputs[1].value;
	url.search = query;
	const results: QueryResponse = await (await fetch("http://" + url.href)).json();
	productOutput.innerHTML = "";
	console.log(results.products);

	results.products.forEach(p => (productOutput.innerHTML += productTemplate(p)));
}
