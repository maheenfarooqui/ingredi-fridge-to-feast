import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { ChefHat, Clock, Users, Trash2 } from 'lucide-react';

const SavedRecipes = () => {
  const { user } = useAuth();
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // User ki specific recipes fetch karne ke liye query
    const q = query(collection(db, "savedRecipes"), where("userId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSavedItems(recipes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return <div className="pt-40 text-center font-gentium text-2xl">Please login to see saved recipes.</div>;

  return (
    <div className="min-h-screen bg-ingredi-bg text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold font-gentium italic mb-12">Your <span className="text-ingredi-green">Collection</span></h1>
        
        {loading ? (
          <p className="text-slate-500">Loading your favorites...</p>
        ) : savedItems.length === 0 ? (
          <div className="text-center py-20 opacity-30">
            <ChefHat size={80} className="mx-auto mb-4" />
            <p className="text-2xl italic font-gentium">Your cookbook is empty. Start saving some feasts!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedItems.map((item) => (
              <div key={item.id} className="bg-ingredi-surface rounded-[2.5rem] overflow-hidden border border-white/5 relative group">
                <img src={item.image} alt={item.title} className="w-full h-52 object-cover" />
                
                <div className="p-6">
                  <h3 className="text-xl font-bold font-gentium mb-4">{item.title}</h3>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock size={14}/> {item.time}</span>
                    <span className="flex items-center gap-1"><Users size={14}/> {item.servings}</span>
                  </div>
                  <button 
  onClick={() => handleDelete(item.id)}
  className="p-2 absolute top-6 right-6 bg-ingredi-surface cursor-pointer text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
>
  <Trash2 size={18} />
</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;