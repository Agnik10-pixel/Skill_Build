import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Navbar from '../components/Navbar';
import { Users, FileCheck, Target } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Navigate } from 'react-router';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    
    Promise.all([
      api.getAdminStats(),
      api.fetchJSON('/api/admin/users')
    ])
    .then(([statsData, usersData]) => {
      setStats(statsData);
      setUsers(usersData);
    })
    .finally(() => setLoading(false));
  }, [user]);

  if (authLoading) return <div>Loading...</div>;
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">Admin Workspace</h1>
            <p className="text-gray-600 mt-2">Manage users and track platform engagement.</p>
          </div>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Admin role active</span>
        </header>

        {loading ? <div>Loading...</div> : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border p-6 flex flex-col items-center justify-center text-center">
                <Users className="w-8 h-8 text-indigo-600 mb-2" />
                <p className="text-sm text-gray-500 font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalUsers}</p>
              </div>
              <div className="bg-white rounded-xl border p-6 flex flex-col items-center justify-center text-center">
                <Target className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm text-gray-500 font-medium">Modules Completed</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalProgress}</p>
              </div>
              <div className="bg-white rounded-xl border p-6 flex flex-col items-center justify-center text-center">
                <FileCheck className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm text-gray-500 font-medium">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalSubmissions}</p>
              </div>
            </div>

            <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="font-bold text-gray-800">User Growth</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Username</th>
                      <th className="px-6 py-3">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u: any) => (
                      <tr key={u.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-gray-500">{u.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{u.username}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
