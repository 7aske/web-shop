const form: HTMLFormElement = document.querySelector("#queryForm");
const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll("input, select");
const url = new URL(location.host + "/products/query");

inputs[0].addEventListener("change", () => queryProducts());
inputs[1].addEventListener("input", () => queryProducts());

async function queryProducts() {
	const query = "c=" + inputs[0].value + "&s=" + inputs[1].value;
	url.search = query;
	const response = await fetch("http://" + url.href);
	console.log(response);
}
