import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';
import { Link } from 'react-router';
import { CheckCircle2, BookOpen, Presentation, Sparkles, Trophy, Award, Calendar, ChevronRight, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getSkillIcon } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Dashboard() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [weeklyTests, setWeeklyTests] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [testLevelFilter, setTestLevelFilter] = useState<'All' | 'Easy' | 'Intermediate' | 'Difficult'>('All');
  const [hoveredBadgeId, setHoveredBadgeId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api.getSkills(), 
      api.getProgress(),
      api.getLeaderboard(),
      api.getWeeklyTests(),
      api.getCertificates(),
      api.getBadges(),
      api.getFavorites()
    ])
      .then(([skillsData, progressData, leaderboardData, testsData, certsData, badgesData, favoritesData]) => {
        setSkills(skillsData);
        setProgress(progressData);
        setLeaderboard(leaderboardData);
        setWeeklyTests(testsData);
        setCertificates(certsData);
        setBadges(badgesData);
        setFavorites(favoritesData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
       <Navbar />
       <div className="flex-1 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
    </div>
  );

  const completedModules = progress.length;
  const enrolledSkills = skills.filter(skill => progress.some(p => p.skillId === skill.id));
  const filteredTests = testLevelFilter === 'All' 
    ? weeklyTests 
    : weeklyTests.filter(t => t.level === testLevelFilter);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col relative pb-20">
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 via-white to-transparent pointer-events-none"></div>
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{user?.username}</span>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">Ready to continue your learning journey?</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stat Card 1 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex items-center gap-5 shadow-xl shadow-indigo-100/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-indigo-200 relative z-10">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="relative z-10">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Enrolled Skills</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{enrolledSkills.length}</p>
            </div>
          </div>
          {/* Stat Card 2 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex items-center gap-5 shadow-xl shadow-green-100/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
            <div className="p-4 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl shadow-lg shadow-emerald-200 relative z-10">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="relative z-10">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Modules Done</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{completedModules}</p>
            </div>
          </div>
          {/* Stat Card 3 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex items-center gap-5 shadow-xl shadow-pink-100/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-50 to-rose-50 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
            <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl shadow-lg shadow-pink-200 relative z-10">
              <Award className="w-7 h-7" />
            </div>
            <div className="relative z-10">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Certificates</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{certificates.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Learning Progress & Certificates */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Active Learning */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Your Active Learning</h2>
                <Link to="/skills" className="text-sm font-bold text-indigo-600 hover:underline">Browse all courses</Link>
              </div>
              {enrolledSkills.length === 0 ? (
                <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-dashed border-gray-300 p-12 text-center text-gray-600">
                  <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                  <p className="mb-4 text-lg font-medium">You haven't started any skills yet.</p>
                  <Link to="/skills" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-lg">
                    Explore The Catalog &rarr;
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledSkills.map(skill => {
                    const completed = progress.filter(p => p.skillId === skill.id).length;
                    const total = skill.modules.length;
                    const percent = Math.round((completed / total) * 100);

                    return (
                      <div key={skill.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col hover:border-indigo-200 transition-all group">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-2 bg-gray-50 rounded-xl border border-gray-100 group-hover:scale-105 transition-transform">
                            <img src={getSkillIcon(skill.title)} alt={skill.title} className="h-10 w-10 object-contain" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-extrabold text-lg text-gray-900 leading-tight">{skill.title}</h3>
                            <p className="text-gray-500 text-xs mt-0.5 font-medium">{total} Modules Total</p>
                          </div>
                        </div>
                        
                        <div className="mt-auto">
                          <div className="flex justify-between text-xs mb-1.5 font-bold">
                            <span className="text-gray-600">Progress</span>
                            <span className="text-indigo-600">{percent}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                          </div>
                          <Link to={`/skills/${skill.id}`} className="block w-full py-2 text-center text-xs font-bold border border-gray-200 rounded-xl hover:bg-gray-900 hover:text-white transition-all">
                            Continue Learning
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>

            {/* Favorites Section */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl shadow-gray-200/20">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500 fill-current" />
                    Your Favorites
                  </h2>
                  <p className="text-gray-500 text-sm font-medium mt-1">Skills you've saved for later</p>
                </div>
                <Link to="/skills" className="text-xs font-bold text-indigo-600 hover:underline bg-indigo-50 px-3 py-1.5 rounded-full">
                  Explore More
                </Link>
              </div>
              
              {favorites.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-400">
                  <p className="font-medium text-sm">You haven't favorited any skills yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {skills.filter(s => favorites.includes(s.id)).map(skill => (
                    <div key={skill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:border-red-100 transition-all group">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-2 flex-shrink-0 shadow-sm border border-gray-50">
                          <img src={getSkillIcon(skill.title)} alt={skill.title} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-gray-800 truncate">{skill.title}</h4>
                          <p className="text-[10px] text-gray-400 font-medium truncate">{skill.modules.length} Modules</p>
                        </div>
                      </div>
                      <Link to={`/skills/${skill.id}`} className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all shadow-sm">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Weekly Tests Section */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl shadow-gray-200/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-orange-500" />
                    Weekly Challenges
                  </h2>
                  <p className="text-gray-500 text-sm font-medium mt-1">Challenge yourself with quick assessments</p>
                </div>
                <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-200">
                  {['All', 'Easy', 'Intermediate', 'Difficult'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setTestLevelFilter(lvl as any)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${testLevelFilter === lvl ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredTests.slice(0, 20).map((test, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:border-indigo-200 transition-all group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        test.level === 'Easy' ? 'bg-green-100 text-green-700' :
                        test.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{test.title}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{test.level}</span>
                      </div>
                    </div>
                    <Link to="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Portfolio Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                  <Award className="w-7 h-7 text-yellow-500" />
                  Your Portfolio & Certifications
                </h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{certificates.length} Earned</span>
              </div>

              {/* Specific Certification Links (Python, Java, all 56) */}
              <div className="mb-10">
                <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Earn Featured Certificates</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Python Certificate Link */}
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:border-blue-200 transition-all group">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                       <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-8 h-8" alt="Python" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Python Specialist</h4>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">Master Python from basics to professional automation.</p>
                    <Link to="/skills/s1" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                      View Certificate Criteria <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Java Certificate Link */}
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:border-orange-200 transition-all group">
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                       <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" className="w-8 h-8" alt="Java" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Java Professional</h4>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">Enterprise-grade application development with Java.</p>
                    <Link to="/skills/s2" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
                      View Certificate Criteria <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* All 56 Certs Summary */}
                  <div className="bg-gradient-to-br from-gray-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl shadow-gray-200 relative overflow-hidden group">
                    <Sparkles className="absolute top-4 right-4 w-12 h-12 text-white/10" />
                    <div className="relative z-10">
                      <h4 className="font-black text-xl mb-1">56 Paths</h4>
                      <p className="text-[10px] text-white/60 mb-4 font-bold uppercase tracking-widest">Master All Skills</p>
                      <p className="text-xs text-indigo-100 mb-4">Unlock official certifications for all 56 specialized learning paths.</p>
                      <Link to="/skills" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white px-3 py-2 rounded-xl text-[10px] font-bold text-white hover:text-gray-900 transition-all border border-white/20">
                        Browse Full Catalog <Trophy className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {certificates.length === 0 ? (
                <div className="bg-gray-50/50 rounded-3xl border border-gray-100 p-10 text-center border-dashed">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
                    <Award className="w-8 h-8 text-gray-200" />
                  </div>
                  <p className="text-gray-500 font-medium text-sm">Your earned certificates will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {certificates.map(cert => (
                    <div key={cert.id} className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
                      <div className="relative z-10 flex flex-col h-full">
                        <Award className="w-10 h-10 text-yellow-400 mb-4" />
                        <h4 className="text-xl font-black mb-1">{cert.skillTitle}</h4>
                        <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">Official SkillsBuild Certification</p>
                        <div className="mt-8 pt-4 border-t border-white/20 flex justify-between items-end">
                           <div className="text-[10px] text-indigo-300">
                              <p>ID: {cert.id.toUpperCase()}</p>
                              <p>Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                           </div>
                           <button className="bg-white/20 hover:bg-white hover:text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">Download PDF</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Leaderboard & Badges */}
          <div className="space-y-8">
            {/* Leaderboard Section */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl shadow-gray-200/20">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Leaders
              </h2>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => {
                  const isUser = entry.id === user?.id;
                  return (
                    <div 
                      key={entry.id} 
                      className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                        isUser ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-[1.02]' : 'bg-gray-50 border border-gray-50 hover:bg-white hover:border-indigo-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                          index === 0 ? 'bg-yellow-400 text-yellow-900' :
                          index === 1 ? 'bg-gray-200 text-gray-600' :
                          index === 2 ? 'bg-orange-200 text-orange-900' :
                          isUser ? 'bg-white/20 text-white' : 'bg-white text-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${isUser ? 'text-white' : 'text-gray-800'}`}>
                            {entry.username.split(' ')[0]}
                          </p>
                          <p className={`text-[10px] font-bold uppercase tracking-wider ${isUser ? 'text-indigo-200' : 'text-gray-400'}`}>
                            {entry.score} pts
                          </p>
                        </div>
                      </div>
                      {index === 0 && <Award className="w-4 h-4 text-yellow-400" />}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Badges & Criteria Section */}
            <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl shadow-gray-200/20">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                 <Sparkles className="w-5 h-5 text-indigo-500" />
                 Quest Badges
              </h2>
              <div className="space-y-5">
                {badges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className="group relative"
                    onMouseEnter={() => setHoveredBadgeId(badge.id)}
                    onMouseLeave={() => setHoveredBadgeId(null)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 flex-shrink-0 rounded-2xl bg-${badge.color}-50 flex items-center justify-center border border-${badge.color}-100 group-hover:scale-110 transition-transform`}>
                        <Award className={`w-6 h-6 text-${badge.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{badge.name}</h4>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5 leading-relaxed">
                          {badge.criteria}
                        </p>
                      </div>
                    </div>
                    {/* Progress Bar (Example for criteria) */}
                    <div className="mt-3 w-full bg-gray-50 rounded-full h-1 overflow-hidden">
                       <div className={`bg-${badge.color}-500/30 h-full w-[25%]`}></div>
                    </div>

                    <AnimatePresence>
                      {hoveredBadgeId === badge.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute z-50 bottom-full left-0 mb-3 w-64 bg-gray-900 text-white p-4 rounded-2xl shadow-2xl pointer-events-none border border-gray-800"
                        >
                          <div className="flex items-center gap-2 mb-2">
                             <Award className={`w-4 h-4 text-${badge.color}-400`} />
                             <h4 className="font-black text-xs uppercase tracking-wider">{badge.name}</h4>
                          </div>
                          <p className="text-[10px] text-gray-300 font-medium leading-relaxed">
                            {badge.criteria}
                          </p>
                          <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-gray-900 border-r border-b border-gray-800 transform rotate-45"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                 <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                    <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                       <Sparkles className="w-3 h-3" />
                       Pro Tip
                    </p>
                    <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                       Collecting 5 badges unlocks the <span className="font-bold underline">Master Scholar</span> title and global profile badge.
                    </p>
                 </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
