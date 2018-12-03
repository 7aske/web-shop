interface QueryResponse {
	products: Product[];
}
const form: HTMLFormElement = document.querySelector("#queryForm");
const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll("input, select");
const productOutput = document.querySelector("#productList");
const msgOut = document.querySelector("#msgOut");

inputs[0].addEventListener("change", () => queryProducts());
inputs[1].addEventListener("input", () => queryProducts());

async function initOrder() {
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
	let results: QueryResponse;
	try {
		results = await (await fetch("http://" + location.host + "/products/query")).json();
		productOutput.innerHTML = "";
		results.products.forEach(p => (productOutput.innerHTML += productTemplate(p)));
	} catch (err) {}
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
		<div class="card col-md-4 col-sm-12 pr-0 pl-0">
			<div class="card-img-top">
				<img src='data:image/png;base64,${p.img}'>
			</div>
			<div class="card-body">
				<ul class="list-group list-group-flush">
					<li class="list-group-item list-group-item-flush">
						<span class="font-weight-bold">
							${p.brand}
						</span>
					</li>
					<li class="list-group-item list-group-item-flush">
						${p.name}
					</li>	
					<li class="list-group-item list-group-item-flush">
						Price: ${p.price}		
					</li>		
					<li class="list-group-item list-group-item-flush">
						Quantity: ${p.quantity}		
					</li>			
					<li class="list-group-item list-group-item-flush">
						Category: ${p.category}		
					</li>			
				</ul>
			</div>
			<div class="card-footer">
				<button class="btn btn-success" data-pid="${p.pid}" onclick="addToCart(this)">Cart</button>
			</div>
		</div>`;
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
		setTimeout(() => {
			msgOut.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}
}
async function queryProducts(): Promise<void> {
	const query = "c=" + inputs[0].value + "&s=" + inputs[1].value;
	let results: QueryResponse;
	try {
		results = await (await fetch("http://" + location.host + "/products/query?" + query)).json();
		productOutput.innerHTML = "";
		results.products.forEach(p => (productOutput.innerHTML += productTemplate(p)));
	} catch (err) {}
}
initOrder();
