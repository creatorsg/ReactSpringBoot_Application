import { useState } from 'react'
import './style.css'

function App() {
  const [books, setBooks] = useState([])
  const [form, setForm] = useState({})        
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [listError, setListError] = useState(null)
  const [message, setMessage] = useState(null)
  const [detailBook, setDetailBook] = useState(null)

  return (
    <div>
      <h1>도서 관리 시스템</h1>
    </div>
  )
}

export default App