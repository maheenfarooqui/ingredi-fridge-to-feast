import React, { useState } from 'react'; // useState add kiya
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { LogOut, User, Menu, X } from 'lucide-react'; // Menu aur X add kiye

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false); // Logout pe menu band
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-ingredi-bg/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <img 
            src={logo} 
            alt="Ingredi Logo" 
            className="h-16 w-auto object-contain transition-transform hover:scale-105 duration-500" 
          />
        </Link>

        {/* --- Desktop Menu (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium text-slate-400 font-gentium">
          <Link to="/how-it-works" className="hover:text-ingredi-green transition-colors">How it works</Link>
          <Link to="/saved" className="hover:text-ingredi-green transition-colors">Saved Recipes</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <User size={16} className="text-ingredi-green" />
                <span className="text-sm font-medium text-slate-200">
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <button className="bg-ingredi-green text-ingredi-bg px-6 py-2 rounded-full font-bold hover:bg-white transition-all">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* --- Mobile Hamburger Button (Shown on Mobile only) --- */}
        <button 
          className="md:hidden text-slate-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- Mobile Menu Overlay --- */}
     {/* --- Mobile Menu Overlay --- */}
<div className={`
  fixed inset-0 h-screen w-full bg-ingredi-bg z-[999] transition-transform duration-500 ease-in-out md:hidden
  ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
`}>
  {/* Header inside Menu to close it */}
  <div className="flex justify-between items-center px-6 h-20 border-b border-white/5">
    <img src={logo} alt="Logo" className="h-12 w-auto" />
    <button onClick={() => setIsMenuOpen(false)} className="text-white">
      <X size={32} />
    </button>
  </div>

  {/* Menu Content */}
  <div className="flex flex-col items-center justify-center gap-10 h-[calc(100vh-80px)] text-3xl font-gentium italic text-white">
    <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)} className="hover:text-ingredi-green transition-all">
      How it works
    </Link>
    <Link to="/saved" onClick={() => setIsMenuOpen(false)} className="hover:text-ingredi-green transition-all">
      Saved Recipes
    </Link>
    
    <div className="w-full px-10 pt-10 border-t border-white/5 mt-4">
      {user ? (
        <div className="flex flex-col items-center gap-8">
           <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl">
              <User size={20} className="text-ingredi-green" />
              <span className="text-base font-sans font-bold uppercase tracking-widest">
                {user.displayName || user.email.split('@')[0]}
              </span>
           </div>
           <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 font-sans font-bold text-lg"
           >
             <LogOut size={24} /> Logout Account
           </button>
        </div>
      ) : (
        <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
          <button className="w-full bg-ingredi-green text-ingredi-bg py-5 rounded-[2rem] font-black text-xl shadow-[0_0_40px_rgba(50,255,126,0.2)]">
            Login / Join
          </button>
        </Link>
      )}
    </div>
  </div>
</div>
    </nav>
  );
};

export default Navbar;