import { useStudy } from '../src/context/useStudy.js'
import { FaBook, FaCheckCircle, FaClock, FaFire, FaGraduationCap } from 'react-icons/fa'

export default function Dashboard() {
  const { tasks, getTodayStats } = useStudy()
  const stats = getTodayStats()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const pendingTasks = tasks.filter(t => !t.completed)
  const completionRate = tasks.length ? Math.round((stats.tasksCompleted / tasks.length) * 100) : 0

  const cards = [
    { label: 'Study Time', value: `${stats.studyMinutes}m`, icon: FaClock, gradient: 'from-blue-500 to-cyan-500' },
    { label: "Today's Sessions", value: stats.pomodoroSessions, icon: FaFire, gradient: 'from-orange-500 to-red-500' },
    { label: 'Tasks Done', value: stats.tasksCompleted, icon: FaCheckCircle, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Total Tasks', value: stats.totalTasks, icon: FaBook, gradient: 'from-purple-500 to-pink-500' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <FaGraduationCap />
            </span>
            {greeting}, Student!
          </h1>
          <p className="text-gray-400 mt-1 ml-13">{today}</p>
        </div>
        {tasks.length > 0 && (
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="url(#grad)" strokeWidth="3" strokeDasharray={`${completionRate}, 100`} strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-600">{completionRate}%</span>
            </div>
            <div className="text-sm">
              <p className="text-gray-500">Completion</p>
              <p className="font-semibold text-gray-800">{stats.tasksCompleted}/{tasks.length} tasks</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(({ label, value, icon: Icon, gradient }, i) => (
          <div key={label} className="card-hover bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-slideUp" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white shadow-sm`}>
                <Icon className="text-lg" />
              </div>
              {label === 'Tasks Done' && tasks.length > 0 && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${completionRate >= 50 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {completionRate}%
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 card-hover">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full" />
            Pending Tasks
          </h2>
          {pendingTasks.length === 0 ? (
            <div className="text-center py-8">
              <FaCheckCircle className="text-4xl text-green-300 mx-auto mb-2" />
              <p className="text-gray-400">All caught up! Great job!</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {pendingTasks.slice(0, 5).map((task, i) => (
                <li key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-indigo-50/50 transition-colors animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
                  <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                    task.priority === 'high' ? 'bg-red-400 shadow-red-200' :
                    task.priority === 'medium' ? 'bg-amber-400 shadow-amber-200' :
                    'bg-green-400 shadow-green-200'
                  }`} />
                  <span className="text-gray-700 font-medium">{task.title}</span>
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-600 font-medium">{task.subject}</span>
                </li>
              ))}
            </ul>
          )}
          {pendingTasks.length > 5 && (
            <p className="text-sm text-indigo-500 mt-3 text-center">+{pendingTasks.length - 5} more tasks</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 card-hover">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            Quick Tips
          </h2>
          <ul className="space-y-3">
            {[
              'Break your study time into 25-minute Pomodoro sessions',
              'Review what you learned within 24 hours',
              'Stay hydrated and take short breaks',
            ].map((tip, i) => (
              <li key={i} className="flex gap-3 p-3 bg-amber-50 rounded-xl text-sm text-amber-800">
                <span className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-amber-600 text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
