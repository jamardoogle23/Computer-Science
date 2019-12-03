var arrayname=[]
var arrayprice=[]
var arrayquantity=[]
var allItems = []



if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}




function ready() {
var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeCartItemButtons.length; i++) {
var button = removeCartItemButtons[i]
button.addEventListener('click', removeCartItem)
      
}
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
var input = quantityInputs[i]
input.addEventListener('change', quantityChanged)
}

var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < addToCartButtons.length; i++) {
var button = addToCartButtons[i]
button.addEventListener('click', addToCartClicked)
}

var itemsOnPage = document.getElementsByClassName('shop-item');
for(var i = 0; i < itemsOnPage.length; i++){
let title = itemsOnPage[i].querySelector('.shop-item-title').innerHTML;
allItems.push({title: title, stock: document.getElementById(title+"-stock").innerHTML});
	}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


/* not used*/ 
function purchaseClicked() {
alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}



function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}



function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
                        
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}



function addItemToCart(title, price, imageSrc) {
	
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')


    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRowContents = `
     <div class="remove-list-button">  
 <div class="cart-item cart-column">
           
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span><hr/>
        </div>
        <span class="cart-price cart-column">${price}</span> 
</div>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" onchange="changeStock(\'`+title+`\', this)" type="number" value="1">
             <button class="btn btn-danger" type="button">REMOVE</button> 
        </div>`
	let element_stock = document.getElementById(title+"-stock");
	element_stock.innerHTML = element_stock.innerHTML - 1;
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    
} 

function changeStock(title, e) {
	//FIND THE PARTICULAR ITEM BASED ON THE TITLE WE GOT
	//CHANGE THE INNER HTML OF THE STOCK 
	let element_stock = document.getElementById(title+"-stock");
	let howmany = e.value;
	for(var i = 0; i < allItems.length; i++){
		if(allItems[i].title == title){
			if(parseInt(howmany) > parseInt(allItems[i].stock)) e.value = howmany - 1;
			else element_stock.innerHTML = allItems[i].stock - howmany;
			break;
		}
	}
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementById("carttotal").innerText = total
}







function changeText() {

var newBalance= document.getElementById("input-balance").value;
var oldBalance= document.getElementById("balance").innerHTML;
var totalbalance= +newBalance + +oldBalance;
  
  document.getElementById("balance").innerHTML = totalbalance;
  document.getElementById("input-balance").value = "";
}









function purchase() {
    
var total = document.getElementById("carttotal").innerHTML;
var balance = document.getElementById("balance").innerHTML;
var result = balance - total;

if (+balance>= +total ){document.getElementById("balance").innerHTML = result;
                        document.getElementById("carttotal").innerHTML = "0";






var itemNamesForReceipt = document.getElementsByClassName('cart-item-title')
var receiptListItems = document.getElementsByClassName("remove-list-button").item(0)
var cartItemContainer = document.getElementsByClassName("cart-items").item(0)
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    
    for (var i = 0; i < cartRows.length; i++) {
        
var cartRow = cartRows[i]
var priceElement = cartRow.getElementsByClassName('cart-price')[0]
var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
var nameElement = cartRow.getElementsByClassName('cart-item-title')[0]
var price = parseFloat(priceElement.innerText.replace('$', ''))
      
var quantity = quantityElement.value   
var finalItemPrice = price * quantity
var name = nameElement.innerHTML
        
var item1 = cartItemContainer.innerHTML 
        
        
arrayname.push(name) +
arrayprice.push(finalItemPrice) 
arrayquantity.push(quantity) 
  

    }    
var namelist=arrayname
var pricelist= arrayprice
var quantitylist=arrayquantity  
    
   /* document.getElementById("items-for-receipt").innerHTML */ 


var s="<ul>";
for (var i = 0; i < arrayname.length; i++) {
    s+="<li>"+quantitylist[i] + " of  :"+arrayname[i]+"| "+ "<b>Total Item Cost:</b>  $" + pricelist[i] +"</li>";
}
s+="</ul>";

 
    document.getElementById("reciept").innerHTML = 
"<h1> RECEIPT </h1>" + 
"<br/><h3>Items: </h3>" + s +
"<br/><br/><br/>Initial Wallet Balance: $" + balance +
"<br/>Cart Total: $" + total +
"<br/> Tax: $0" +
"<br/> Total After Tax: $" + total+
"<br/>-------------------------" +
"<br/><b> Balance left in your wallet:</b> $" + result +
"<br/> Cart Total after purchase: $0";



document.getElementById("thankyou").src="thanks.png";
document.getElementById("return-to-store").innerHTML = "Click Here To Shop Again";



alert("Transaction Successful!\nClick ok to get your receipt.");

var cartItems = document.getElementsByClassName('cart-items')[0]
while (cartItems.hasChildNodes()) {cartItems.removeChild(cartItems.firstChild)}

var clearcart = document.getElementById("storecart");
clearcart.parentNode.removeChild(clearcart);

var clearpage = document.getElementById("contents");
clearpage.parentNode.removeChild(clearpage);




}

 
else { var addedbalance = prompt("INSUFFICIENT FUNDS! \n Add cash to wallet:");
        var walletbalance2= document.getElementById("balance").innerHTML;
      var insuffcientfunds = +addedbalance + +walletbalance2;
      document.getElementById("balance").innerHTML = insuffcientfunds;}
 }
 