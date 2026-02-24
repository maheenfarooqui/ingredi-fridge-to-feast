import React, { useState } from 'react';
import { Search, X, Plus, Clock, Users, PlayCircle, ChefHat, BarChart, Trash2, Zap, ArrowRight, Heart } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // Agar import nahi hai to kar lein



function Home() {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(false);

  // --- API CONFIG ---
  const APP_ID = "c0565c16"; 
const APP_KEY = "7b098fcfe5774321fce04a8f39230d42";

  // --- FUNCTIONS ---
  const handleAddIngredient = (e) => {
    e.preventDefault();
    const val = inputValue.trim().toLowerCase();
    if (val && !ingredients.includes(val)) {
      setIngredients([...ingredients, val]);
      setInputValue("");
    }
  };

  const removeIngredient = (nameToRemove) => {
    setIngredients(ingredients.filter(item => item !== nameToRemove));
  };

const fetchRecipes = async () => {
  if (ingredients.length === 0) return;
  
  setLoading(true);
  
  // Ingredients ko join karke query string banana
  const query = ingredients.join(" "); 
  
  // Nayi Recipe Search API IDs
  const APP_ID = "c0565c16"; 
  const APP_KEY = "7b098fcfe5774321fce04a8f39230d42"; 

  // Direct v2 API Endpoint
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en'
      }
    });

    // Rate Limit Check (1 hit/min)
    if (response.status === 429) {
      alert("Slow down! 1 minute mein sirf ek baar search kar sakte hain.");
      setLoading(false);
      return;
    }

    if (!response.ok) {
      throw new Error(`Server status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.hits || data.hits.length === 0) {
      alert("Koi recipe nahi mili! Try simpler ingredients like 'Egg' or 'Bread'.");
      return;
    }

    const formattedRecipes = data.hits.map((item, index) => ({
      id: index,
      title: item.recipe.label,
      description: `Source: ${item.recipe.source}`, 
      image: item.recipe.image,
      time: item.recipe.totalTime > 0 ? `${item.recipe.totalTime} min` : "20 min",
      servings: `${item.recipe.yield || 2} Persons`,
      difficulty: item.recipe.ingredients.length > 7 ? "Medium" : "Easy",
      ingredients: item.recipe.ingredientLines,
      youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(item.recipe.label)}+recipe`,
      instructions: "Follow the video guide or click the source link for details."
    }));

    setRecipes(formattedRecipes);
    
    // Smooth scroll to results
    setTimeout(() => {
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }, 100);
    
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Connection Error! Thora wait karke refresh karein.");
  } finally {
    setLoading(false);
  }
};
const { user } = useAuth();

