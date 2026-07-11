import { useState, useEffect } from 'react'
import { StudyContext } from './studyContext'

export function StudyProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try { const s = localStorage.getItem('study-tasks'); return s ? JSON.parse(s) : [] }
    catch { return [] }
  })

  const [pomodoroLog, setPomodoroLog] = useState(() => {
    try { const s = localStorage.getItem('pomodoro-log'); return s ? JSON.parse(s) : [] }
    catch { return [] }
  })

  const [studyLog, setStudyLog] = useState(() => {
    try { const s = localStorage.getItem('study-log'); return s ? JSON.parse(s) : [] }
    catch { return [] }
  })

  useEffect(() => { localStorage.setItem('study-tasks', JSON.stringify(tasks)) }, [tasks])
  useEffect(() => { localStorage.setItem('pomodoro-log', JSON.stringify(pomodoroLog)) }, [pomodoroLog])
  useEffect(() => { localStorage.setItem('study-log', JSON.stringify(studyLog)) }, [studyLog])

  const addTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: Date.now().toString(), completed: false, createdAt: new Date().toISOString() }])
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const addPomodoroSession = (minutes) => {
    const today = new Date().toISOString().split('T')[0]
    setPomodoroLog(prev => {
      const existing = prev.find(p => p.date === today)
      if (existing) {
        return prev.map(p => p.date === today ? { ...p, sessions: p.sessions + 1, totalMinutes: p.totalMinutes + minutes } : p)
      }
      return [...prev, { date: today, sessions: 1, totalMinutes: minutes }]
    })
  }

  const logStudyTime = (subject, minutes) => {
    const today = new Date().toISOString().split('T')[0]
    setStudyLog(prev => {
      const existing = prev.find(s => s.date === today && s.subject === subject)
      if (existing) {
        return prev.map(s => s.date === today && s.subject === subject ? { ...s, minutes: s.minutes + minutes } : s)
      }
      return [...prev, { date: today, subject, minutes }]
    })
  }

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0]
    const todayPomodoro = pomodoroLog.find(p => p.date === today)
    const todayStudy = studyLog.filter(s => s.date === today)
    const totalMinutes = todayStudy.reduce((sum, s) => sum + s.minutes, 0)
    return {
      pomodoroSessions: todayPomodoro?.sessions || 0,
      studyMinutes: totalMinutes,
      tasksCompleted: tasks.filter(t => t.completed).length,
      totalTasks: tasks.length
    }
  }

  return (
    <StudyContext.Provider value={{
      tasks, addTask, toggleTask, deleteTask,
      pomodoroLog, addPomodoroSession,
      studyLog, logStudyTime,
      getTodayStats
    }}>
      {children}
    </StudyContext.Provider>
  )
}
