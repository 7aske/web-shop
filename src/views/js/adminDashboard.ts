interface Product {
	pid: string;
	name: string;
	brand: string;
	quantity?: number;
	price?: number;
	category?: string;
	img?: string;
}

interface User {
	uid: string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
}

const productForm = document.querySelector("#productForm");
const productInputs = [...productForm.getElementsByTagName("input"), ...productForm.getElementsByTagName("select")];
const productSubmit = document.querySelector('#productForm [type="submit"]');
const productCancel = document.querySelector('#productForm [type="reset"]');
const productList = document.querySelectorAll("#productList li");
productCancel.addEventListener("click", e => {
	productSubmit.innerHTML = "Add";
	productForm.setAttribute("action", "/products");
});
productList.forEach(li => {
	li.addEventListener("click", e => {
		handleProductClick(li);
	});
});
const userForm = document.querySelector("#userForm");
const userInputs = userForm.getElementsByTagName("input");
const userSubmit = document.querySelector('#userForm [type="submit"]');
const userCancel = document.querySelector('#userForm [type="reset"]');
const userList = document.querySelectorAll("#userList li");
userCancel.addEventListener("click", e => {
	userCancel.innerHTML = "Add";
	userForm.setAttribute("action", "/users");
});
userList.forEach(li => {
	li.addEventListener("click", e => {
		handleUserClick(li);
	});
});
function handleUserClick(target: Element): void {
	const user: User = {
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
function handleProductClick(target: Element): void {
	const product: Product = {
		name: target.getAttribute("data-name"),
		brand: target.getAttribute("data-brand"),
		pid: target.getAttribute("data-pid"),
		price: parseInt(target.getAttribute("data-price")),
		quantity: parseInt(target.getAttribute("data-quantity")),
		category: target.getAttribute("data-category")
	};
	productInputs.find(e => e.name == "pid").value = product.pid;
	productInputs.find(e => e.name == "brand").value = product.brand;
	productInputs.find(e => e.name == "name").value = product.name;
	productInputs.find(e => e.name == "category").value = product.category;
	productInputs.find(e => e.name == "quantity").value = product.quantity.toString();
	productInputs.find(e => e.name == "price").value = product.price.toString();
	productForm.setAttribute("action", "/products/" + product.pid);
	productSubmit.innerHTML = "Update";
}
