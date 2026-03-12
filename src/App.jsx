import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Exercises from './pages/Exercises'
import Loading from './components/loading'

const categories = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core']

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  <div className="app">
    {isLoading && <Loading />}
    <div className={`sidebar-overlay ${isSidebarOpen ? 'mobile-open' : ''}`}
      onClick={() => setIsSidebarOpen(false)} />
    <div className={`sidebar ${isSidebarOpen ? 'mobile-open' : ''}`}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        categories={categories}
        toggleSidebar={toggleSidebar}
      />
    </div>
    <div className="layout">
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="content">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'exercises' && <Exercises />}
        </div>
      </div>
    </div>
  </div>
  return (
    <div className="app">
      {isLoading && <Loading />}
      <div className="layout">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          categories={categories}
        />
        <div className="main-content">
          <Navbar />
          <div className="content">
            {activePage === 'dashboard' && <Dashboard />}
            {activePage === 'exercises' && <Exercises />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
