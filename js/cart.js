let localCart = localStorage.getItem('cart');
let cart = !localCart ? [] : JSON.parse(localCart);


function cartList(){
    let list = ""
    let page = document.getElementById("goods-choose")
    if(cart.length > 0){
        cart.forEach((v,index)=> {
            let total = v.quantity * v.price
            list += `<li><img src="img/${v.goods}" alt="">
              <br> product Name: ${v.Name} 
              <br> price: ${v.price} 
              <br> quantity bought: ${v.quantity} 
              <br> Total: ${total}
              <button type="button" class="delete" Onclick = "removeFromCart(${index})">REMOVE</button>`
        });
        page.innerHTML = list
    }else{
        page.innerHTML = `<li>You have no item in your cart</li>`
    }
}
cartList()
function removeFromCart(name){
    let product = cart[name]
    let productindex = cart.find(goods =>goods.Name === product.Name)    
    if(productindex !== 1){
        let a = confirm(`You are tyring to remove ${product.Name} from your cart \n Do you wish to continue?`)
        if(a == true){
            cart.splice (productindex,1)
            localStorage.setItem("cart",JSON.stringify (cart))
            cartList()
            cartTotal()
        }
    }
}
function cartTotal(){
    let total = 0;
    cart.forEach(x => {
        let cost = x.price * x.quantity
        total += cost
        document.getElementById("Total-cost").innerHTML = `Total Cost: ${total}`
    })
   
}
cartTotal() 
let btn = document.getElementById("pay")
btn.addEventListener("click",() => {
    let cartItem = cart.length
    if(cartItem > 0){
        location.href = "payment.html"
    }else{
        document.getElementById("message").style.color = "blue"
        document.getElementById("message").innerHTML = "your cart seems empty, please add an item to it"
    }
})