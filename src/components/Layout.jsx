import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <Navbar />
      <main className="ml-64 p-8 min-h-screen">
        <div className="max-w-6xl mx-auto animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  )
}
