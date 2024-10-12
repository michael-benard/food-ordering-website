document.addEventListener('DOMContentLoaded',() => {
    let menu = document.getElementById("menue")
    let iconbtn = document.getElementById("harmburger")
    let cancelbtn = document.getElementById("cancel")
    iconbtn.addEventListener("click",() => {
        menu.classList.add("menue-active")
        iconbtn.style.display = "none"
        cancelbtn.style.display = "block";
    });
    cancelbtn.addEventListener("click", () => {
        menu.classList.remove("menue-active")
        iconbtn.style.display = "block"
        cancelbtn.style.display = "none"
    })
})


let product = [
    { category : "enter-continental", image:"egusi.jpg",Name: "Egusi with fufu", price:5000},
    {category : "enter-continental", image:"oha.jpg",Name: "oha soup", price:3000},
    {category : "enter-continental", image:"fied with egg.jpg",Name: "Fried egg", price:5000},
    {category : "enter-continental", image:"yam.jpg",Name: "yam with sauce", price:5000},
    {category : "enter-continental", image:"porridge.jpg",Name: "porridge yam", price:3500},
    {category : "enter-continental", image:"rice 2.jpg",Name: "Jellof rice", price:2000},
    {category : "enter-continental", image:"rice.jpg",Name: "jellof rice", price:5000},
    {category : "enter-continental", image:"spaghetti con.jpg",Name: "Tasty spaghetti", price:5000},
    {category : "continental", image:"vegetable fried rice.jpg",Name: "vegetable fried rice", price:3000},
    {category : "continental", image:"chips and fish.jpg",Name: "Chips and fish", price:5000},
    {category : "continental", image:"burger.jpg",Name: "burger", price:3000},
    {category : "continental", image:"moussaka.jpg",Name: "moussaka", price:3000},
]
document.getElementById("search").addEventListener("mouseenter",() => {
    document.getElementById("search").style.color = "gold"
    let input =  document.getElementById("searchs")
       input.classList.add("shows")
       document.getElementById("search").addEventListener("click",() => {
        let search = input.value.trim().toUpperCase()
       let found = product.filter(x => x.Name.toUpperCase().includes(search)) 
       if(found.length > 0){
        let resp = ""
        found.forEach((x,index) => {
            resp +=`<div class="col-12 col-md-3 foods">
                            <div class = "Products">
                                <img src="img/${x.image}" alt="">
                                <div class="price">
                                    <h5>${x.Name}</h5>
                                    <h6>#${x.price}</h6>
                                <button type="button" onclick = "addToCart(${index})">Add to  cart</button>
                                </div>
                            </div>
                        </div>`})
       let path = document.querySelector("#main")
       path.innerHTML = resp
       path.style.display ="flex" 
        path.style.textAlign = "center"
       }else{
        document.getElementById("main").style.textAlign = "center"
        document.getElementById("main").innerHTML = `we dont have ${search} in our menu`
       }
       })
})
let localCart = localStorage.getItem('cart');
let cart = !localCart ? [] : JSON.parse(localCart);

loadproducts();

function loadproducts(){
    let resp = ""
    product.forEach((x,index) => {
        resp +=`<div class="col-12 col-md-3">
                       <div class = "Products">
                            <img src="img/${x.image}" alt="">
                            <div class="price">
                            <h5>${x.Name}</h5>
                            <h6>#${x.price}</h6>
                           <button type="button" onclick = "addToCart(${index})">Add to  cart</button>
                        </div>
                       </div>
                    </div>`
    let container = document.querySelector(`#${x.category} .container .row`)
    container.innerHTML = resp
    })

}
loadproducts()
cartcount()
function addToCart(cartItem){
    let menu = product[cartItem]
    let items = cart.find(goods => goods.Name == menu.Name)
    if(!items){
        cart.push({
            goods: menu.image,
            Name: menu.Name,
            price: menu.price,
            quantity: 1,
            total: menu.price
        })
        let notice = document.getElementById("Notification")
        notice.innerHTML = `${menu.Name} has been add to your cart`
        notice.classList.add("show")
       cartcount()
       setTimeout(() => {
        notice.classList.remove("show")
        },3)
    }else{
        items.quantity += 1;
        items.price = menu.price
        cart.total = items.quantity * menu.price
        // console.log(cart.total)
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
function cartcount(){
    let addedItems = cart.length
   let count =  document.getElementById("number-cart")
   count.style.color = "#ffd700"
   count.innerHTML = addedItems
   localStorage.getItem("cart",JSON.stringify(cart))
}