import { NavLink } from 'react-router-dom'
import { FaHome, FaBook, FaChartBar, FaClock, FaRobot } from 'react-icons/fa'

const links = [
  { to: '/', label: 'Dashboard', icon: FaHome },
  { to: '/plans', label: 'Planner', icon: FaBook },
  { to: '/progress', label: 'Analytics', icon: FaChartBar },
  { to: '/pomodoro', label: 'Pomodoro', icon: FaClock },
  { to: '/chat', label: 'Assistant', icon: FaRobot },
]

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-indigo-900 via-indigo-950 to-purple-950 text-white p-6 flex flex-col shadow-2xl z-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 pointer-events-none" />

      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-3">
          <span className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <FaBook className="text-indigo-300 text-sm" />
          </span>
          <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">FocusPulse</span>
        </h1>
        <p className="text-indigo-300/60 text-xs ml-12 mb-8">Plan. Focus. Succeed.</p>
      </div>

      <ul className="space-y-1.5 relative z-10 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold shadow-sm'
                    : 'text-indigo-200/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-400 rounded-r-full" />}
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-indigo-500/30 text-indigo-200' : 'text-indigo-300/50 group-hover:bg-white/5'
                  }`}>
                    <Icon className="text-sm" />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="relative z-10 border-t border-white/10 pt-4">
        <p className="text-indigo-300/30 text-xs">FocusPulse v1.0</p>
      </div>
    </nav>
  )
}
