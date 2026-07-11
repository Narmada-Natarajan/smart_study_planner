import { BrowserRouter, Routes, Route } from "react-router-dom"
import { StudyProvider } from './context/StudyContext.jsx'
import './App.css'
import Layout from './components/Layout'
import Dashboard from '../pages/Dashboard'
import Planner from '../pages/Planner'
import Pomodoro from '../pages/Pomodoro'
import Analytics from '../pages/Analytics'
import Assistant from '../pages/Assistant'

function App() {
  return (
    <StudyProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plans" element={<Planner />} />
            <Route path="/progress" element={<Analytics />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/chat" element={<Assistant />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StudyProvider>
  )
}

export default App
