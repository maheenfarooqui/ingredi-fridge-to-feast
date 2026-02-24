import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { LogOut, User } from 'lucide-react';
const Navbar = () => {
  const { user } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
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
        <div className="flex-shrink-0 flex items-center gap-2">
            <img 
              src={logo} 
              alt="Ingredi Logo" 
              className="h-20 w-auto object-contain  transition-transform hover:scale-105 duration-500" // Logo ki height yahan se control karein
            />
          </div>
          </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-xl font-medium text-slate-400 font-gentium">
          <Link to="/how-it-works" className="hover:text-ingredi-green transition-colors">How it works</Link>
        <Link to="/saved">  <a href="#" className="hover:text-ingredi-green transition-colors">Saved Recipes</a></Link>
         {/* Conditional Rendering: Login vs User Profile */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <User size={16} className="text-ingredi-green" />
                <span className="text-sm font-medium text-slate-200">
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
         <Link to="/auth"> <button className="cursor-pointer bg-ingredi-green text-ingredi-bg px-5 py-2 rounded-full font-bold hover:bg-white transition-all">
            Login
          </button>
          </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;