import React from 'react'

const Sidebar = ({ activePage, setActivePage, categories, toggleSidebar }) => {
    return (
        <div className="sidebar">
            <h2 style={{ padding: '0 25px 30px', color: '#333', fontSize: '24px' }}>Fitness Admin</h2>
            <nav>
                <a href="#" className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); setActivePage('dashboard') }}>
                    📊 Dashboard
                </a>
                <a href="#" className={`nav-link ${activePage === 'exercises' ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); setActivePage('exercises') }}>
                    💪 Mashqlar
                </a>
                <div style={{ padding: '20px 25px', borderTop: '1px solid #eee' }}>
                    <h4>Mashq Turlari:</h4>
                    {categories.map(cat => (
                        <div key={cat} style={{ padding: '8px 0', fontSize: '14px', color: '#666' }}>
                            -  {cat}
                        </div>
                    ))}
                </div>
                <div style={{ padding: '20px 30px', borderTop: '1px solid #eee' }}>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={toggleSidebar}>
                        Yopish ✕
                    </button>
                </div>

            </nav>
        </div>
    )
}

export default Sidebar
