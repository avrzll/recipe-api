const express = require('express');
const recipes = require('./data.json');

const app = express();
const port = 3001;

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.get('/recipes/search', (req, res) => {
  const { ingredients } = req.query;
  
  if (!ingredients || typeof ingredients !== 'string' || ingredients.trim() === '') {
    return res.status(400).json({ error: true, message: "Please provide valid ingredients query parameter." });
  }

  const searchIngredients = ingredients.split(',');

  const matchingRecipes = recipes.data.filter(recipe => {
    return searchIngredients.every(ingredient => recipe.key.includes(ingredient.trim()));
  });

  if (matchingRecipes.length === 0) {
    return res.status(404).json({ error: true, message: "No recipes found with the provided ingredients." });
  }

  res.json({ error: false, message: "success", data: matchingRecipes });
});

app.get('/recipes/search-any', (req, res) => {
  const { ingredients } = req.query;
  
  if (!ingredients || typeof ingredients !== 'string' || ingredients.trim() === '') {
    return res.status(400).json({ error: true, message: "Please provide valid ingredients query parameter." });
  }

  const searchIngredients = ingredients.split(',');

  const matchingRecipes = recipes.data.filter(recipe => {
    return searchIngredients.some(ingredient => recipe.key.includes(ingredient.trim()));
  });

  if (matchingRecipes.length === 0) {
    return res.status(404).json({ error: true, message: "No recipes found with the provided ingredients." });
  }

  res.json({ error: false, message: "success", data: matchingRecipes });
  
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
