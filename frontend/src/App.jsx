import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  const [newItemName, setNewItemName] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/items')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  const addItem = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItemName }),
      })
      const newItem = await response.json()
      setItems([...items, newItem])
      setNewItemName('')
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const updateItem = async (id, newName) => {
    try {
      const response = await fetch(`http://localhost:3000/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      })
      const updatedItem = await response.json()
      setItems(items.map(item => item.id === id ? updatedItem : item))
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/items/${id}`, {
        method: 'DELETE',
      })
      setItems(items.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>Items</h2>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => updateItem(item.id, prompt('Enter new name:', item.name))}>Edit</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </>
  )
}

export default App
