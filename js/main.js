window.addEventListener('load', function(){
 fetchProduct();
//  document.querySelector('.loader').classList.add('hidden');

})
let theArray =[];
//variables
let containerProduct = document.querySelector('.product-container');
let emptyCart = document.querySelector('.first-cart-content');
let AddToCartButton = document.querySelector('.button-content');
let youCart = document.querySelector('.cart-section h3');
let totalPrice = document.querySelector('.total-price');
let SummaryItems = document.querySelector('.Summary-items');
let secondSummaryItems = document.querySelector('.Summary-items-total');

//fetching data
async function fetchProduct() {
  let data = await fetch('../data.json');
   theArray = await data.json();  //global variable 
    console.log(theArray);
    console.log(theArray[0].image.desktop);
    showProduct(theArray);
}

function showProduct(products){
let Desserts = products.map((element,index)=>{
    return `
     <div class="col-sm-12 col-md-4">
        <div class="product">
         <img src="${element.image.desktop}" alt="">
          <button class="button-content" onclick="addTOCart(${index});">
          <img src="./assets/images/icon-add-to-cart.svg" alt=""> Add to Cart
          </button>
          <div class="product-all-details">
            <h6 class="product-name">${element.category}</h6>
          <p class="product-details">${element.name}</p>
          <h6 class="product-price">${element.price} SR</h6>
          </div>

        </div>
      </div>
    
    `

}).join("");

containerProduct.innerHTML = Desserts;
emptyCart.style.display = 'block';
secondSummaryItems.style.display = 'none';
SummaryItems.style.display = 'none';


}
let cart = [];
//add to cart function
function addTOCart(index){
    let product = theArray[index];
    console.log(product.name);
    let found = false; //no element from first

    cart.forEach((element,index)=>{   //store data in array
    if(element.name === product.name){  //to check element if is added and store in cart
      element.qty++; 
      element.total = element.qty * element.price;
      found=true;
    }
    });

     if(found==false){
    cart.push({
            name: product.name,
            price: product.price,
            qty: 1,
            total: product.price
        });
    }
    console.log(cart);//add to cart
    emptyCart.style.display = 'none';
    secondSummaryItems.style.display = 'block';
    SummaryItems.style.display = 'block';
    // localStorage.setItem("cart", JSON.stringify(cart));
    displayCartData();
}

function displayCartData(){  //show data in html
    // SummaryItems.innerHTML="";
    let grandTotal = 0;
    let showData = cart.map((element,index)=>{
      grandTotal = grandTotal + element.total;
      return `
        <div class="content">
                <span class="product-name-cart">${element.name}</span>
                <img src="./assets/images/icon-remove-item.svg" onclick="removeItem(${index});" class="remove" alt="">   
            </div>
              <div class="details-cart d-flex">
                  <p class="qty-cart">${element.qty}x</p>
                  <p class="product-price-cart">${element.price}sr</p>
                  <p class="product-total-cart">${element.total}sr</p>
                </div>      
      `

    }).join("");
    SummaryItems.innerHTML = showData;
    totalPrice.innerHTML = grandTotal;
    youCart.innerHTML = `Qty ` + cart.length;
    

}

function removeItem(index){
  cart.splice(index,1)
  displayCartData();
  if(cart.length == 0){
    secondSummaryItems.style.display = 'none';
     emptyCart.style.display = 'block';

  }
  console.log(cart);//remove from cart
} 





