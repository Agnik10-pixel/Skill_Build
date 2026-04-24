import { Link, useNavigate } from 'react-router';
import { useAuth } from '../lib/auth';
import { BookOpen, LogOut, LayoutDashboard, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg shadow-md shadow-orange-500/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <Link to="/" className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              SkillsBuild
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <Link to="/skills" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-semibold transition-colors">Explore</Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-semibold flex items-center gap-2 transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-pink-600 px-3 py-2 text-sm font-semibold flex items-center gap-2 transition-colors">
                    <Shield className="w-4 h-4" /> <span className="hidden sm:inline">Admin</span>
                  </Link>
                )}
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/30 ring-2 ring-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-semibold transition-colors">Log in</Link>
                <Link to="/register" className="relative group overflow-hidden rounded-full p-[1px]">
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></span>
                  <div className="relative bg-white/90 group-hover:bg-transparent backdrop-blur-sm px-5 py-2 rounded-full transition-colors">
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600 group-hover:text-white transition-colors">Sign up</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
