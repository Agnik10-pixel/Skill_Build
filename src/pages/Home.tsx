import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import { ArrowRight, BookMarked, Code2, Users2, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>

      <Navbar />
      
      <main className="flex-1 relative z-10 w-full">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-8 text-sm font-medium text-gray-700">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>The new standard in tech education</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 drop-shadow-sm">
            Master New Skills.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 leading-tight">
              Accelerate Your Career.
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-10 font-medium">
            Learn cutting-edge technologies, track your progress automatically, and submit real-world projects to showcase your expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/register" className="group relative overflow-hidden rounded-2xl bg-gray-900 text-white font-bold text-lg px-8 py-4 shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">Start Learning Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
            <Link to="/skills" className="bg-white/80 backdrop-blur-md text-gray-900 border border-gray-200 font-bold text-lg px-8 py-4 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center shadow-sm">
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/80 backdrop-blur-3xl rounded-[3rem] border border-white/50 shadow-xl shadow-indigo-100/50 -z-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-8 lg:p-12">
            <div className="flex flex-col items-start group">
              <div className="p-4 rounded-2xl mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <BookMarked className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Structured Paths</h3>
              <p className="text-gray-600 leading-relaxed font-medium">Follow carefully designed curriculum modules that take you from beginner to expert without the overwhelm.</p>
            </div>
            <div className="flex flex-col items-start group">
              <div className="p-4 rounded-2xl mb-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Project-Based</h3>
              <p className="text-gray-600 leading-relaxed font-medium">Submit actual projects, not just multiple choice tests. Build a robust portfolio while you learn.</p>
            </div>
            <div className="flex flex-col items-start group">
              <div className="p-4 rounded-2xl mb-6 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Users2 className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Mentorship</h3>
              <p className="text-gray-600 leading-relaxed font-medium">Have your submissions reviewed by admins and experts. Get real feedback to fix bad habits early.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
