import { useState, useEffect, useRef } from 'react'
import { fetchBooks, fetchBook, createBook, updateBook, deleteBook } from './api/bookApi.js'
import { EMPTY_FORM, toRequest, toFormValues } from './lib/bookData.js'
import { validateBook } from './lib/validation.js'
import { APP_MODE } from './config.js'
import BookTable from './components/BookTable.jsx'
import BookForm from './components/BookForm.jsx'
import BookDetail from './components/BookDetail.jsx'
import './style.css'

function App() {
  const [books, setBooks] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [listError, setListError] = useState(null)
  const [message, setMessage] = useState(null)
  const [detailBook, setDetailBook] = useState(null)

  const formRef = useRef(null)

  async function loadBooks() {
    setLoading(true)
    try {
      const data = await fetchBooks()
      setBooks(data)
    } catch (error) {
      console.error('Error:', error)
      setListError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!message || message.type !== 'success') return
    const timer = setTimeout(() => setMessage(null), 3000)
    return () => clearTimeout(timer)
  }, [message])

  useEffect(() => {
  if (!message) return
  const timer = setTimeout(() => setMessage(null), 3000)
  return () => clearTimeout(timer)
  }, [message])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)

    const bookData = toRequest(form)

    const errorMessage = validateBook(bookData)
    if (errorMessage) {
      setMessage({ text: errorMessage, type: 'error' })
      return
    }

    try {
      if (editingId) {
        await updateBook(editingId, bookData)
        setMessage({ text: '도서 정보가 성공적으로 수정되었습니다.', type: 'success' })
      } else {
        await createBook(bookData)
        setMessage({ text: '도서가 성공적으로 등록되었습니다.', type: 'success' })
      }

      setEditingId(null)
      setForm(EMPTY_FORM)
      await loadBooks()
    } catch (error) {
      console.error('Error:', error)
      setMessage({ text: error.message, type: 'error' })
    }
  }

  function handleCancel() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setMessage(null)
  }

  async function handleEdit(id) {
    setMessage(null)
    try {
      const book = await fetchBook(id)
      setForm(toFormValues(book))
      setEditingId(id)
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
      console.error('Error:', error)
      setMessage({ text: error.message, type: 'error' })
    }
  }

  async function handleDelete(id) {
    if (!confirm('정말로 이 도서를 삭제하시겠습니까?')) return

    try {
      await deleteBook(id)
      setMessage({ text: '도서가 성공적으로 삭제되었습니다.', type: 'success' })

      if (editingId === id) {
        setEditingId(null)
        setForm(EMPTY_FORM)
      }

      await loadBooks()
    } catch (error) {
      console.error('Error:', error)
      setMessage({ text: error.message, type: 'error' })
    }
  }
  
  async function handleDetail(id) {
    setMessage(null)
    try {
      const book = await fetchBook(id)
      setDetailBook(book)
    } catch (error) {
      console.error('Error:', error)
      setMessage({ text: error.message, type: 'error' })
    }
  }

  return (
    <div>
      <h1>
        도서 관리 시스템{' '}
        <span className={`app-mode ${APP_MODE === 'PROD' ? 'prod' : 'test'}`}>
          {APP_MODE}
        </span>
      </h1>
      <BookForm
        form={form}
        isEditing={editingId !== null}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        containerRef={formRef}
      />
      <BookTable
        books={books}
        loading={loading}
        error={listError}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={handleDetail}
      />
      <BookDetail 
        book={detailBook} 
        onClose={() => setDetailBook(null)} 
      />
    </div>
  )
}

export default App