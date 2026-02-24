import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart } from 'lucide-react';
import logo from "../../assets/logo.png"; // Apna logo path check kar lein

const Footer = () => {
  return (
    <footer className="bg-ingredi-surface border-t border-white/5 pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Setup: Logo section takes 2/4 space, others take 1/4 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* 1. BIG Brand Section (col-span-2) */}
          <div className="md:col-span-2 flex flex-col items-start">
            <Link to="/" className="group">
              <img 
                src={logo} 
                alt="Ingredi Logo" 
                className="h-20 w-auto object-contain transition-transform hover:scale-105 duration-300" 
              />
            </Link>
            <p className="mt-6 text-slate-400 text-base leading-relaxed max-w-md">
              Don't know what to cook? Just enter the ingredients you have and we'll find the perfect recipes for you instantly. 
              Making home cooking accessible for everyone.
            </p>
          </div>

          {/* 2. Smaller Navigation Section */}
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Navigation</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link to="/" className="hover:text-ingredi-green transition-colors">Home</Link></li>
              <li><Link to="/how-it-works" className="hover:text-ingredi-green transition-colors">How it Works</Link></li>
              <li><Link to="/saved" className="hover:text-ingredi-green transition-colors">Saved Recipes</Link></li>
            </ul>
          </div>

          {/* 3. Smaller Connect Section */}
          <div className="md:col-span-1">
            <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-ingredi-green hover:text-ingredi-bg transition-all text-white">
                <Github size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-ingredi-green hover:text-ingredi-bg transition-all text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-ingredi-green hover:text-ingredi-bg transition-all text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 Ingredi Fridge to Feast. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-ingredi-green fill-current" /> for home chefs.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;