'use strict';


// array to hold all products
let objectProducts = [];
const itemsForChart =[];
let roundsOfVoting = 25;
let previousProducts = [];
//blank chart Object
let chartObj = null;

//function constructor for products
function Product(name, source){
  this.name = name;
  this.source = source;
  this.timesShown = 0;
  this.timesClicked = 0;
}

//generate objects from the img directory
objectProducts.push(new Product('bag','img/bag.jpg'));
objectProducts.push(new Product('banana','img/banana.jpg'));
objectProducts.push(new Product('bathroom','img/bathroom.jpg'));
objectProducts.push(new Product('boots','img/boots.jpg'));
objectProducts.push(new Product('breakfast','img/breakfast.jpg'));
objectProducts.push(new Product('bubblegum','img/bubblegum.jpg'));
objectProducts.push(new Product('chair','img/chair.jpg'));
objectProducts.push(new Product('cthulhu','img/cthulhu.jpg'));
objectProducts.push(new Product('dog-duck','img/dog-duck.jpg'));
objectProducts.push(new Product('dragon','img/dragon.jpg'));
objectProducts.push(new Product('pen','img/pen.jpg'));
objectProducts.push(new Product('pet-sweep','img/pet-sweep.jpg'));
objectProducts.push(new Product('scissors','img/scissors.jpg'));
objectProducts.push(new Product('shark','img/shark.jpg'));
objectProducts.push(new Product('sweep','img/sweep.png'));
objectProducts.push(new Product('tauntaun','img/tauntaun.jpg'));
objectProducts.push(new Product('unicorn','img/unicorn.jpg'));
objectProducts.push(new Product('water-can','img/water-can.jpg'));
objectProducts.push(new Product('wine-glass','img/wine-glass.jpg'));



//global scope needed elements for displaying images - did not work retuned nodelist
// let imageElements = document.querySelectorAll('img');

//calling each image tag by ID to be used in renderProducts()
let image1 =document.getElementById('image1');
let image2 =document.getElementById('image2');
let image3 =document.getElementById('image3');
let voteTracker = document.getElementById('vote-tracker');
voteTracker.addEventListener('click',handleProductClick);




//generate random product number for objectProducts array
function generateRandomProduct(){
  return Math.floor(Math.random() * objectProducts.length);
}
// console.log(generateRandomProduct());

function renderProducts(){
  let product1, product2, product3;
  
  //   console.log(product1, product2,product3);

  do{
    product1 = objectProducts[generateRandomProduct()];
    product2 = objectProducts[generateRandomProduct()];
    product3 = objectProducts[generateRandomProduct()]; //number placed inside bracket is number generated from generate random product function
  } while (previousProducts.includes(product1) ||
  previousProducts.includes(product2) ||
  previousProducts.includes(product3) ||
  product1 === product2 ||
  product1 === product3 ||
  product2 === product3
  );

  image1.src = product1.source;
  image1.alt = product1.name;
  product1.timesShown +=1;
  //adding the items to itemsForChart array for chart usage
  itemsForChart.push(product1);

  image2.src = product2.source;
  image2.alt = product2.name;
  product2.timesShown +=1;
  itemsForChart.push(product2);

  image3.src = product3.source;
  image3.alt = product3.name;
  product3.timesShown +=1;
  itemsForChart.push(product3);

}

renderProducts();


//function to handle event listener on clicked picture
function handleProductClick(event){

  //   let productWasClicked = event.target.id;

  objectProducts.forEach(image =>{
    if(image.name === event.target.alt){
      image.timesClicked +=1;
    }
    // console.log('updated Object Product' + objectProducts)
  });

  if(roundsOfVoting){
    renderProducts();
    roundsOfVoting--;
  }else{
    voteTracker.removeEventListener('click',handleProductClick );
    let buttonEl = document.getElementById('results-button');
    buttonEl.addEventListener('click', renderData);
    alert('You Have reached max attempts');
    chartObj = generateChart();
  }
  storeData();

}

//render data for the results-list
function renderData(event) {
  // let buttonClicked = event.target.id;
  objectProducts.forEach(product => {
    let listItemEl = document.createElement('li');
    let parentContainer = document.getElementById('results-list');
    parentContainer.appendChild(listItemEl);
    listItemEl.innerHTML = `${product.name} had ${product.timesClicked} votes, and was seen ${product.timesShown} times.`;
    product.timesClicked;
    product.timesShown;
  });
}

//get the canvas element global scoped
const canvasElement = document.getElementById('data-display');


function generateChart(){
  let productName =[];
  let timesShown = [];
  let timesClicked = [];

  // console.log(itemsForChart);
  itemsForChart.forEach(arrayProduct => {
    productName.push(arrayProduct.name);
    timesShown.push(arrayProduct.timesShown);
    timesClicked.push(arrayProduct.timesClicked);
  });
  // console.log(productName);
  // console.log(timesShown);
  // console.log(timesClicked);

  let ctx = new Chart(canvasElement,{
    type: 'bar',
    data: {
      labels: productName, // how can we get the names of our goats??
      datasets: [{
        label: 'Times Shown',
        data: timesShown, // where does this data live?
        borderWidth: 1
      }, {
        label: 'Times Clicked',
        data: timesClicked, // where does this data live?
        borderWidth: 1
      }] // do we have more than 1 dataset?
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  return ctx;
}

//grab the button element and put in global context
let buttonElement = document.getElementById('update-chart');
//event listener function for updating data
buttonElement.addEventListener('click', function(){
  generateChart();
});

function storeData(){
  let data = JSON.stringify(objectProducts);
  localStorage.setItem('productData', data);
}

function readData(){
  let data = localStorage.getItem('productData');

  if (data){
    objectProducts = JSON.parse(data);
  } else {
    storeData();
  }
}

readData();


