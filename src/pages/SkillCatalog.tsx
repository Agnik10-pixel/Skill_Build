import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router';
import { getSkillIcon } from '../lib/utils';
import { Layers, Heart, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export default function SkillCatalog() {
  const [skills, setSkills] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All', 
    'Web Development', 
    'Mobile Development', 
    'Programming Languages', 
    'Data Science & AI', 
    'Cloud & DevOps', 
    'Database Management', 
    'Cybersecurity', 
    'Software Engineering', 
    'Game Development', 
    'Specialized Tech',
    'Design',
    'Business',
    'Development Tools'
  ];

  useEffect(() => {
    setLoading(true);
    api.getSkills()
      .then(data => setSkills(data))
      .catch(err => console.error('Failed to fetch skills', err))
      .finally(() => setLoading(false));

    api.getFavorites()
      .then(data => setFavorites(data))
      .catch(err => {
        // Silently fail if not logged in
        console.log('User not logged in, favorites unavailable');
      });
  }, []);

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(search.toLowerCase()) || 
                         skill.description.toLowerCase().includes(search.toLowerCase());
    if (activeCategory === 'All') return matchesSearch;
    
    const matchesCategory = skill.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleToggleFavorite = async (e: React.MouseEvent, skillId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await api.toggleFavorite(skillId);
      if (result.favorited) {
        setFavorites([...favorites, skillId]);
      } else {
        setFavorites(favorites.filter(id => id !== skillId));
      }
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col relative">
      <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-purple-50/80 via-white to-transparent pointer-events-none"></div>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 relative z-10 text-center md:text-left">
        <header className="mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
          >
            <Layers className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Global Learning Catalog</span>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
                120+ Professional <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Subject Courses</span>
              </h1>
              <p className="text-gray-500 mt-6 text-xl font-medium max-w-2xl leading-relaxed">Shape your future with our meticulously crafted learning paths. Explore subjects from Python to Blockchain.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-white border-2 border-gray-100 rounded-3xl px-6 py-4 shadow-xl shadow-gray-200/20 inline-flex items-center gap-4 font-black text-gray-800">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-2xl leading-none">{skills.length}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mt-1">Active Courses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto md:mx-0 space-y-8">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search subjects (e.g. Java, Python, Node...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-16 pl-14 pr-6 rounded-[2rem] bg-white border-2 border-gray-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-lg font-medium shadow-xl shadow-gray-200/20"
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                    activeCategory === cat 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105' 
                      : 'bg-white text-gray-500 border border-gray-100 hover:border-indigo-200 hover:text-indigo-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {loading ? (
             <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Layers className="w-10 h-10 text-gray-300" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found matching your criteria</h3>
             <p className="text-gray-400 font-medium">Try searching for something else or browse all categories</p>
             <button onClick={() => {setSearch(''); setActiveCategory('All');}} className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-colors">Reset Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map(skill => {
              const isFavorited = favorites.includes(skill.id);
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8 }}
                  key={skill.id} 
                  className="group bg-white rounded-[2.5rem] border border-gray-100 flex flex-col overflow-hidden hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] hover:border-indigo-200 transition-all duration-500"
                >
                  <div className="h-44 relative bg-gradient-to-br from-gray-50 to-white border-b border-gray-50 flex items-center justify-center p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.01)_1.5px,transparent_1.5px)]" style={{ backgroundSize: '24px 24px' }}></div>
                    <button 
                      onClick={(e) => handleToggleFavorite(e, skill.id)}
                      className={`absolute top-5 right-5 p-3 rounded-2xl shadow-sm border transition-all duration-300 z-20 ${
                        isFavorited 
                          ? 'bg-red-50 text-red-500 border-red-100' 
                          : 'bg-white/80 backdrop-blur-md text-gray-400 border-gray-100 hover:text-red-500 hover:border-red-100'
                      }`}
                    >
                      <Heart className={`w-5 h-5 transition-transform duration-300 ${isFavorited ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
                    </button>
                    <div className="relative z-10 p-5 bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-gray-50">
                      <img src={getSkillIcon(skill.title)} alt={`${skill.title} logo`} className="h-16 w-16 object-contain filter" />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1 bg-white text-left">
                    <div className="flex items-center gap-2 mb-3">
                       <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg">Elite Course</span>
                    </div>
                    <h3 className="font-black text-xl mb-3 text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{skill.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">{skill.description}</p>
                    
                    <div className="space-y-2 mb-8">
                      {skill.modules.slice(0, 3).map((module: any, idx: number) => (
                        <div key={module.id} className="flex items-center gap-2 group/mod">
                          <div className="w-5 h-5 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100 group-hover/mod:bg-indigo-50 group-hover/mod:border-indigo-100 transition-colors">
                            <BookOpen className="w-2.5 h-2.5 text-gray-400 group-hover/mod:text-indigo-600" />
                          </div>
                          <span className="text-[11px] font-bold text-gray-400 group-hover/mod:text-gray-700 transition-colors line-clamp-1">
                            {idx + 1}. {module.title}
                          </span>
                        </div>
                      ))}
                      {skill.modules.length > 3 && (
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest pl-7">
                          + {skill.modules.length - 3} More Modules
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Learning Path</span>
                        <span className="text-xs font-black text-gray-900">{skill.modules.length} Intensive Modules</span>
                      </div>
                      <Link to={`/skills/${skill.id}`} className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all group-hover:scale-105 shadow-xl shadow-gray-200">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
