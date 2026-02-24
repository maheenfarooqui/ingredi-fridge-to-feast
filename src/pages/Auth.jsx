import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/'); // Login ke baad home par bhej do
    } catch (err) {
      setError(err.message.replace('Firebase:', ''));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-ingredi-bg flex items-center justify-center px-6 pt-25">
      <div className="w-full max-w-md bg-ingredi-surface p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Blur */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-ingredi-green/10 blur-[80px]"></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold font-gentium italic mb-2">
            {isLogin ? 'Welcome Back' : 'Join the Kitchen'}
          </h2>
          <p className="text-ingredi-slate mb-8 font-light">
            {isLogin ? 'Login to access your saved recipes.' : 'Create an account to start saving your feasts.'}
          </p>

          {error && <p className="bg-red-500/10 text-red-500 p-3 rounded-xl text-sm mb-6 border border-red-500/20">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-ingredi-green transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-ingredi-bg border border-slate-700 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-ingredi-green transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-ingredi-green transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full bg-ingredi-bg border border-slate-700 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-ingredi-green transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="w-full bg-ingredi-green text-ingredi-bg py-4 rounded-2xl font-black text-lg hover:bg-white transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-ingredi-green/20">
              {isLogin ? 'Login' : 'Create Account'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-8 text-center">
            <hr className="border-white/5" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ingredi-surface px-4 text-xs text-slate-500 uppercase tracking-widest font-bold">OR</span>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white hover:text-ingredi-bg transition-all flex items-center justify-center gap-3"
          >
            <Chrome size={20} /> Sign in with Google
          </button>

          <p className="mt-8 text-center text-slate-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-ingredi-green font-bold ml-2 hover:underline decoration-2"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;