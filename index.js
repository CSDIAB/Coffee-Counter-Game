/*
1.Our goal is to make a coffee counter game
2. the user presses a button which gives them 1 coffee 
3. after the user gets 5 coffees, they are given the option to buy a coffee producer
4. if the user decides to buy a coffee producer, they are given 1 coffee per second
5. as the user gets to more and more coffees, they are given the option to buy even more coffee producers,
the more coffees they have the more producers will show up

//State
coffeeCount: number
coffeesPerSecond: number
producers: array of objects
includes name, currentPrice, initialPrice, quantity, 
unlockThreshold, isUnlocked,
 and coffees per second(how much this producer will improve it)
//Function to Modify State
//Render State
*/
//State - I understand this part
let coffeeCount = 0;
let coffeesPerSecond;
let producers = [
    {
        name: "Coffee Producer 1",
        currentPrice: 10,
        initialPrice: 10,
        quantity: 0,
        unlockThreshold: 10,
        isUnlocked: false,
        coffeesPerSecond: 1
    },
    {
        name: "Coffee Producer 2",
        currentPrice: 20,
        initialPrice: 20,
        quantity: 0,
        unlockThreshold: 20,
        isUnlocked: false,
        coffeesPerSecond: 2
    },
    // Add more producers as needed
]


//Function to Modify State - I understand this part
function increaseCoffeeCount() {
    coffeeCount = coffeeCount + 1;
    console.log(coffeeCount);
};

function increaseCoffeePerSecond() {
    // Set up an interval to increase coffee count based on producers' coffees per second
    setInterval(function() {
        let totalCoffeesPerSecond = 0;
        for (let i = 0; i < producers.length; i++) {
            if (producers[i].quantity > 0) {
                totalCoffeesPerSecond += producers[i].coffeesPerSecond * producers[i].quantity;
            }//I dont understand this part
        }
        coffeeCount += totalCoffeesPerSecond;
        render();
    }, 1000);
};

//increaseCoffeePerSecond();


//Render State
function render() {
    const output = document.querySelector("output");
    output.textContent = coffeeCount;
};

function renderProducers(){
    
        const producersContainer = document.querySelector("#producers-container");// Get the producers container element
        producersContainer.innerHTML = "";// Clear the producers container before rendering the producers again, otherwise it will rerender every time we press the button
        // Loop through the producers array
        for (let i = 0; i < producers.length; i++) {
            const producer = producers[i];// Get the producer at the current index, we start with this because...?
            // Check if the producer is unlocked
            if (producer.isUnlocked) {
                // Create a new div element for the producer
                const producerDiv = document.createElement("div");
                const producerBuyButton = document.createElement("button");
                producerBuyButton.addEventListener ('click', function (event) {
                    if (coffeeCount >= producers[i].currentPrice) {
                        /*we want to use this if statement to check if the user has enough coffees to buy the producer
                        if the user has enough coffees, we will update the state and render the producers again*/
                        coffeeCount = coffeeCount - producers[i].currentPrice; // update the state, it is minus because the user is buying something
                        producers[i].quantity = producers[i].quantity + 1; // update the state for the quantity of the producer
                        producers[i].currentPrice = producers[i].currentPrice + 10; // update the state for the next price
                        render(); // render the state
                        renderProducers(); // render the producers again
                        increaseCoffeePerSecond(); // update the state
                    }
                });
                producerDiv.textContent = `${producer.name}, ${producer.currentPrice}`;//review the syntax for template literals
                producerBuyButton.textContent = 'Buy producer';
                //producerDiv.classList.add("producer");// Add the producer class to the div, this class is used for styling
                //producerDiv.id = `producer-${i + 1}`; // Unique ID for each producer
                // Append the producer element to the container because it is unlocked
                // append means to add it to the end of the container, for example, if you have a list of items, you can append a new item to the end of the list
                producersContainer.appendChild(producerDiv);
                producersContainer.appendChild(producerBuyButton);
               
            }
            
            //this function will render the unlocked producers every time the user gets more coffees, if we want to display them only once we can use a different function
        }
        
     //this renderproducers function came from chatGPT and I dont understand it
}




const $form = document.querySelector("form");
$form.addEventListener("submit", function (event) {
  // Prevent page from refreshing when form is submitted
  event.preventDefault();

  // which updates state,
  increaseCoffeeCount();

  // the text in the output goes up by 1 (render)
  render();

  if (coffeeCount >= 10) {
    console.log("You have enough coffees to buy a coffee producer");
} else {
    console.log("You need more coffees to buy a coffee producer");
};

if (coffeeCount >= 10) {
    producers[0].isUnlocked = true; //unlock the producer - review the syntax/conceptual side for this
    console.log("Coffee Producer 1 is unlocked");
    renderProducers();
}
if (coffeeCount >= 20) {
    producers[1].isUnlocked = true;
    console.log("Coffee Producer 2 is unlocked");
    renderProducers();  }

});


//now we need to add a buy button for the producers
//we will add a button for each producer
//we will add a click event listener to each button
//when the button is clicked, we will check if the user has enough coffees to buy the producer
//if the user has enough coffees, we will update the state and render the producers again




