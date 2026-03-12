import React, { useState, useEffect } from 'react'
import { initialExercises } from '../data/exercises'

const Exercises = () => {
  const [exercises, setExercises] = useState([])
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'Chest', 
    sets: '', 
    reps: '', 
    description: '',
    image: ''  
  })
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setExercises(initialExercises)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      if (editingId) {
        setExercises(exercises.map(ex => 
          ex.id === editingId ? { ...formData, id: editingId } : ex
        ))
        setEditingId(null)
      } else {
        const newExercise = {
          id: Date.now(),
          ...formData
        }
        setExercises([...exercises, newExercise])
      }
      setFormData({ name: '', category: 'Chest', sets: '', reps: '', description: '', image: '' })
      setIsLoading(false)
    }, 1500)
  }

  const handleEdit = (exercise) => {
    setFormData(exercise)
    setEditingId(exercise.id)
  }

  const handleDelete = (id) => {
    if (window.confirm('O\'chirishni xohlaysizmi?')) {
      setExercises(exercises.filter(ex => ex.id !== id))
    }
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap'}}>
        <h2 style={{margin: 0}}>💪 Mashqlar Ro\'yxati ({exercises.length})</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {setEditingId(null); setFormData({ name: '', category: 'Chest', sets: '', reps: '', description: '', image: '' })}}
          style={{flexShrink: 0}}
        >
          ➕ Yangi qo\'shish
        </button>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start'}}>
        <div className="card">
          <h3>{editingId ? '✏️ Tahrirlash' : '➕ Yangi mashq qo\'shish'}</h3>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Mashq nomi"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            
            {/* Kategoriya */}
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Chest">💪 Ko'krak</option>
              <option value="Back">🦍 Orqa</option>
              <option value="Legs">🦵 Oyoq</option>
              <option value="Arms">💥 Qo'l</option>
              <option value="Shoulders">🤌 Yelka</option>
              <option value="Core">🔥 Markaz</option>
            </select>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <input
                placeholder="Setlar (4)"
                value={formData.sets}
                onChange={(e) => setFormData({...formData, sets: e.target.value})}
                required
              />
              <input
                placeholder="Takrorlashlar (8-12)"
                value={formData.reps}
                onChange={(e) => setFormData({...formData, reps: e.target.value})}
                required
              />
            </div>
            
            <input
              type="url"
              placeholder="🖼️ Rasm URL (https://images.unsplash.com/...) - ixtiyoriy"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            
            <textarea
              placeholder="📝 Tavsif yozing..."
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
              {editingId ? '💾 Saqlash' : '➕ Qo\'shish'}
            </button>
          </form>
          
          {formData.image && (
            <div style={{marginTop: '20px', textAlign: 'center'}}>
              <img 
                src={formData.image} 
                alt="Preview" 
                style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px', border: '3px solid #667eea'}}
                onError={(e) => {e.target.style.display = 'none'}}
              />
              <p style={{fontSize: '12px', color: '#666', marginTop: '5px'}}>Preview</p>
            </div>
          )}
        </div>

        <div className="card">
          <h3>📋 Mashqlar ro'yxati</h3>
          <div style={{maxHeight: '500px', overflowY: 'auto'}}>
            {exercises.map(exercise => (
              <div key={exercise.id} className="exercise-item">
                <div style={{flex: 1}}>

                  {exercise.image ? (
                    <img 
                      src={exercise.image} 
                      alt={exercise.name}
                      style={{
                        width: '100%', 
                        height: '120px', 
                        objectFit: 'cover', 
                        borderRadius: '12px', 
                        marginBottom: '15px',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', 
                      height: '120px', 
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      marginBottom: '15px'
                    }}>
                      🏋️
                    </div>
                  )}
                  
                  <h4 style={{marginBottom: '8px'}}>{exercise.name}</h4>
                  <p style={{marginBottom: '5px', color: '#666'}}>
                    <strong>🎯 {exercise.category}</strong>
                  </p>
                  <p style={{marginBottom: '5px'}}>
                    <strong>🔥 {exercise.sets} set</strong> × {exercise.reps}
                  </p>
                  <p style={{color: '#555', fontSize: '14px'}}>{exercise.description}</p>
                </div>
                
                <div className="exercise-actions">
                  <button className="btn btn-success" onClick={() => handleEdit(exercise)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(exercise.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Exercises
