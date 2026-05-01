import express from 'express';
import { createServer as createViteServer } from 'vite';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Set up sessions for simple auth
app.use(session({
  secret: process.env.SESSION_SECRET || 'skillsbuild-secret-key-123',
  resave: false,
  saveUninitialized: false,
}));

// Mock Database
interface User { id: string; username: string; role: 'user' | 'admin' }
interface Skill { id: string; title: string; description: string; category: string; modules: Module[]; certificationCriteria: string }
interface Module { id: string; title: string }
interface Progress { userId: string; skillId: string; moduleId: string; completedAt: string }
interface Submission { id: string; userId: string; skillId: string; taskDescription: string; content: string; status: 'pending' | 'reviewed' }
interface WeeklyTest { skillId: string; title: string; level: 'Easy' | 'Intermediate' | 'Difficult' }

interface Favorite { userId: string; skillId: string }

const db = {
  users: [
    { id: 'u_alice', username: 'Alice', role: 'user' },
    { id: 'u_bob', username: 'Bob', role: 'user' },
    { id: 'u_charlie', username: 'Charlie', role: 'user' }
  ] as User[],
  skills: (() => {
    const categories = [
      { name: 'Web Development', icon: 'html', tech: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte', 'Tailwind CSS', 'Bootstrap', 'Node.js', 'Express.js', 'FastAPI', 'GraphQL', 'REST API', 'Web Performance', 'Progressive Web Apps'] },
      { name: 'Mobile Development', icon: 'swift', tech: ['iOS Development (Swift)', 'Android Development (Kotlin)', 'React Native', 'Flutter', 'Ionic Framework', 'Mobile UI/UX Design', 'App Store Optimization'] },
      { name: 'Programming Languages', icon: 'python', tech: ['Python Programming', 'Java Masterclass', 'C++ Mastery', 'C Programming', 'C# & .NET', 'Ruby on Rails', 'Go (Golang)', 'Rust Programming', 'PHP Essentials', 'Scala', 'Dart', 'Lua', 'Haskell', 'Perl', 'Julia'] },
      { name: 'Data Science & AI', icon: 'python', tech: ['Machine Learning', 'Deep Learning', 'Data Analysis with Python', 'R for Data Science', 'Big Data Engineering', 'Natural Language Processing', 'Computer Vision', 'Generative AI', 'Statistics for Data Science', 'Tableau Mastery', 'Power BI Dashboarding'] },
      { name: 'Cloud & DevOps', icon: 'cloud', tech: ['AWS Cloud Practitioner', 'Azure Fundamentals', 'Google Cloud Platform', 'Docker Containerization', 'Kubernetes Orchestration', 'CI/CD Pipelines', 'Terraform (IaC)', 'Ansible Automation', 'Site Reliability Engineering'] },
      { name: 'Database Management', icon: 'database', tech: ['SQL & Relational DBs', 'MySQL In-Depth', 'PostgreSQL Advanced', 'MongoDB Essentials', 'Redis Caching', 'Cassandra Administration', 'Elasticsearch Mastery', 'Database Security'] },
      { name: 'Cybersecurity', icon: 'shield', tech: ['Ethical Hacking', 'Network Security', 'Information Security', 'Penetration Testing', 'Cloud Security', 'Cryptography Basics', 'Governance & Risk Management'] },
      { name: 'Software Engineering', icon: 'layers', tech: ['Data Structures & Algorithms', 'System Design', 'Microservices Architecture', 'Design Patterns', 'Test Driven Development', 'Clean Code Principles', 'Agile & Scrum', 'Git & GitHub Mastery'] },
      { name: 'Game Development', icon: 'unity', tech: ['Unity 3D Engine', 'Unreal Engine 5', 'Godot Engine', '2D Game Design', 'C# for Games', 'C++ for Games', 'Game Physics', 'Blender 3D Modeling'] },
      { name: 'Specialized Tech', icon: 'blockchain', tech: ['Blockchain & Web3', 'Solidity Development', 'Internet of Things (IoT)', 'Embedded Systems', 'Quantum Computing', 'AR/VR Development'] }
    ];

    const generatedSkills: Skill[] = [];
    let idCounter = 1;

    categories.forEach(cat => {
      cat.tech.forEach(techName => {
        const id = `s${idCounter++}`;
        const moduleCount = 15 + Math.floor(Math.random() * 6); // 15 to 20 modules
        const modules = Array.from({ length: moduleCount }, (_, i) => ({
          id: `m${i + 1}`,
          title: i === 0 ? `${techName} Fundamentals` : i === moduleCount - 1 ? `Final ${techName} Project` : `Advanced ${techName} Lesson ${i + 1}`
        }));

        generatedSkills.push({
          id,
          title: techName,
          description: `Master ${techName} with our comprehensive, hands-on curriculum designed for all skill levels from beginner to advanced. Includes ${moduleCount} intensive sessions.`,
          category: cat.name,
          modules,
          certificationCriteria: `Successfully complete all ${moduleCount} modules for ${techName} and pass the final practical evaluation by building a functional application or system.`
        });
      });
    });

    // Add more specific categories for original specificSkills
    const designSkills = ['Figma UI Design', 'Adobe XD for Web', 'User Research', 'A/B Testing'];
    const businessSkills = ['Digital Marketing', 'SEO Fundamentals', 'Freelancing 101', 'Startup Growth', 'Product Management', 'Content Strategy'];
    const devToolSkills = ['Technical Writing', 'Public Speaking for Devs', 'Linux Administration', 'Shell Scripting', 'Vim Mastery', 'Emacs Workflow'];
    const advancedWebSkills = ['Redux State Management', 'Zustand Mastery', 'Prisma ORM', 'Drizzle ORM', 'Firebase Backend', 'Supabase Essentials', 'Clerk Authentication', 'Stripe Integration'];

    const addSpecific = (titles: string[], catName: string) => {
      titles.forEach(title => {
        const id = `s${idCounter++}`;
        const moduleCount = 10 + Math.floor(Math.random() * 5); // 10 to 14 modules
        const modules = Array.from({ length: moduleCount }, (_, i) => ({
          id: `m${i + 1}`,
          title: i === 0 ? `Intro to ${title}` : `Mastery Lesson ${i + 1}`
        }));

        generatedSkills.push({
          id,
          title,
          description: `Deep dive into ${title} and become an expert in modern industry practices and tools. Includes ${moduleCount} focused lessons.`,
          category: catName,
          modules,
          certificationCriteria: `Demonstrate mastery of ${title} through practical assignments and a portfolio project.`
        });
      });
    };

    addSpecific(designSkills, 'Design');
    addSpecific(businessSkills, 'Business');
    addSpecific(devToolSkills, 'Development Tools');
    addSpecific(advancedWebSkills, 'Web Development');

    return generatedSkills;
  })(),
  badges: [
    { id: 'b1', name: 'Python Prodigy', icon: 'Python', criteria: 'Complete all Python modules with high scores', color: 'blue' },
    { id: 'b2', name: 'Java Giant', icon: 'Java', criteria: 'Master the Java Fundamentals course', color: 'orange' },
    { id: 'b3', name: 'JS Ninja', icon: 'Javascript', criteria: 'Complete Advanced JavaScript concepts', color: 'yellow' },
    { id: 'b4', name: 'Cloud Archer', icon: 'Cloud', criteria: 'Successfully finish 3 Cloud-related courses', color: 'indigo' },
    { id: 'b5', name: 'Security Sentinel', icon: 'Shield', criteria: 'Complete Cybersecurity and Ethical Hacking', color: 'red' },
    { id: 'b6', name: 'Database Dean', icon: 'Database', criteria: 'Master SQL, MongoDB, and PostgreSQL', color: 'cyan' },
    { id: 'b7', name: 'Full-Stack Hero', icon: 'Layers', criteria: 'Complete the entire MERN stack path', color: 'purple' },
    { id: 'b8', name: 'Early Bird', icon: 'Sun', criteria: 'Complete 5 modules before 9 AM', color: 'amber' }
  ],
  progress: [
    { userId: 'u_alice', skillId: 's1', moduleId: 'm1', completedAt: '2024-01-01' },
    { userId: 'u_alice', skillId: 's1', moduleId: 'm2', completedAt: '2024-01-02' },
    { userId: 'u_bob', skillId: 's3', moduleId: 'm1', completedAt: '2024-01-03' }
  ] as Progress[],
  submissions: [] as Submission[],
  favorites: [] as Favorite[],
};

// Generate Weekly Tests for all 54 skills
const weeklyTests: WeeklyTest[] = [];
db.skills.forEach(skill => {
  weeklyTests.push({ skillId: skill.id, title: `${skill.title} Weekly Challenge (Easy)`, level: 'Easy' });
  weeklyTests.push({ skillId: skill.id, title: `${skill.title} Weekly Challenge (Intermediate)`, level: 'Intermediate' });
  weeklyTests.push({ skillId: skill.id, title: `${skill.title} Weekly Challenge (Difficult)`, level: 'Difficult' });
});

// -- API Routes --

// Additional Routes for New Features

app.get('/api/leaderboard', (req, res) => {
  // Simple leaderboard: count completed modules per user
  const leaderboard = db.users.map(user => {
    const score = db.progress.filter(p => p.userId === user.id).length;
    return { id: user.id, username: user.username, score };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 10);
  
  res.json(leaderboard);
});

app.get('/api/weekly-tests', (req, res) => {
  res.json(weeklyTests);
});

app.get('/api/certificates', (req: any, res: any) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  const userId = req.session.userId;
  
  // A certificate is earned if all modules of a skill are completed
  const certificates = db.skills.filter(skill => {
    const skillModules = skill.modules.map(m => m.id);
    const completedModules = db.progress
      .filter(p => p.userId === userId && p.skillId === skill.id)
      .map(p => p.moduleId);
    
    return skillModules.every(mId => completedModules.includes(mId));
  }).map(skill => ({
    id: `cert_${skill.id}_${userId}`,
    skillId: skill.id,
    skillTitle: skill.title,
    issuedAt: new Date().toISOString()
  }));

  res.json(certificates);
});

app.get('/api/badges', (req, res) => {
  res.json(db.badges);
});

// Favorites Routes
app.get('/api/favorites', (req: any, res: any) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  const userFavorites = db.favorites
    .filter(f => f.userId === req.session.userId)
    .map(f => f.skillId);
  res.json(userFavorites);
});

