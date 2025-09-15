// script.js
const products=[
{id:1,name:"Laptop",price:60000,category:"Electronics",img:"assets/images/laptop.png"},
{id:2,name:"Smartphone",price:20000,category:"Electronics",img:"assets/images/smartphone.png"},
{id:3,name:"Headphones",price:1500,category:"Electronics",img:"assets/images/headphones.png"},
{id:4,name:"Smartwatch",price:4000,category:"Electronics",img:"assets/images/smartwatch.png"},
{id:5,name:"Shoes",price:2000,category:"Fashion",img:"assets/images/shoes.png"},
{id:6,name:"T-shirt",price:500,category:"Fashion",img:"assets/images/t-shirt.png"},
{id:7,name:"Sunglasses",price:800,category:"Fashion",img:"assets/images/sunglasses.png"},
{id:8,name:"Backpack",price:1200,category:"Fashion",img:"assets/images/backpack.png"}
];
function displayProducts(list){const container=document.getElementById("product-list");if(!container)return;container.innerHTML="";list.forEach(p=>{container.innerHTML+=`
<div class="product"><img src="${p.img}" alt="${p.name}" width="150" loading="lazy"><h3>${p.name}</h3><p>₹${p.price}</p><button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button></div>`})}
displayProducts(products);
function filterProducts(category){if(category==="all")displayProducts(products);else displayProducts(products.filter(p=>p.category===category))}
function sortProducts(order){const sorted=[...products].sort((a,b)=>order==="asc"?a.price-b.price:b.price-a.price);displayProducts(sorted)}
function addToCart(product){let cart=JSON.parse(localStorage.getItem("cart"))||[];cart.push(product);localStorage.setItem("cart",JSON.stringify(cart));alert(product.name+" added to cart!")}
function showCart(){
	const container=document.getElementById("cart-items");
	if(!container)return;
	let cart=JSON.parse(localStorage.getItem("cart"))||[];
	let total=0;
	container.innerHTML="";
	cart.forEach((p,i)=>{
		total+=p.price;
		container.innerHTML+=`<div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;'><span>${p.name} - ₹${p.price}</span> <button class='delete-item' data-index='${i}' style='background:#ff6f61;color:#fff;border:none;padding:4px 10px;border-radius:5px;font-size:0.9rem;'>Delete</button></div>`;
	});
	document.getElementById("total").innerText="Total: ₹"+total;
	// Attach delete event listeners
	document.querySelectorAll('.delete-item').forEach(btn => {
		btn.onclick = function() {
			let idx = parseInt(btn.getAttribute('data-index'));
			let cart = JSON.parse(localStorage.getItem("cart"))||[];
			cart.splice(idx,1);
			localStorage.setItem("cart",JSON.stringify(cart));
			showCart();
		}
	});
}

document.addEventListener("DOMContentLoaded",function(){
	showCart();
	const clearBtn=document.getElementById("clear-cart");
	if(clearBtn){
		clearBtn.onclick=function(){
			localStorage.removeItem("cart");
			showCart();
		}
	}
		const confirmBtn=document.getElementById("confirm-order");
		if(confirmBtn){
			confirmBtn.onclick=function(){
				let cart=JSON.parse(localStorage.getItem("cart"))||[];
				if(cart.length===0){
					alert("Your cart is empty. Add items before confirming your order.");
				}else{
					alert("Order confirmed! Thank you for shopping with us.");
					localStorage.removeItem("cart");
					showCart();
				}
			}
		}
});
function validateForm(){const email=document.getElementById("email").value;if(!email.includes("@")){alert("Enter a valid email!");return false}alert("Form submitted successfully!");return true}