const toggleSaveRecipe = async (recipe) => {
  if (!user) {
    alert("Please login to save recipes!");
    navigate('/auth');
    return;
  }

  try {
    // Check karein ke kya ye pehle se save toh nahi?
    const q = query(
      collection(db, "savedRecipes"), 
      where("userId", "==", user.uid),
      where("title", "==", recipe.title)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Agar pehle se saved hai to delete kar do (Unsave logic)
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, "savedRecipes", docId));
      alert("Recipe removed from favorites!");
    } else {
      // Nayi recipe save karein
      await addDoc(collection(db, "savedRecipes"), {
        userId: user.uid,
        title: recipe.title,
        image: recipe.image,
        time: recipe.time,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        timestamp: new Date()
      });
      alert("Recipe saved successfully! ❤️");
    }
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
};
  return (
  <div className="min-h-screen bg-ingredi-bg text-white font-inter">
    
    
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
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 bg-ingredi-green text-ingredi-bg p-2 rounded-xl hover:bg-white transition-colors"
          >
            <Plus size={24} />
          </button>
        </form>

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
              type="button" 
              onClick={() => removeIngredient(ingredient)} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Find Recipes Button */}
      {ingredients.length > 0 && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={fetchRecipes}
            disabled={loading}
            className="group relative px-12 py-5 bg-ingredi-green text-ingredi-bg font-black text-xl rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(74,222,128,0.2)] hover:shadow-ingredi-green/40 active:scale-95 flex items-center gap-3 disabled:opacity-50"
          >
            <Search size={24} className={loading ? "animate-spin" : "group-hover:rotate-12 transition-transform"} />
            {loading ? "Searching..." : "Find Best Recipes"}
            <div className="absolute inset-0 rounded-2xl blur-xl bg-ingredi-green/30 -z-10 group-hover:bg-ingredi-green/50 transition-all"></div>
          </button>
        </div>
      )}

      {/* --- Recipe Grid (Updated to use 'recipes' state) --- */}
      <div className="w-full max-w-6xl mt-12">
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <div 
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-ingredi-surface rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 hover:border-ingredi-green transition-all duration-300 group shadow-lg"
              >
                <div className="relative h-60 overflow-hidden">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <button 
    onClick={(e) => {
      e.stopPropagation(); // Taake card ka click (Modal) trigger na ho
      toggleSaveRecipe(recipe);
    }}
    className="absolute top-4 right-4 z-10 p-3 bg-ingredi-bg/60 backdrop-blur-md rounded-full border border-white/10 hover:bg-ingredi-green group/heart transition-all"
  >
    <Heart 
      size={20} 
      className="text-white group-hover/heart:text-ingredi-bg group-hover/heart:fill-current transition-colors" 
    />
  </button>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 font-gentium text-white group-hover:text-ingredi-green transition-colors">{recipe.title}</h3>
                  <p className="text-ingredi-slate text-sm line-clamp-2 mb-6 font-light">{recipe.description}</p>
                  
                  <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-6 bg-white/5 p-3 rounded-2xl">
                    <div className="flex items-center gap-1.5"><Clock size={14} className="text-ingredi-green"/> {recipe.time}</div>
                    <div className="flex items-center gap-1.5"><Users size={14} className="text-ingredi-green"/> {recipe.servings}</div>
                    <div className="flex items-center gap-1.5"><ChefHat size={14} className="text-ingredi-green"/> {recipe.difficulty}</div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Main Ingredients:</span>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.slice(0, 3).map((ing, i) => (
                        <span key={i} className="bg-white/5 px-3 py-1 rounded-lg text-[11px] text-slate-400">
                          {ing.length > 20 ? ing.substring(0, 20) + "..." : ing}
                        </span>
                      ))}
                      {recipe.ingredients.length > 3 && <span className="text-[11px] text-ingredi-green">+{recipe.ingredients.length - 3} more</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20 opacity-20">
              <ChefHat size={80} className="mx-auto mb-4" />
              <p className="text-2xl font-gentium italic">Add ingredients to find delicious recipes!</p>
            </div>
          )
        )}
      </div>
    </main>

    {/* --- Detailed Modal --- */}
    {selectedRecipe && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-ingredi-bg/95 backdrop-blur-md" onClick={() => setSelectedRecipe(null)}></div>
        <div className="bg-ingredi-surface w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden relative z-10 border border-white/10 flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
          
          <div className="md:w-1/2 p-4 md:p-8 flex flex-col justify-between overflow-hidden">
            <img src={selectedRecipe.image} className="w-full h-full max-h-[400px] object-cover rounded-[2rem] shadow-2xl mb-8" />
            <a href={selectedRecipe.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 w-full py-5 rounded-[1.5rem] font-bold text-lg shadow-lg hover:shadow-red-600/20 transition-all">
              <PlayCircle size={28} /> Watch Video Guide
            </a>
          </div>

          <div className="md:w-1/2 p-8 md:pl-0 overflow-y-auto">
            <button onClick={() => setSelectedRecipe(null)} className="absolute top-8 right-8 p-2 bg-white/5 rounded-full hover:bg-white/20 transition-all">
              <X size={24} />
            </button>

            <h2 className="text-4xl font-bold font-gentium mb-2 text-white">{selectedRecipe.title}</h2>
            <p className="text-ingredi-slate mb-8 font-light leading-relaxed">{selectedRecipe.description}</p>
            
            <div className="space-y-8">
              <div>
                <h4 className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-bold mb-4 text-slate-400">
                  <ChefHat className="text-ingredi-green" size={18} /> Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <span key={i} className="bg-ingredi-green/10 border border-ingredi-green/20 px-5 py-2 rounded-full text-sm text-ingredi-green font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

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

export default Home;