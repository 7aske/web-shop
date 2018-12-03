"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var form = document.querySelector("#queryForm");
var inputs = form.querySelectorAll("input, select");
var productOutput = document.querySelector("#productList");
var url = new URL(location.host + "/products/query");
var msgOut = document.querySelector("#msgOut");
inputs[0].addEventListener("change", function () { return queryProducts(); });
inputs[1].addEventListener("input", function () { return queryProducts(); });
function initOrder() {
    var ucookie = document.cookie.match(new RegExp(/(?<=user=)(.+);?/, "gi"));
    if (localStorage.getItem("order") == null) {
        var order_1 = {
            products: [],
            ucookie: ucookie[0]
        };
        localStorage.setItem("order", JSON.stringify(order_1));
    }
}
function messageTemplate(text, type) {
    return "\n\t\t<div class=\"alert alert-" + type + "\">\n\t\t\t" + text + "\n\t\t</div>\n\t";
}
function productTemplate(p) {
    return "\n\t\t<li class=\"list-group-item list-group-item-action d-flex justify-content-between\">\n\t\t\t<div><img src='data:image/png;base64," + p.img + "'></div>\n\t\t\t<div class=\"font-weight-bold\">\n\t\t\t\t" + p.brand + "\n\t\t\t\t</div><div>" + p.name + "</div>\n\t\t\t<div class=\"text-danger\">Quantity: " + p.quantity + "</div>\n\t\t\t<div><span class=\"text-danger\">Price: " + p.price + "</div>\n\t\t\t<div><small>Category: " + p.category + "</small></div>\n\t\t\t<button class=\"btn btn-success\" data-pid=\"" + p.pid + "\" onclick=\"addToCart(this)\">Cart</button>\n\t\t</li>";
}
function addToCart(btn) {
    var ucookie = document.cookie.match(new RegExp(/(?<=user=)(.+);?/, "gi"));
    msgOut.innerHTML = "";
    if (ucookie) {
        var pid = btn.getAttribute("data-pid");
        var order_2 = JSON.parse(localStorage.getItem("order"));
        order_2.products.push(pid);
        order_2.ucookie = ucookie[0];
        localStorage.setItem("order", JSON.stringify(order_2));
        msgOut.innerHTML = messageTemplate("Added to cart.", "success");
    }
    else {
        msgOut.innerHTML = messageTemplate("You must be logged in.", "danger");
    }
}
function queryProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var query, results, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "c=" + inputs[0].value + "&s=" + inputs[1].value;
                    url.search = query;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://" + url.href)];
                case 2: return [4 /*yield*/, (_a.sent()).json()];
                case 3:
                    results = _a.sent();
                    productOutput.innerHTML = "";
                    results.products.forEach(function (p) { return (productOutput.innerHTML += productTemplate(p)); });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
initOrder();
