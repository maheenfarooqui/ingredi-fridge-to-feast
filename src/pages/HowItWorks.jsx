import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChefHat, PlayCircle, Zap, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
    const navigate = useNavigate();
  const steps = [
    {
      icon: <Search className="text-ingredi-green" size={32} />,
      title: "Input Ingredients",
      description: "Type the ingredients you have in your fridge. Egg, Flour, Chicken—anything goes!",
      color: "from-ingredi-green/20"
    },
    {
      icon: <Zap className="text-ingredi-emerald" size={32} />,
      title: "Smart Search",
      description: "Our AI-powered engine finds recipes that match your exact ingredients list in seconds.",
      color: "from-ingredi-emerald/20"
    },
    {
      icon: <ChefHat className="text-ingredi-green" size={32} />,
      title: "Choose & Cook",
      description: "Browse through beautiful recipe cards with details on time, servings, and difficulty.",
      color: "from-ingredi-green/20"
    },
    {
      icon: <PlayCircle className="text-red-500" size={32} />,
      title: "Watch & Learn",
      description: "Every recipe comes with a direct link to a YouTube video guide for easy cooking.",
      color: "from-red-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-ingredi-bg text-white font-inter pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-ingredi-green uppercase tracking-[0.3em] font-bold text-sm">The Process</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold font-gentium italic">
            From Fridge to <span className="text-transparent bg-clip-text bg-gradient-to-r from-ingredi-green to-ingredi-emerald">Feast.</span>
          </h1>
          <p className="text-ingredi-slate text-lg max-w-2xl mx-auto font-light">
            Stop wasting food and start cooking like a pro. Here is how we help you turn simple ingredients into gourmet meals.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative bg-ingredi-surface p-8 rounded-[2.5rem] border border-white/5 hover:border-ingredi-green/50 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${step.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]`}></div>
              
              <div className="relative z-10 space-y-6">
                <div className="bg-ingredi-bg w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-ingredi-green font-black text-4xl opacity-20">0{index + 1}</span>
                    <h3 className="text-2xl font-bold font-gentium">{step.title}</h3>
                  </div>
                  <p className="text-ingredi-slate text-sm leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-ingredi-surface to-transparent p-12 rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold font-gentium italic">Ready to start cooking?</h2>
            <p className="text-ingredi-slate font-light">Go back to the kitchen and enter your first ingredient.</p>
          </div>
        
          <button onClick={() => navigate('/')} 
           className="flex items-center gap-3 bg-ingredi-green text-ingredi-bg px-10 py-5 rounded-2xl font-black text-lg hover:bg-white transition-all active:scale-95">
            Go To Kitchen <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;