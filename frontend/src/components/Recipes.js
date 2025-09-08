import React, { useState } from "react";
import "./Recipes.css"; // external CSS for styling

const recipesData = [
  {
    id: 1,
    title: "Avocado Toast",
    category: "Breakfast",
    time: "10 min",
    difficulty: "Easy",
    nutrition: { calories: 250, protein: "6g", carbs: "30g", fats: "12g" },
    image: "C:\Users\Abhishek\Desktop\HeartDiseaseApp\frontend\src\components\Avacodo toast.png",
    description: "A simple, nutrient-packed breakfast.",
    ingredients: ["2 slices whole grain bread", "1 ripe avocado", "Lemon juice", "Salt & pepper"],
    method: "Toast bread. Mash avocado with lemon, salt, and pepper. Spread on toast and serve."
  },
  {
    id: 2,
    title: "Quinoa Salad",
    category: "Lunch",
    time: "20 min",
    difficulty: "Medium",
    nutrition: { calories: 320, protein: "12g", carbs: "45g", fats: "8g" },
    image: "https://source.unsplash.com/400x300/?quinoa,salad",
    description: "A protein-rich salad with fresh veggies.",
    ingredients: ["1 cup quinoa", "Cucumber", "Tomatoes", "Olive oil", "Lemon juice"],
    method: "Cook quinoa. Mix with chopped veggies, olive oil, and lemon juice."
  },
  {
    id: 3,
    title: "Grilled Salmon",
    category: "Dinner",
    time: "25 min",
    difficulty: "Medium",
    nutrition: { calories: 400, protein: "35g", carbs: "5g", fats: "20g" },
    image: "https://source.unsplash.com/400x300/?salmon,grilled",
    description: "Omega-3 rich salmon with herbs.",
    ingredients: ["Salmon fillet", "Olive oil", "Garlic", "Rosemary", "Salt & pepper"],
    method: "Season salmon with oil, garlic, and herbs. Grill for 6–8 minutes."
  },
  {
    id: 4,
    title: "Smoothie Bowl",
    category: "Breakfast",
    time: "10 min",
    difficulty: "Easy",
    nutrition: { calories: 280, protein: "7g", carbs: "50g", fats: "6g" },
    image: "https://source.unsplash.com/400x300/?smoothie,fruit",
    description: "Colorful smoothie topped with fruits.",
    ingredients: ["Banana", "Berries", "Almond milk", "Granola", "Chia seeds"],
    method: "Blend fruits with almond milk. Top with granola and chia seeds."
  },
  {
    id: 5,
    title: "Vegetable Stir Fry",
    category: "Dinner",
    time: "15 min",
    difficulty: "Easy",
    nutrition: { calories: 220, protein: "5g", carbs: "35g", fats: "7g" },
    image: "https://source.unsplash.com/400x300/?vegetables,stirfry",
    description: "Colorful veggies with Asian flavors.",
    ingredients: ["Broccoli", "Bell peppers", "Carrots", "Soy sauce", "Garlic"],
    method: "Stir fry veggies in oil and garlic. Add soy sauce. Serve hot."
  },
  {
    id: 6,
    title: "Greek Yogurt Parfait",
    category: "Snack",
    time: "5 min",
    difficulty: "Easy",
    nutrition: { calories: 180, protein: "10g", carbs: "20g", fats: "4g" },
    image: "https://source.unsplash.com/400x300/?yogurt,parfait",
    description: "Layered yogurt with fruits and granola.",
    ingredients: ["Greek yogurt", "Granola", "Mixed berries", "Honey"],
    method: "Layer yogurt, granola, and fruits in a glass. Drizzle honey."
  },
  {
    id: 7,
    title: "Lentil Soup",
    category: "Dinner",
    time: "35 min",
    difficulty: "Medium",
    nutrition: { calories: 290, protein: "18g", carbs: "40g", fats: "4g" },
    image: "https://source.unsplash.com/400x300/?lentil,soup",
    description: "A hearty and protein-rich soup.",
    ingredients: ["Lentils", "Carrots", "Celery", "Onion", "Vegetable broth"],
    method: "Cook lentils with veggies and broth until soft. Blend if desired."
  },
  {
    id: 8,
    title: "Grilled Chicken Salad",
    category: "Lunch",
    time: "30 min",
    difficulty: "Medium",
    nutrition: { calories: 350, protein: "30g", carbs: "15g", fats: "15g" },
    image: "https://source.unsplash.com/400x300/?chicken,salad",
    description: "Lean protein salad with greens.",
    ingredients: ["Chicken breast", "Lettuce", "Cucumber", "Tomatoes", "Vinaigrette"],
    method: "Grill chicken. Slice and serve over greens with dressing."
  },
  {
    id: 9,
    title: "Stuffed Bell Peppers",
    category: "Dinner",
    time: "40 min",
    difficulty: "Hard",
    nutrition: { calories: 370, protein: "14g", carbs: "50g", fats: "10g" },
    image: "https://source.unsplash.com/400x300/?stuffed,peppers",
    description: "Colorful peppers filled with quinoa & veggies.",
    ingredients: ["Bell peppers", "Quinoa", "Onion", "Tomatoes", "Cheese"],
    method: "Stuff peppers with quinoa & veggies. Bake until tender. Top with cheese."
  },
  {
    id: 10,
    title: "Oatmeal with Berries",
    category: "Breakfast",
    time: "10 min",
    difficulty: "Easy",
    nutrition: { calories: 210, protein: "6g", carbs: "40g", fats: "3g" },
    image: "https://source.unsplash.com/400x300/?oatmeal,berries",
    description: "A fiber-rich, antioxidant-packed breakfast.",
    ingredients: ["Rolled oats", "Milk", "Berries", "Honey"],
    method: "Cook oats in milk. Top with fresh berries and drizzle honey."
  }
];

