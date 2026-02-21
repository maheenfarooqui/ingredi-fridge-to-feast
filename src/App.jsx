import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import { Search, X, Plus } from 'lucide-react';

function App() {
  // --- Logic Start ---
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState([]);

  // Ingredient add karne ka function
  const handleAddIngredient = (e) => {
    e.preventDefault(); // Page refresh hone se rokta hai
    const trimmedValue = inputValue.trim().toLowerCase();
    
    // Agar input khali nahi hai aur pehle se list mein nahi hai
    if (trimmedValue && !ingredients.includes(trimmedValue)) {
      setIngredients([...ingredients, trimmedValue]);
      setInputValue(""); // Type karne ke baad box khali kar do
    }
  };

  // Ingredient delete karne ka function
  const removeIngredient = (name) => {
    setIngredients(ingredients.filter(item => item !== name));
  };
  // --- Logic End ---

  return (
    <div className="min-h-screen bg-ingredi-bg font-sans selection:bg-ingredi-green selection:text-ingredi-bg text-white">
      <Navbar />
      
      <main className="relative pt-40 pb-20 px-4 flex flex-col items-center overflow-hidden">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] px-2 font-gentium">
            What's in your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-ingredi-green to-ingredi-emerald pb-2 px-2">Kitchen?</span>
          </h1>
          <p className="text-ingredi-slate text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-inter font-light">
            Enter the ingredients you have, and we'll suggest recipes you can cook right now.
          </p>
        </div>

        {/* Search Bar / Input Form */}
        <div className="w-full max-w-2xl relative group">
          <form onSubmit={handleAddIngredient}>
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-slate-500 group-focus-within:text-ingredi-green transition-colors duration-300" size={24} />
            </div>
            
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add ingredients (e.g., Egg, Flour...)"
              className="w-full bg-ingredi-surface/50 border border-slate-700 py-5 pl-14 pr-16 rounded-2xl font-inter font-light focus:outline-none focus:border-ingredi-green transition-all shadow-2xl text-lg placeholder:text-slate-600 backdrop-blur-sm"
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
              className="flex items-center gap-2 bg-ingredi-surface/80 border border-ingredi-green/30 px-4 py-2 rounded-full text-white animate-in zoom-in duration-300 shadow-lg"
            >
              <span className="capitalize font-medium">{ingredient}</span>
              <button 
                onClick={() => removeIngredient(ingredient)}
                className="hover:text-ingredi-green transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default App;