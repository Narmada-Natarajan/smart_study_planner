import { useState } from 'react'
import { useStudy } from '../src/context/useStudy.js'
import { FaPlus, FaTrash, FaCheck, FaListUl } from 'react-icons/fa'

const subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science', 'Other']

export default function Planner() {
  const { tasks, addTask, toggleTask, deleteTask } = useStudy()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('Mathematics')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask({ title: title.trim(), subject, priority, date: new Date().toISOString().split('T')[0] })
    setTitle('')
  }

  const sorted = [...tasks].sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
          <FaListUl />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Study Planner</h1>
          <p className="text-gray-400 text-sm mt-0.5">Organize your study tasks</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 card-hover">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
          Add New Task
        </h2>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              placeholder="What do you want to study?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-700"
          >
            {subjects.map(s => <option key={s}>{s}</option>)}
          </select>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-700"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium">
            <FaPlus className="text-sm" /> Add Task
          </button>
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full" />
            Tasks
          </h2>
          {tasks.length > 0 && (
            <span className="text-sm text-gray-400">
              {completedCount}/{tasks.length} completed
            </span>
          )}
        </div>
        {sorted.length === 0 ? (
          <div className="text-center py-12">
            <FaListUl className="text-4xl text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400">No tasks yet. Add one above!</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {sorted.map((task, i) => (
              <li key={task.id} className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 animate-fadeIn ${
                task.completed
                  ? 'bg-gray-50/50 border-gray-100'
                  : 'bg-white border-gray-100 hover:border-indigo-100 hover:shadow-sm'
              }`} style={{ animationDelay: `${i * 0.03}s` }}>
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                    task.completed
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-400 text-white shadow-sm'
                      : 'border-gray-300 hover:border-indigo-400 hover:shadow-sm'
                  }`}
                >
                  {task.completed && <FaCheck className="text-xs" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</p>
                  <p className="text-xs text-gray-400">{task.subject}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                  task.priority === 'high' ? 'bg-red-50 text-red-600 border border-red-100' :
                  task.priority === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                  'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}>
                  {task.priority}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <FaTrash className="text-sm" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
