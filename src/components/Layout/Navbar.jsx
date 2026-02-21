import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-ingredi-bg/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center gap-2">
            <img 
              src={logo} 
              alt="Ingredi Logo" 
              className="h-80 w-auto object-contain mt-9 transition-transform hover:scale-105 duration-500" // Logo ki height yahan se control karein
            />
          </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400 font-gentium">
          <a href="#" className="hover:text-ingredi-green transition-colors">How it works</a>
          <a href="#" className="hover:text-ingredi-green transition-colors">Saved Recipes</a>
          <button className="bg-ingredi-green text-ingredi-bg px-5 py-2 rounded-full font-bold hover:bg-white transition-all">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;