import { useState, useEffect, useRef } from 'react'
import { useStudy } from '../src/context/useStudy.js'
import { FaPlay, FaPause, FaRedo, FaFire, FaBrain } from 'react-icons/fa'

const WORK = 25 * 60
const BREAK = 5 * 60
const CIRCUMFERENCE = 2 * Math.PI * 120

export default function Pomodoro() {
  const { addPomodoroSession, pomodoroLog, logStudyTime } = useStudy()
  const [time, setTime] = useState(WORK)
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState('work')
  const [completed, setCompleted] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            if (phase === 'work') {
              addPomodoroSession(25)
              logStudyTime('Pomodoro', 25)
              setCompleted(c => c + 1)
              setPhase('break')
              setTime(BREAK)
              setRunning(true)
            } else {
              setPhase('work')
              setTime(WORK)
              setRunning(false)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, phase, addPomodoroSession, logStudyTime])

  const toggle = () => setRunning(prev => !prev)

  const reset = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setPhase('work')
    setTime(WORK)
  }

  const format = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const totalTime = phase === 'work' ? WORK : BREAK
  const progress = (time / totalTime) * CIRCUMFERENCE
  const todayMinutes = pomodoroLog.find(p => p.date === new Date().toISOString().split('T')[0])

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3 mb-8 self-start">
        <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
          <FaBrain />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pomodoro Timer</h1>
          <p className="text-gray-400 text-sm mt-0.5">Focus with timed study sessions</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 flex flex-col items-center w-full max-w-md card-hover">
        <div className={`text-sm font-semibold mb-6 px-4 py-1.5 rounded-full uppercase tracking-wider transition-colors duration-500 ${
          phase === 'work'
            ? 'bg-indigo-50 text-indigo-600'
            : 'bg-green-50 text-green-600'
        }`}>
          {phase === 'work' ? 'Focus Time' : 'Break Time'}
        </div>

        <div className="relative mb-8">
          <svg className="w-72 h-72 -rotate-90" viewBox="0 0 260 260">
            <circle cx="130" cy="130" r="120" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle
              cx="130" cy="130" r="120"
              fill="none"
              stroke={phase === 'work' ? '#6366f1' : '#22c55e'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - progress}
              className="transition-all duration-1000 ease-linear"
            />
            <circle
              cx="130" cy="130" r="120"
              fill="none"
              stroke={phase === 'work' ? '#e0e7ff' : '#dcfce7'}
              strokeWidth="8"
              strokeDasharray={8}
              strokeDashoffset={-4}
              opacity="0.5"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-6xl font-mono font-bold tracking-wider ${phase === 'work' ? 'text-indigo-600' : 'text-green-500'}`}>
              {format(time)}
            </span>
            {running && (
              <span className="text-xs text-gray-400 mt-2 animate-pulse">
                {phase === 'work' ? 'Studying...' : 'Resting...'}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={toggle}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
              running
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            }`}
          >
            {running ? <><FaPause /> Pause</> : <><FaPlay /> Start</>}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
          >
            <FaRedo /> Reset
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400 bg-gray-50 rounded-xl px-5 py-3">
          <div className="flex items-center gap-1.5">
            <FaFire className="text-orange-400" />
            <span>Today: <strong className="text-gray-700">{todayMinutes?.sessions || 0}</strong></span>
          </div>
          <span className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <FaBrain className="text-indigo-400" />
            <span>Total: <strong className="text-gray-700">{completed}</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}
