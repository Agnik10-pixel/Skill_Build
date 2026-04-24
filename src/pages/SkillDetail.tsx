import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { api } from '../lib/api';
import Navbar from '../components/Navbar';
import { CheckCircle2, Circle, ArrowRight, Award, Heart, Presentation } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { getSkillIcon } from '../lib/utils';
import { motion } from 'motion/react';

export default function SkillDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [skill, setSkill] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskContent, setTaskContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;
    const promises: [Promise<any[]>, Promise<any[]>, Promise<string[]>] = [
      api.getSkills(),
      user ? api.getProgress() : Promise.resolve([]),
      user ? api.getFavorites() : Promise.resolve([])
    ];

    Promise.all(promises)
      .then(([skillsData, progressData, favoritesData]) => {
        const found = skillsData.find(s => s.id === id);
        setSkill(found);
        setProgress(progressData.filter(p => p.skillId === id));
        setIsFavorited(favoritesData.includes(id));
      })
      .finally(() => setLoading(false));
  }, [id, user]);

  if (loading) return (
     <div className="min-h-screen bg-[#fafafa] flex flex-col">
       <Navbar />
       <div className="flex-1 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
    </div>
  );
  if (!skill) return <div className="p-8 text-center text-gray-500 font-medium">Skill not found.</div>;

  const handleToggleFavorite = async () => {
    if (!user) return alert('Please log in first.');
    try {
      const result = await api.toggleFavorite(skill.id);
      setIsFavorited(result.favorited);
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    }
  };

  const handleMarkComplete = async (moduleId: string) => {
    if (!user) return alert('Please log in first.');
    await api.markModuleComplete(skill.id, moduleId);
    setProgress(prev => [...prev, { skillId: skill.id, moduleId, completedAt: new Date().toISOString() }]);
  };

  const isModuleComplete = (moduleId: string) => {
    return progress.some(p => p.moduleId === moduleId);
  };

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskContent.trim()) return;
    setSubmitting(true);
    try {
      await api.submitTask(skill.id, `Final task for ${skill.title}`, taskContent);
      setSubmitted(true);
      setTaskContent('');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const completedCount = progress.length;
  const totalCount = skill.modules.length;
  const isFullyComplete = completedCount === totalCount;
  const percent = Math.round((completedCount / totalCount) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      
      {/* Vibrant Hero Header */}
      <div className="bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 pointer-events-none"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-60"></div>
        
        <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
           <div className="flex justify-between items-center mb-6">
              <Link to="/skills" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 transition-colors bg-indigo-50 px-3 py-1.5 rounded-full">
                 &larr; Back to catalog
              </Link>
              {user && (
                <button 
                  onClick={handleToggleFavorite}
                  className={`p-2.5 rounded-2xl shadow-sm border transition-all duration-300 ${
                    isFavorited 
                      ? 'bg-red-50 text-red-500 border-red-100' 
                      : 'bg-white text-gray-400 border-gray-100 hover:text-red-500 hover:border-red-100'
                  }`}
                >
                  <Heart className={`w-6 h-6 transition-transform duration-300 ${isFavorited ? 'fill-current scale-110' : 'hover:scale-110'}`} />
                </button>
              )}
           </div>
           <div className="flex flex-col md:flex-row md:items-center gap-8 mt-4">
              <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-3xl p-5 shadow-xl shadow-gray-200/50 border border-gray-100 flex-shrink-0 animate-[blob_5s_ease-in-out_infinite] scale-100">
                  <img src={getSkillIcon(skill.title)} alt={`${skill.title} logo`} className="w-full h-full object-contain filter drop-shadow-md" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">{skill.title}</h1>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl font-medium leading-relaxed">{skill.description}</p>
                
                {user && (
                  <div className="mt-8">
                    <div className="flex items-center justify-between max-w-md mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-100 rounded-lg">
                          <Presentation className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">Learning Progress</span>
                      </div>
                      <span className="text-sm font-black text-indigo-600">{percent}%</span>
                    </div>
                    <div className="flex items-center gap-4 max-w-md">
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-50 shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                        />
                      </div>
                      <div className="text-xs font-black text-gray-400 whitespace-nowrap">
                        {completedCount} / {totalCount}
                      </div>
                    </div>
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
            <Award className="w-32 h-32 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Certification Criteria</span>
          </h2>
          <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
            <p className="text-gray-700 font-medium leading-relaxed">
              {skill.certificationCriteria}
            </p>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Learning Path</span>
          </h2>
          <div className="space-y-4">
            {skill.modules.map((mod: any, idx: number) => {
              const completed = isModuleComplete(mod.id);
              return (
                <div key={mod.id} className={`flex items-center justify-between p-5 border rounded-2xl transition-all duration-300 ${completed ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50/50 border-gray-100 hover:border-indigo-200 hover:bg-white hover:shadow-md hover:shadow-indigo-500/10'}`}>
                  <div className="flex items-center gap-5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${completed ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-200 text-gray-600'}`}>
                        {idx + 1}
                    </div>
                    <span className={`text-lg transition-colors ${completed ? 'text-gray-500 font-medium line-through' : 'text-gray-900 font-bold'}`}>{mod.title}</span>
                  </div>
                  {completed ? (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> Done
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleMarkComplete(mod.id)}
                      className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 px-4 py-2 rounded-full transition-colors"
                    >
                      <Circle className="w-4 h-4 pointer-events-none" /> Mark complete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {user && isFullyComplete && (
          <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100 p-8 shadow-inner shadow-white">
            <div className="absolute -top-10 -right-10 text-[150px] opacity-5 pointer-events-none">🏆</div>
            <h2 className="text-2xl font-extrabold text-indigo-900 mb-2">Final Assignment</h2>
            <p className="text-indigo-700 font-medium mb-6">You've mastered all modules! Submit your final capstone project to earn your certificate.</p>
            
            {submitted ? (
              <div className="bg-emerald-100 text-emerald-800 p-6 rounded-2xl border border-emerald-200 flex gap-4 items-start shadow-sm">
                <div className="p-2 bg-emerald-200 rounded-full mt-0.5"><CheckCircle2 className="w-6 h-6" /></div>
                <div>
                  <p className="font-extrabold text-lg">Project submitted successfully!</p>
                  <p className="font-medium mt-1">Our instructors will review your code shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitTask} className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-indigo-50">
                <label className="block text-sm font-bold text-gray-700">Project Repository URL / Code</label>
                <textarea 
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                  required
                  rows={4}
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl border border-gray-200 p-4 font-medium text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                />
                <button type="submit" disabled={submitting} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-md shadow-indigo-500/25">
                  {submitting ? 'Submitting...' : 'Submit Project'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
