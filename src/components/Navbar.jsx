import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 style={{color: '#333', fontSize: '24px'}}>Admin Panel</h1>
      <div>
        <span style={{marginRight: '20px', fontWeight: '600'}}>Biloliddin Rahimjonov</span>
        <button className="btn btn-danger" style={{padding: '8px 16px'}}>Chiqish</button>
      </div>
    </div>
  )
}

export default Navbar
