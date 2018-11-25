interface Product {
	pid: string;
	name: string;
	brand: string;
	quantity?: number;
	price?: number;
}

const productForm = document.querySelector("#productForm");
const inputs = productForm.getElementsByTagName("input");
const submitButton = document.querySelector('#productForm [type="submit"]');
const cancelButton = document.querySelector('[type="reset"]');
cancelButton.addEventListener("click", e => {
	submitButton.innerHTML = "Add";
	productForm.setAttribute("action", "/products");
});
const productList = document.querySelectorAll("#productList li");
productList.forEach(li => {
	li.addEventListener(
		"click",
		e => {
			handleListClick(li);
		},
		false
	);
});

function handleListClick(target: Element): void {
	const product: Product = {
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
