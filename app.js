'use strict';
console.log('app js connected.');


const orderForm = document.getElementById('orderForm');
const orders = document.getElementById('orders');
console.log({orderForm, orders});

Coffee.drinks = [];

function Coffee(name, size, milk, dt){
  this.name = name;
  this.size = size;
  this.drinkType = dt;
  this.milk = milk;

  console.log(this);
  // add every drink that gets created into an array
  Coffee.drinks.push(this);

  updateStorage();
}

// console.log(Coffee.drinks);


function updateStorage(){
  const arrayString = JSON.stringify(Coffee.drinks);

  // console.log('IS THE ARRAY STORED' ,arrayString);

  localStorage.setItem('coffee', arrayString);

}




function getCoffeeOrders(){
  // retrieve data from local storage
  const data = localStorage.getItem('coffee');
  // convert the data (array) from a string to something that we can use in JavaScript.
  const coffeeData =  JSON.parse(data);
    for(let i = 0; i < coffeeData.length; i++){
      new Coffee(coffeeData[i].name, coffeeData[i].size, coffeeData[i].drinkType, coffeeData[i].milk);
    }
    console.log("drinks", Coffee.drinks);

  renderOrders();

  }

  // function getCoffeeOrders(){
  //   // retrieve data from local storage
  //   const data = localStorage.getItem('coffee');
  //   // convert the data (array) from a string to something that we can use in JavaScript.
  //   const coffeeData =  JSON.parse(data);
  
  //   // If this is the first time we visit the page, there will not be an array for us to use in localStorage
  //   // if(coffeeData !== null){
  //   Coffee.drinks = coffeeData;
  //   // }
  //   renderOrders();
  // }
  













function handleSubmit(event){
  event.preventDefault();
  // console.log(event.target);

  // get all the values from the form
  const drink = event.target;
  // console.log('event target',event.target);

  const name = drink.name.value;
  // console.log('drink NAME', drink.name.value);

  const size = drink.size.value;
  // console.log('drink SIZE',drink.size.value);

  const milk = drink.milk.value;
  // console.log('drink MILK',drink.milk.value);

  const dType  = drink.drinkType.value;
  // console.log('drink TYPE',drink.drinkType.value);



  new Coffee(name, size, milk, dType);


  // update the previous orders with the new order
  renderOrders();

}




function renderOrders(){
  // clear all my current uls to prevent duplicate information
  orders.textContent = '';
  // go through the array and output the details of each drink in the array
  for(let i = 0; i < Coffee.drinks.length; i++){
    const drinkLI = document.createElement('li');
    const infoP = document.createElement('p');
    infoP.textContent = `${Coffee.drinks[i].name} orderd a ${Coffee.drinks[i].size}oz ${Coffee.drinks[i].drinkType} with ${Coffee.drinks[i].milk} milk`;
    drinkLI.appendChild(infoP);
    orders.appendChild(drinkLI);
  }
}







orderForm.addEventListener('submit', handleSubmit);
getCoffeeOrders();