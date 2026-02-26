import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { ChefHat, Clock, Users, Trash2, X, PlayCircle, ExternalLink } from 'lucide-react';

const SavedRecipes = () => {
  const { user } = useAuth();
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // --- GET DATA ---
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "savedRecipes"), where("userId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recipes = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setSavedItems(recipes);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // --- DELETE FUNCTION ---
  const handleDelete = async (docId, e) => {
    e.stopPropagation(); // Card click ko rokne ke liye
    try {
      // Firestore se delete karna
      await deleteDoc(doc(db, "savedRecipes", docId));
      // onSnapshot khud hi UI update kar dega
    } catch (err) {
      alert("Error deleting recipe: " + err.message);
    }
  };

  if (!user) return <div className="pt-40 text-center text-white">Please login to see your cookbook.</div>;

  return (
    <div className="min-h-screen bg-ingredi-bg text-white pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold font-gentium italic mb-12">
          Your <span className="text-ingredi-green">Saved Feasts</span>
        </h1>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : savedItems.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[3rem]">
            <ChefHat size={80} className="mx-auto mb-6 text-slate-700" />
            <p className="text-2xl italic font-gentium text-slate-500">No recipes saved yet!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {savedItems.map((recipe) => (
              <div 
                key={recipe.id} 
                onClick={() => setSelectedRecipe(recipe)} // Isse modal khulega
                className="bg-ingredi-surface rounded-[2.5rem] overflow-hidden border border-white/5 relative group cursor-pointer hover:border-ingredi-green/40 transition-all duration-500"
              >
                <img src={recipe.image} alt={recipe.title} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Delete Button */}
                <button 
                  onClick={(e) => handleDelete(recipe.id, e)}
                  className="absolute top-4 right-4 p-3 bg-red-500/20 backdrop-blur-md text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                >
                  <Trash2 size={18} />
                </button>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-gentium mb-4 line-clamp-1 group-hover:text-ingredi-green transition-colors">
                    {recipe.title}
                  </h3>
                  <div className="flex justify-between text-[10px] text-slate-400 font-black tracking-widest uppercase">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-ingredi-green"/> {recipe.time}</span>
                    <span className="flex items-center gap-1.5"><Users size={14} className="text-ingredi-green"/> {recipe.servings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- RECIPE MODAL --- */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ingredi-bg/95 backdrop-blur-xl">
          <div className="bg-ingredi-surface max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[3.5rem] p-10 border border-white/10 relative shadow-2xl">
            <button 
              onClick={() => setSelectedRecipe(null)} 
              className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            
            <img src={selectedRecipe.image} className="w-full h-80 object-cover rounded-[2.5rem] mb-8 shadow-lg" />
            
            <h2 className="text-4xl font-bold font-gentium italic mb-8 leading-tight">{selectedRecipe.title}</h2>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-ingredi-green font-black tracking-[0.2em] uppercase text-[10px] mb-6 border-b border-white/5 pb-2">Ingredients</h4>
                <ul className="grid grid-cols-1 gap-4 text-slate-300">
                  {selectedRecipe.ingredients?.map((ing, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-ingredi-green rounded-full shrink-0"></div>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-8">
                <a 
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedRecipe.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-5 bg-ingredi-green text-ingredi-bg font-black rounded-[1.5rem] hover:shadow-[0_0_30px_rgba(50,255,126,0.3)] transition-all uppercase tracking-widest text-xs"
                >
                  <PlayCircle size={20} /> Watch How To Make
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;