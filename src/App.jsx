import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import { Search, X, Plus, Clock, Users, PlayCircle, ChefHat, BarChart } from 'lucide-react';

// --- Updated Dummy Data with Descriptions ---
const DUMMY_RECIPES = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    description: "A rich and velvety pasta dish infused with roasted garlic and premium parmesan cheese. Perfect for a quick dinner.",
    image: "https://images.unsplash.com/photo-1710381474218-a81a3d0ad432?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "20 min",
    servings: "2 Persons",
    difficulty: "Easy",
    ingredients: ["Pasta", "Garlic", "Cream", "Cheese", "Butter"],
    // Specific Pasta Video Link
    youtube: "https://www.youtube.com/watch?v=48Fs2V1_GiI", 
    instructions: "1. Boil pasta until al dente. 2. Sauté garlic in butter until golden. 3. Whisk in heavy cream and cheese. 4. Toss pasta in sauce and serve hot."
  },
  {
    id: 2,
    title: "Spicy Basil Chicken",
    description: "Authentic Thai-style stir-fry (Pad Krapow) with a perfect balance of heat from chilies and aroma from fresh basil.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop",
    time: "35 min",
    servings: "4 Persons",
    difficulty: "Medium",
    ingredients: ["Chicken", "Basil", "Chili", "Soy Sauce", "Ginger"],
    // Specific Thai Basil Chicken Video Link
    youtube: "https://www.youtube.com/watch?v=FYccN5kHRF0",
    instructions: "1. Stir-fry chicken strips. 2. Add minced ginger and chilies. 3. Pour soy sauce. 4. Turn off heat and fold in basil leaves."
  },
  {
  id: 3,
  title: "Honey Glazed Salmon",
  description: "Perfectly seared salmon fillets coated in a sticky-sweet honey and garlic glaze with a hint of lemon.",
  image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop",
  time: "25 min",
  servings: "2 Persons",
  difficulty: "Easy",
  ingredients: ["Salmon", "Honey", "Garlic", "Lemon", "Soy Sauce"],
  youtube: "https://www.youtube.com/watch?v=12f9SInAAbM",
  instructions: "1. Season salmon with salt/pepper. 2. Sear in a pan for 4 mins per side. 3. Mix honey, garlic, and lemon in a bowl. 4. Pour glaze over salmon and simmer for 2 mins."
},
];