app.post('/api/favorites/toggle', (req: any, res: any) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  const { skillId } = req.body;
  const userId = req.session.userId;
  
  const index = db.favorites.findIndex(f => f.userId === userId && f.skillId === skillId);
  if (index > -1) {
    db.favorites.splice(index, 1);
    res.json({ favorited: false });
  } else {
    db.favorites.push({ userId, skillId });
    res.json({ favorited: true });
  }
});

// -- API Routes --

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { username, role = 'user' } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });
  
  let user = db.users.find(u => u.username === username);
  if (!user) {
    user = { id: `u${Date.now()}`, username, role };
    db.users.push(user);
  }
  
  // @ts-ignore
  req.session.userId = user.id;
  res.json({ message: 'Registered successfully', user });
});

app.post('/api/auth/login', (req, res) => {
  const { username } = req.body;
  const user = db.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'User not found' });
  
  // @ts-ignore
  req.session.userId = user.id;
  res.json({ message: 'Logged in successfully', user });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
});

app.get('/api/me', (req, res) => {
  // @ts-ignore
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });
  const user = db.users.find(u => u.id === userId);
  res.json({ user });
});

// Middleware for requiring auth
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  req.userId = req.session.userId;
  next();
};

const requireAdmin = (req: any, res: any, next: any) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = db.users.find(u => u.id === req.session.userId);
  if (user?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  next();
};

