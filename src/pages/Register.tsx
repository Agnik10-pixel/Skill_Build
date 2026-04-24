import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useNavigate, Link } from 'react-router';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-300 via-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
      
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-6 hover:scale-105 transition-transform">
          <div className="p-3 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl shadow-xl shadow-blue-500/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </Link>
        <h2 className="text-center text-4xl font-extrabold text-gray-900 tracking-tight">
          Join SkillsBuild
        </h2>
        <p className="mt-3 text-center text-base text-gray-600 font-medium">
          Start your learning journey today.
        </p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-3xl sm:px-10 border border-white/60">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 font-medium">{error}</div>}
            
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-gray-700">
                Choose a Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm font-medium transition-all"
                  placeholder="e.g. alex123"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-bold text-gray-700">
                Select your track
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="block w-full pl-4 pr-10 py-3 text-base border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm rounded-xl border font-medium bg-white"
                >
                  <option value="user">Student (Learn skills)</option>
                  <option value="admin">Instructor (Create & Review)</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
