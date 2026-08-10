let cart= [];
let productQuantities= {};

function addToCart(name, price){
    let quantity = productQuantities[name] || 1;

    let product = cart.find(item => item.name == name);

    if(product){
        product.quantity += quantity;
    }
    else{
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    displayCart();

}

function changeProductQuantity(name, value){
    if(!productQuantities[name]){
        productQuantities[name] = 1;
    }

    productQuantities[name] += value;

    if(productQuantities[name] < 1){
        productQuantities[name] = 1;
    }

    document.getElementById("qty-" + name).innerHTML = productQuantities[name];
}

function displayCart(){
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML="";

    let subtotal = 0;
    let count = 0;

    cart.forEach((item, index) =>{
        subtotal += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `

        <div class="card p-3 mb-3">

        <div class="d-flex justify-content-between align-items-center">

        <div>

        <h5>
            ${item.name}
        </h5>

        <p>
            ${item.price}
        </p>

        <button class="btn btn-danger btn-sm" onclick="changeQuantity(${index},-1)">
        -
        </button>

        <span class="mx-3">
        ${item.quantity}
        </span>

        <button class="btn btn-success btn-sm" onclick="changeQuantity(${index},1)">
        +
        </button>

        </div>

        <button class="btn btn-outline-danger" onclick="removeItem(${index})">
            <i class="bi bi-trash"></i>
        </button>

        </div>

        </div>

        `;
   
    });

    let discount = subtotal * 0.1;
    let gst = (subtotal - discount) * 0.05;
    let total = subtotal - discount + gst;

    document.getElementById("cartCount").innerHTML = count;

    document.getElementById("subtotal").innerHTML = subtotal;

    document.getElementById("discount").innerHTML = discount.toFixed(0);

    document.getElementById("gst").innerHTML = gst.toFixed(0);

    document.getElementById("total").innerHTML = total.toFixed(0); 

    document.getElementById("checkoutTotal").innerHTML = total.toFixed(0);
    
}

function changeQuantity(index, value){
    cart[index].quantity += value;
    if(cart[index].quantity <= 0){
        cart[index].quantity = 1;
    }

    displayCart();

}

function removeItem(index){
cart.splice(index, 1);
displayCart();
}

displayCart();

function placeOrder(){
    if(cart.length == 0){
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("cart").classList.add("d-none");

    document.getElementById("checkout").classList.add("d-none");

    document.getElementById("successMessage").classList.remove("d-none");

    cart = [];

    displayCart();
}

function goToCheckout(){
    document.getElementById("checkout").scrollIntoView({
        behavior:"smooth"
    });
}

function continueShopping(){
    document.getElementById("successMessage").classList.add("d-none");

    document.getElementById("cart").classList.remove("d-none");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}