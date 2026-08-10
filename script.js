let cart= [];

function addToCart(name, price){
    let product = cart.find(item => item.name == name);

    if(product){
        product.quantity++;
    }
    else{
        cart.push({
            name: name;
            price: price;
            quantity: 1
        });
    }

    displayCart();

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

        <button class=btn btn-success btn-sm" onclick="changeQuantity(${index},1)">
        +
        </button>

        </div>

        <button class="btn btn-outline-danger" onclick="removeItem(${index})">
        <i class="bi bi-trash"></i>
        </button>

        </div>

        </div>;
   
    });

    let discount = subtotal * 0.1;
    let gst = (subtotal - discount) * 0.05;
    let total = subtotal - discount + gst;

    document.getElementId("cartCount").innerHTML = count;

    document.getElementId("subtotal").innerHTML = subtotal;

    document.getElementId("discount").innerHTML = discount.toFixed(0);

    document.getElementId("gst").innerHTML = gst.toFixed(0);

    document.getElementId("total").innerHTML = total.toFixed(0); 
    
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