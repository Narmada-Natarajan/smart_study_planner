import { useState, useRef, useEffect } from 'react'
import { FaRobot, FaUser, FaPaperPlane, FaComments } from 'react-icons/fa'

const responses = [
  { keywords: ['pomodoro', 'timer', 'focus'], reply: 'The Pomodoro technique uses 25-minute focus sessions followed by 5-minute breaks. Try our Pomodoro timer under the timer section!' },
  { keywords: ['math', 'mathematics', 'algebra', 'calculus'], reply: 'For math, practice problems are key. Try to spend at least 30 minutes daily on problem-solving. Break complex problems into smaller steps.' },
  { keywords: ['science', 'physics', 'chemistry', 'biology'], reply: 'Science subjects benefit from active recall. Create flashcards, draw diagrams, and explain concepts in your own words.' },
  { keywords: ['english', 'grammar', 'writing', 'essay'], reply: 'For English, read widely and practice writing daily. Try summarizing articles or writing short essays on topics you enjoy.' },
  { keywords: ['history', 'dates', 'events'], reply: 'Create timelines for history topics. Use mnemonic devices to remember dates, and focus on understanding cause-and-effect relationships.' },
  { keywords: ['schedule', 'plan', 'organize', 'time'], reply: 'Use the Planner section to create a study schedule. Prioritize difficult subjects when your energy is highest, and take regular breaks.' },
  { keywords: ['exam', 'test', 'prepare', 'revision'], reply: 'Start exam prep early. Use spaced repetition, practice past papers, and teach concepts to someone else to reinforce your understanding.' },
  { keywords: ['motivate', 'procrastinate', 'bored', 'tired'], reply: 'Break tasks into smaller chunks, use the Pomodoro technique, and reward yourself after completing each session. Remember why you started!' },
]

function getResponse(msg) {
  const lower = msg.toLowerCase()
  for (const { keywords, reply } of responses) {
    if (keywords.some(k => lower.includes(k))) return reply
  }
  return "That's a great question! Try breaking it down into smaller parts. If you're studying a specific subject, mention it and I can give more targeted tips. Also check out the Planner and Pomodoro sections to stay organized!"
}

export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm your study assistant. Ask me about study tips, subjects, or time management!" }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input.trim() }
    const reply = { role: 'assistant', text: getResponse(input) }
    setMessages(prev => [...prev, userMsg, reply])
    setInput('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
          <FaComments />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Study Assistant</h1>
          <p className="text-gray-400 text-sm mt-0.5">Ask me anything about studying</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col card-hover overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''} animate-fadeIn`}>
              {msg.role === 'assistant' && (
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FaRobot className="text-indigo-600 text-sm" />
                </div>
              )}
              <div className={`max-w-[75%] p-4 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl rounded-br-md'
                  : 'bg-gray-50 text-gray-700 rounded-2xl rounded-bl-md border border-gray-100'
              }`}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FaUser className="text-white text-sm" />
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-gray-100 p-4 bg-gray-50/50">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-gray-700 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