// Skills Data
app.get('/api/skills', (req, res) => {
  res.json(db.skills);
});

// User Progress
app.get('/api/progress', requireAuth, (req: any, res: any) => {
  const userProgress = db.progress.filter(p => p.userId === req.userId);
  res.json(userProgress);
});

app.post('/api/progress', requireAuth, (req: any, res: any) => {
  const { skillId, moduleId } = req.body;
  const existing = db.progress.find(p => p.userId === req.userId && p.skillId === skillId && p.moduleId === moduleId);
  if (!existing) {
    db.progress.push({
      userId: req.userId,
      skillId,
      moduleId,
      completedAt: new Date().toISOString()
    });
  }
  res.json({ success: true });
});

// Task Submissions
app.post('/api/submissions', requireAuth, (req: any, res: any) => {
  const { skillId, taskDescription, content } = req.body;
  const submission: Submission = {
    id: `sub${Date.now()}`,
    userId: req.userId,
    skillId,
    taskDescription,
    content,
    status: 'pending'
  };
  db.submissions.push(submission);
  res.json({ success: true, submission });
});

// Admin Routes
app.get('/api/admin/users', requireAdmin, (req, res) => {
  res.json(db.users);
});

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  res.json({
    totalUsers: db.users.length,
    totalSubmissions: db.submissions.length,
    totalProgress: db.progress.length
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files from dist
    app.use(express.static(path.join(process.cwd(), 'dist')));
  }

  // Catch-all for SPA routing - must be after static files
  app.get('*', (req, res) => {
    if (process.env.NODE_ENV === "production") {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    }
  });

  const port = process.env.PORT || PORT;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();

// Export for Vercel Serverless
export default app;
