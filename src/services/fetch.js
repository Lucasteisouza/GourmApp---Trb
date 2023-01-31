const fetchMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  return response.json();
};

const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  return response.json();
};

const fetchMealCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  return response.json();
};

const fetchDrinkCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  return response.json();
};

const fetchDrinkByCategory = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`);
  return response.json();
};

const fetchMealByCategory = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
  return response.json();
};

const fetchDrinksById = async (name) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${name}`,
  );
  return response.json();
};

const fetchMealsById = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`);
  return response.json();
};

export { fetchMeals,
  fetchDrinks,
  fetchMealCategories,
  fetchDrinkCategories,
  fetchDrinkByCategory,
  fetchMealByCategory,
  fetchDrinksById,
  fetchMealsById };