function App() {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const removeIngredient = (nameToRemove) => {
  setIngredients(ingredients.filter(item => item !== nameToRemove));
}

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const val = inputValue.trim().toLowerCase();
    if (val && !ingredients.includes(val)) {
      setIngredients([...ingredients, val]);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen bg-ingredi-bg text-white font-inter">
      <Navbar />
      
      <main className="pt-30 pb-20 px-6 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-12 space-y-4 mt-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-normal leading-[1.1] px-2 font-gentium">
            What's in your <span className="text-transparent bg-clip-text bg-gradient-to-r from-ingredi-green to-ingredi-emerald pb-2">Kitchen?</span>
          </h1>
          <p className="text-ingredi-slate text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-inter">
            Enter the ingredients you have, and we'll suggest recipes you can cook right now.
          </p>
        </div>

        {/* Input Field Area */}
        <div className="w-full max-w-2xl relative group">
          <form onSubmit={handleAddIngredient}>
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-slate-500 group-focus-within:text-ingredi-green transition-colors duration-300 font-inter" size={24} />
            </div>
            
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add ingredients (e.g., Egg, Flour...)"
              className="w-full bg-ingredi-surface/50 border border-slate-700 py-5 pl-14 pr-16 rounded-2xl focus:outline-none focus:border-ingredi-green transition-all shadow-2xl text-lg placeholder:text-slate-600 backdrop-blur-sm"
            />

            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-ingredi-green text-ingredi-bg p-2 rounded-xl hover:bg-white transition-colors"
            >
              <Plus size={24} />
            </button>
          </form>

          {/* Exterior Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-ingredi-green to-ingredi-emerald rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500 -z-10"></div>
        </div>

        {/* Ingredient Chips Display */}
        <div className="w-full max-w-2xl flex flex-wrap gap-3 mt-8 justify-center">
  {ingredients.map((ingredient, index) => (
    <div 
      key={index}
      className="flex items-center gap-2 bg-ingredi-surface/80 border border-ingredi-green/30 px-4 py-2 rounded-full text-ingredi-green animate-in zoom-in duration-300 shadow-lg"
    >
      <span className="capitalize font-medium">{ingredient}</span>
      <button 
        type="button" // Ye add karna acha hota hai taake form submit na ho
        onClick={() => removeIngredient(ingredient)} // Confirm karein ye line aisi hi hai
        className="hover:text-white transition-colors cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  ))}
</div>

        {/* --- Recipe Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-12">
          {DUMMY_RECIPES.map((recipe) => (
            <div 
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-ingredi-surface rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 hover:border-ingredi-green transition-all duration-300 group shadow-lg"
            >
              {/* Card Image */}
              <div className="relative h-60 overflow-hidden">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>

              {/* Card Body */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 font-gentium text-white group-hover:text-ingredi-green transition-colors">{recipe.title}</h3>
                <p className="text-ingredi-slate text-sm line-clamp-2 mb-6 font-light">{recipe.description}</p>
                
                {/* Stats Row */}
                <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-6 bg-white/5 p-3 rounded-2xl">
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-ingredi-green"/> {recipe.time}</div>
                  <div className="flex items-center gap-1.5"><Users size={14} className="text-ingredi-green"/> {recipe.servings}</div>
                  <div className="flex items-center gap-1.5"><ChefHat size={14} className="text-ingredi-green"/> {recipe.difficulty}</div>
                </div>

                {/* Small Ingredients List */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Ingredients:</span>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="bg-white/5 px-3 py-1 rounded-lg text-[11px] text-slate-400">
                        {ing}
                      </span>
                    ))}
                    {recipe.ingredients.length > 3 && <span className="text-[11px] text-ingredi-green">+{recipe.ingredients.length - 3} more</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- Detailed Modal --- */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ingredi-bg/95 backdrop-blur-md" onClick={() => setSelectedRecipe(null)}></div>
          <div className="bg-ingredi-surface w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden relative z-10 border border-white/10 flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
            
            {/* Modal Left: Visuals */}
            <div className="md:w-1/2 p-4 md:p-8 flex flex-col justify-between">
              <div>
                <img src={selectedRecipe.image} className="w-full h-80 object-cover rounded-[2rem] shadow-2xl mb-8" />
             
              </div>
              <a href={selectedRecipe.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 w-full py-5 rounded-[1.5rem] font-bold text-lg shadow-lg hover:shadow-red-600/20 transition-all">
                <PlayCircle size={28} /> Watch Video Guide
              </a>
            </div>

            {/* Modal Right: Content */}
            <div className="md:w-1/2 p-8 md:pl-0 overflow-y-auto">
              <button onClick={() => setSelectedRecipe(null)} className="absolute top-8 right-8 p-2 bg-white/5 rounded-full hover:bg-white/20 transition-all">
                <X size={24} />
              </button>

              <h2 className="text-4xl font-bold font-gentium mb-2 text-white">{selectedRecipe.title}</h2>
              <p className="text-ingredi-slate mb-8 font-light leading-relaxed">{selectedRecipe.description}</p>
              
              <div className="space-y-8">
                {/* Full Ingredients Pill Shape */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-bold mb-4 text-slate-400">
                    <ChefHat className="text-ingredi-green" size={18} /> Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecipe.ingredients.map(ing => (
                      <span key={ing} className="bg-ingredi-green/10 border border-ingredi-green/20 px-5 py-2 rounded-full text-sm text-ingredi-green font-medium">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-bold mb-4 text-slate-400">
                    Instructions
                  </h4>
                  <div className="bg-white/5 p-6 rounded-[2rem] text-slate-300 leading-relaxed italic">
                    {selectedRecipe.instructions}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;