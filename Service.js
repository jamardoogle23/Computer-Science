/**
Debug and watch what's going on in the background by opening the JS Developer Console in Google Chrome
You will notice all the items being logged to the console and what code line it comes from
I would like to add:
1. adding 5 donuts each every 1 minute
2. not allowing the user to by more donuts that are in stock
3.
**/

updateInventory();
document.getElementById("cartDiv").style.display = "none";
document.getElementById("description").style.display = "none";

var bank = document.getElementById('bankAmount');
var AmountInBank = parseFloat(bank.innerHTML)
//var totalBank = document.getElementById('bankAmount');
var purchaseTotal = parseFloat(totalAmount.innerHTML)
/**
The variables are used inside the showDonut function
**/
var chosenDonutPic = document.getElementById('donutIMG');
var chosenDonutName= document.getElementById('donutName');
var chosenDonutInfo = document.getElementById('donutInfo');
var chosenDonutPrice = document.getElementById('donutPrice');
var chosenDonutStock = document.getElementById('donutinStock');
var imgURL, price, donutname, desc, amountBeforePurch;

var cartTable =  document.getElementById("cart");
var shoppingCartCode ;
var DonutsInCart=[];


console.log( "Starting Bank Amount: " + AmountInBank);
console.log( "Starting Order Total : " + purchaseTotal);

function addMoney(){
  moneyToAdd = parseFloat(document.getElementById('money').value);
  if(!moneyToAdd ){
    alert('Please enter a number amount.');
  }
  else{
    newBank = parseFloat(AmountInBank) + parseFloat(moneyToAdd);
    AmountInBank = newBank;
    console.log("addMoney() function money to be added is " + moneyToAdd + " and the new bank total is " + newBank);
    newBank = parseFloat(newBank);
    bank.innerHTML = newBank.toFixed(2);
    document.getElementById('money').value="";
    //alert(newBank);
  }
}

//this function will execute the the sell
function executeSell(){
  if(!AmountInBank || (parseFloat(AmountInBank) < parseFloat(purchaseTotal)))
  {
    alert('You dont have enough money.')
  }
  else
    {
      amountBeforePurch = parseFloat(AmountInBank)
      AmountInBank = (parseFloat(AmountInBank) - parseFloat(purchaseTotal)).toFixed(2)
      console.log(AmountInBank);
      bank.innerHTML = AmountInBank;
      getReceipt();
      //console.log("your Cart:");
      //console.log(DonutsInCart);
      //console.log(DonutsInStock);
      updateInStock();
      clearCart();
      //purchaseTotal = 0;
      //totalAmount.innerHTML = (purchaseTotal).toFixed(2);

    }
}

/**
This function updates the amount of donuts in stock once a purchase is made
**/
function updateInStock(){
  DonutsInStock.forEach(function (donuts, index){
    instock = parseFloat(donuts.instock);
    donutInStockName = donuts.donut.name;
    //console.log(donutInStockName + instock);
    DonutsInCart.forEach(function(donut, index){
      quantity = parseFloat(donut.quantity);
      donut = donut.name
      if(donut == donutInStockName ){
        //console.log(donutInStockName + instock);
        console.log("remove "+quantity +" "+ donut + " donuts from the inventory" );
        donuts.instock = instock - quantity; //this line updates the quantity amount in stock
        console.log("New inventory for " + donut + " is " +donuts.instock);
      }
    })
  });
  console.log(DonutsInStock);
  updateInventory();

}

/**
This function updates the inventory and updates the menu on the html page dynamically everytime it's called
**/
function updateInventory(){
  document.getElementById("donutsWithHoles").innerHTML = "";
  document.getElementById("donutsWithFilling").innerHTML = "";
  //This For Each Function populates the inventory
  DonutsInStock.forEach(function (donuts, index){
    var regularDonutCount = 0;
    var filledDonutCount = 0;

    //Assigns the donut objects to appropriate variable name
    var donut = donuts.donut.name;
    var price = donuts.donut.price;
    var cat = donuts.donut.category;
    var img = donuts.donut.imgUrl;
    var desc = donuts.donut.description;
    var instock = donuts.instock;

    //Create variable to control the DOM of the html table for the sidemenus
    var donutsWithHolesTable =  document.getElementById("donutsWithHoles")
    var donutsWithFillingTable =  document.getElementById("donutsWithFilling")
    console.log(cat + " -> " + donut + " : $" + price.toFixed(2)+ " image URL: "+img);

    //populate sidemenu
    if(cat == "Regular"){
      donutsWithHoleinfoRow = donutsWithHolesTable.insertRow(regularDonutCount);
      donutsWithHoleinfoCell = donutsWithHoleinfoRow.insertCell(regularDonutCount);
      donutsWithHoleinfoCell.innerHTML = "<img class='menuIMG' src='"+img+"' name='"+ donut +"' price='"+price +"' info='"+desc+"' instock='"+instock+"'><br><p id='menuItemName'>" + donut + "<br> in stock: "+ instock + "</p>";
      regularDonutCount+=1;
    }
    else if(cat == "Filled"){
      donutsWithFillinginfoRow = donutsWithFillingTable.insertRow(filledDonutCount);
      donutsWithFillinginfoCell = donutsWithFillinginfoRow.insertCell(filledDonutCount);
      donutsWithFillinginfoCell.innerHTML = "<img class='menuIMG' src='"+img+"' name='"+ donut +"' price='"+price +"' info='"+desc+"' instock=' "+instock+"'><br><p id='menuItemName'>" + donut + "<br> in stock: "+ instock + "</p>";
      filledDonutCount+=1;
    }

  });

}

