import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-ingredi-bg/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="flex-shrink-0 flex items-center gap-2">
            <img 
              src={logo} 
              alt="Ingredi Logo" 
              className="h-80 w-auto object-contain mt-9 transition-transform hover:scale-105 duration-500" // Logo ki height yahan se control karein
            />
          </div>
          </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-xl font-medium text-slate-400 font-gentium">
          <Link to="/how-it-works" className="hover:text-ingredi-green transition-colors">How it works</Link>
          <a href="#" className="hover:text-ingredi-green transition-colors">Saved Recipes</a>
          <button className="cursor-pointer bg-ingredi-green text-ingredi-bg px-5 py-2 rounded-full font-bold hover:bg-white transition-all">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;