import { useStudy } from '../src/context/useStudy.js'
import { FaClock, FaFire, FaCheckCircle, FaBook, FaChartBar } from 'react-icons/fa'

export default function Analytics() {
  const { tasks, pomodoroLog, studyLog } = useStudy()

  const totalPomodoro = pomodoroLog.reduce((sum, p) => sum + p.sessions, 0)
  const totalStudyMinutes = studyLog.reduce((sum, s) => sum + s.minutes, 0)
  const completedTasks = tasks.filter(t => t.completed).length

  const subjectMinutes = studyLog.reduce((acc, s) => {
    acc[s.subject] = (acc[s.subject] || 0) + s.minutes
    return acc
  }, {})

  const sortedSubjects = Object.entries(subjectMinutes).sort((a, b) => b[1] - a[1])
  const maxMinutes = sortedSubjects.length > 0 ? Math.max(...sortedSubjects.map(([, m]) => m)) : 1

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toISOString().split('T')[0]
  }).reverse()

  const dailyMinutes = last7Days.map(date => {
    const dayLog = studyLog.filter(s => s.date === date)
    return dayLog.reduce((sum, s) => sum + s.minutes, 0)
  })

  const maxDaily = Math.max(...dailyMinutes, 1)

  const stats = [
    { label: 'Total Study Time', value: `${totalStudyMinutes}m`, icon: FaClock, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Pomodoro Sessions', value: totalPomodoro, icon: FaFire, gradient: 'from-orange-500 to-red-500' },
    { label: 'Tasks Completed', value: completedTasks, icon: FaCheckCircle, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Subjects Studied', value: Object.keys(subjectMinutes).length || 0, icon: FaBook, gradient: 'from-purple-500 to-pink-500' },
  ]

  const subjectGradients = {
    'Mathematics': 'from-indigo-500 to-purple-600',
    'Science': 'from-emerald-500 to-teal-600',
    'English': 'from-blue-500 to-cyan-500',
    'History': 'from-amber-500 to-orange-600',
    'Computer Science': 'from-violet-500 to-fuchsia-600',
    'Other': 'from-gray-500 to-slate-600',
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
          <FaChartBar />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-400 text-sm mt-0.5">Track your study progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, gradient }, i) => (
          <div key={label} className="card-hover bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-slideUp" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white shadow-sm`}>
                <Icon className="text-lg" />
              </div>
            </div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 card-hover">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full" />
            Last 7 Days
          </h2>
          <div className="flex items-end gap-2 h-48">
            {dailyMinutes.map((m, i) => {
              const height = (m / maxDaily) * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-xs text-gray-400 font-medium">{m}m</span>
                  <div className="w-full relative" style={{ height: `${Math.max(height, 2)}%` }}>
                    <div
                      className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-indigo-400 transition-all duration-500 hover:from-indigo-600 hover:to-indigo-500 cursor-pointer"
                      style={{ height: '100%' }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(last7Days[i]).toLocaleDateString('en', { weekday: 'short' })}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 card-hover">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            By Subject
          </h2>
          {sortedSubjects.length === 0 ? (
            <div className="text-center py-12">
              <FaBook className="text-4xl text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">No study data yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedSubjects.map(([subject, minutes]) => {
                const width = (minutes / maxMinutes) * 100
                const grad = subjectGradients[subject] || 'from-gray-500 to-slate-600'
                return (
                  <div key={subject}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-700 font-medium">{subject}</span>
                      <span className="text-gray-500">{minutes}m</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${grad} transition-all duration-700`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
