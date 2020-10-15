var foodList = {
    foodInTheFridge: [], // Array with all food in the fridge.

    addFood: function (foodName) { // add one new food item
        this.foodInTheFridge.push({
            foodName: foodName,
            isOutOf: false
        });
    },
    replaceFood: function (positionOfFood, foodName) { // change one particular food item
        this.foodInTheFridge[positionOfFood].foodName = foodName;
    },
    throwAwayFood: function (positionOfFood) { // delete one particular food item
        this.foodInTheFridge.splice(positionOfFood, 1);
    },
    toggleFoodItem: function (positionOfFood) { // mark one particular food item as 'have one' or 'haven't one'
        var foodItem = this.foodInTheFridge[positionOfFood];
        foodItem.isOutOf = !foodItem.isOutOf;
    },
    toggleAllFood: function () { // mark all the food items as 'have one' or 'haven't one'
        var quantityOfAllFoodItems = this.foodInTheFridge.length;
        var quantityOfCompletedFoodItems = 0;

        for (i = 0; i < quantityOfAllFoodItems; i++) { // get the quantity of all completed food items
            if (this.foodInTheFridge[i].isOutOf === true) {
                quantityOfCompletedFoodItems++;
            }
        } // if quantity of completed items is equal quantity of all items, we makes .isOutOf = false for all food items
        if (quantityOfCompletedFoodItems === quantityOfAllFoodItems) {
            for (i = 0; i < quantityOfAllFoodItems; i++) {
                this.foodInTheFridge[i].isOutOf = false;
            }
            // otherwise, we makes .isOutOf = true for all food items
        } else {
            for (i = 0; i < quantityOfAllFoodItems; i++) {
                this.foodInTheFridge[i].isOutOf = true;
            }
        }
    }
};

// creating a connection between html buttons and js code
var eventsHandler = {
    addFoodButton: function () {
        var addFoodText = document.getElementById("addFoodTextInput"); // get the value from input field
        foodList.addFood(addFoodText.value); // use the function with the value from the input field
        addFoodText.value = ''; // clear input field after function execution
        view.showMeFood();
    },
    replaceFoodButton: function () {
        var positionOfReplacedFood = document.getElementById("positionOfReplacedFoodInput");
        var newFoodName = document.getElementById("newFoodNameInput");
        foodList.replaceFood(positionOfReplacedFood.valueAsNumber, newFoodName.value);
        positionOfReplacedFood.value = '';
        newFoodName.value = '';
        view.showMeFood();
    },
    throwAwayFoodButton: function (positionOfOldFood) {
        foodList.throwAwayFood(positionOfOldFood);
        view.showMeFood();
    },
    toggleFoodItemButton: function () {
        var positionOfToggledFood = document.getElementById("positionOfToggledFoodInput");
        foodList.toggleFoodItem(positionOfToggledFood.valueAsNumber);
        positionOfToggledFood.value = '';
        view.showMeFood();
    },
    toggleAllFoodButton: function () {
        foodList.toggleAllFood();
        view.showMeFood();
    }
};

// creating a variable that responsible for displaying The Food list
var view = {
    showMeFood: function () {
        var foodListUl = document.querySelector("ul"); // finding particular item in html - unordered list (ul)
        foodListUl.innerHTML = ""; // clearing ul before loop execution (to avoid duplication of lines with every loop execution)
        for (var i = 0; i < foodList.foodInTheFridge.length; i++) {
            var foodListLi = document.createElement("li"); // creating a list item, put it into variable
            var foodItem = foodList.foodInTheFridge[i]; // just variable to save some space
            var foodNameWithCompletion = ''; // variable for food item's name with completion status, empty by default

            if (foodItem.isOutOf === true) { // if a food item is completed, display (x), else ( )
                foodNameWithCompletion = "(x) " + foodItem.foodName;
            } else {
                foodNameWithCompletion = "( ) " + foodItem.foodName;
            };

            foodListLi.id = i; // every li has its own id that equal value of variable i from the loop above
            foodListLi.textContent = foodNameWithCompletion; // putting text value of food item into li
            foodListLi.appendChild(this.createThrowAwayButton()); // every li has "Throw away" button
            foodListUl.appendChild(foodListLi); // putting list item into ul
        }
    },
    createThrowAwayButton: function () { // a method that can create a delete button for each element in the Food list
        var throwAwayButton = document.createElement("button");
        throwAwayButton.textContent = "Throw away"; // text on the button
        throwAwayButton.className = "throwAway"; // class of this button - works as same as finding buttons for their ids
        return throwAwayButton;
    },
    setUpEventListeners: function () {
        // adding an event listener for clicking on the ul to connect throwAwayButton with its delete function
        var foodItemsUl = document.querySelector("ul");
        foodItemsUl.addEventListener("click", function (eventClicker) { // eventClicker is just a random name for variable


            var elementClicked = eventClicker.target;
            if (elementClicked.className === "throwAway") {
                eventsHandler.throwAwayFoodButton(parseInt(elementClicked.parentNode.id));
            }
        })
    }
};

view.setUpEventListeners();



