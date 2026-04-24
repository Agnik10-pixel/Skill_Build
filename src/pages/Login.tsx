import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useNavigate, Link } from 'react-router';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
      
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-6 hover:scale-105 transition-transform">
          <div className="p-3 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl shadow-xl shadow-purple-500/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </Link>
        <h2 className="text-center text-4xl font-extrabold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-3 text-center text-base text-gray-600 font-medium">
          Sign in to pick up where you left off.
        </p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-3xl sm:px-10 border border-white/60">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 font-medium">{error}</div>}
            
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-gray-700">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm font-medium transition-all"
                  placeholder="e.g. johndoe"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/25"
              >
                Sign in <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600 font-medium">
              New to SkillsBuild?{' '}
              <Link to="/register" className="font-bold text-purple-600 hover:text-purple-500 transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