/**
This function is assigned to the variable "showDonut" and it is called
every time a Donut is selected on a sidemenu via the click listener below it  from the sidemenu
**/
var showDonut = function(e){
  document.getElementById("welcome").style.display = "none";
  document.getElementById("description").style.display = "block";
  imgURL = e.getAttribute("src");
  donutname = e.getAttribute("name");
  price = parseFloat(e.getAttribute("price")).toFixed(2);
  desc = e.getAttribute("info");
  //instock = parseFloat(e.getAttribute("instock"));
  //chosenDonutStock.innerHTML = instock;
  chosenDonutPrice.innerHTML = price;
  chosenDonutName.innerHTML = donutname;
  chosenDonutInfo.innerHTML = desc;
  chosenDonutPic.src = imgURL;
};

/**
This line adds click event listener to any element with the class "menuIMG"
It's done this way because the menu's are recreated dynamically everytime a purchase occurs
in order to update the inventory amount

Everytime a class="menuIMG" item is clicked this will run
**/
document.querySelector('body').addEventListener('click', function(event) {
  if (event.target.className === 'menuIMG') {
    console.log(event.target);
    showDonut(event.target);
  }
});

/**
The function below registers everytime the user presses the buttomn to add a donut to their list
below are some global variables used by plusOne()
**/
function plusOne(){
  var plusOneDonutName, plusOneDonutPrice;
  document.getElementById("receiptDiv").style.display = "none";
  document.getElementById("cartDiv").style.display = "block";

  //if the cart has a donut in it with this name then add to the quantity
  if(containsDonut(donutname, DonutsInCart)){
    console.log("Donut already in cart? " +containsDonut(donutname, DonutsInCart));
    for (i = 0; i < DonutsInCart.length; i++) {
        if (DonutsInCart[i].name == donutname) {
          DonutsInCart[i].quantity += 1;
          purchaseTotal += parseFloat(DonutsInCart[i].price)
          //console.log(cart);
        }
    }
    console.log(DonutsInCart);
    updateCart(DonutsInCart);
  }
  else if(!containsDonut(donutname, DonutsInCart) || DonutsInCart.length == 0  ) {
    console.log("Donut already in cart? " +containsDonut(donutname, DonutsInCart));
    donutObject = {name: donutname, quantity:1, price: price};
    console.log(donutObject);
    DonutsInCart.push(donutObject);
    console.log(DonutsInCart);
    price = parseFloat(price);
    purchaseTotal += price;
    updateCart(DonutsInCart);
    //console.log(DonutsInCart[index].name + " :pushing object: " + plusOneDonutName +" index: "+ index +": tempdonut is :" + tempDonut);
  }
}

/**
This function updates the cart when an item is added plusOne() or when a sell is made executeSell
**/
function updateCart(cart){
  var  row = 0;
  shoppingCartCode = "";
  console.log(cart);
  var price;
  cart.forEach(function (donut, index){
    price = parseFloat(donut.quantity * donut.price).toFixed(2);
    shoppingCartCode += "<p id=''>"+donut.quantity+" : "+donut.name+" : $" + price+"</p>";
    //console.log(donut);
  });
  cartTable.innerHTML = shoppingCartCode;
  console.log(shoppingCartCode +"::"+ purchaseTotal);
  totalAmount.innerHTML = purchaseTotal.toFixed(2);
}

/**
This function clears the cart
**/
function clearCart(){
  DonutsInCart = [];
  shoppingCartCode = "";
  cartTable.innerHTML = "You have nothing in your Box";
  purchaseTotal = 0;
  totalAmount.innerHTML = (purchaseTotal).toFixed(2);
}
/**
This function shows the receipt
Currently very basic
**/
function getReceipt(){
  shoppingCartCode += "<br><p>Total: " + parseFloat(purchaseTotal).toFixed(2) + "<br> Cash Received: " + parseFloat(amountBeforePurch).toFixed(2) + "<br> Change Due: " + AmountInBank + "</p>";
  console.log("Your total was " + purchaseTotal + ". You gave " + amountBeforePurch + " so your change is " +AmountInBank );
  document.getElementById("cartDiv").style.display = "none";
  document.getElementById("receiptDiv").style.display = "block";
  receiptDiv.innerHTML = shoppingCartCode;
}

//Function for checking if the shopping cart has the current donut
function containsDonut(donut, cart) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == donut) {
          //console.log(cart);
          return true;
        }
    }
    return false;
}