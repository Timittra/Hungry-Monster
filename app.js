// creating event handler for search button
const searchBtn = document.getElementById('search_button');
searchBtn.addEventListener('click', () => {
    const inputFood = document.getElementById('food').value;
    getMealData(inputFood);
});

// fetching data for meal from api
const getMealData = (food) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${food}`)
        .then(response => response.json())
        .then(data => displayMeals(data.meals))
        .catch(error =>{
            message.innerText = "Not Found! Please search again!";
        });
        document.getElementById('food').value = "";
        message.innerText = "";
}

// showing meal items from search result
const displayMeals = meals => {
    const mealsDiv = document.getElementById('meals');

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';

        const mealName = meal.strMeal;
        const image = meal.strMealThumb;

        const mealInfo = `
                <div onclick='displayMealDetail("${mealName}")'>
                <img class='meal-image' src="${image}">
                <h3 class='meal-name'>${meal.strMeal}</h3>
                </div>
                `;

        mealDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(mealDiv);

    });
}

// fetching for specific meal detail info
const displayMealDetail = (name) => {

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => renderMealInfo(data.meals[0]));
}

// showing data for specific meal
const renderMealInfo = meal => {
    const mealDiv = document.getElementById("mealDetail");

    mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3 class='meal-name'>${meal.strMeal}</h3>
        <h4>Ingredients</h4> 
        <li>${meal.strIngredient1}</li> 
        <li>${meal.strIngredient2}</li> 
        <li>${meal.strIngredient3}</li> 
        <li>${meal.strIngredient4}</li> 
        <li>${meal.strIngredient5}</li> 
        <li>${meal.strIngredient6}</li> 
        <li>${meal.strIngredient7}</li> 
        <li>${meal.strIngredient8}</li> 
        <li>${meal.strIngredient9}</li> 
        <li>${meal.strIngredient10}</li> 
        
    `;

}
// setTimeout("location.reload(true)",20000);