export default function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredRecipes = recipesData.filter((r) => {
    return (
      (category === "All" || r.category === category) &&
      r.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="recipes-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>🍲 Healthy Recipes for a Better Life</h1>
        <p>Discover delicious meals, balanced nutrition, and the joy of healthy eating.</p>
      </div>

      {/* Search & Filter */}
      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>
      </div>

      {/* Recipes Grid */}
      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <div className="meta">
              <span>⏱ {recipe.time}</span>
              <span>🔥 {recipe.difficulty}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRecipe && (
        <div className="modal" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <p><strong>Description:</strong> {selectedRecipe.description}</p>
            <h3>Nutrition Info</h3>
            <p>Calories: {selectedRecipe.nutrition.calories} kcal | Protein: {selectedRecipe.nutrition.protein} | Carbs: {selectedRecipe.nutrition.carbs} | Fats: {selectedRecipe.nutrition.fats}</p>
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ing, i) => <li key={i}>✅ {ing}</li>)}
            </ul>
            <h3>Method</h3>
            <p>{selectedRecipe.method}</p>
            <button onClick={() => setSelectedRecipe(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Education Section */}
      <section className="education">
        <h2>🥦 Why Healthy Eating Matters</h2>
        <p>
          Eating healthy helps prevent chronic diseases, boosts immunity, improves energy levels,
          and supports overall well-being. A balanced diet should include fresh fruits, vegetables,
          whole grains, lean proteins, and healthy fats.
        </p>
        <h3>📊 Daily Nutrient Guide</h3>
        <ul>
          <li>🍎 Fruits & Vegetables – 5 servings a day</li>
          <li>🍞 Whole Grains – 3–4 servings a day</li>
          <li>🥩 Protein – Lean meats, beans, lentils, fish</li>
          <li>🥑 Healthy Fats – Avocado, olive oil, nuts</li>
          <li>💧 Hydration – Drink 8 glasses of water daily</li>
        </ul>
      </section>
    </div>
  );
}
