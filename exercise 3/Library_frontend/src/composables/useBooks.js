import { ref } from 'vue'
import api from '@/services/api'

export function useBooks() {
  const books = ref([])
  const book = ref(null)
  const error = ref(null)

  const fetchBooks = async () => {
    error.value = null
    try {
      const response = await api.get('/books')
      books.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los libros'
      console.error('Error fetching books:', err)
    }
  }

  const fetchBookById = async (id) => {
    error.value = null
    try {
      const response = await api.get(`/books/${id}`)
      book.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar el libro'
      console.error('Error fetching book:', err)
    }
  }

  const createBook = async (bookData) => {
    error.value = null
    try {
      const response = await api.post('/books', bookData)
      books.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al crear el libro'
      console.error('Error creating book:', err)
      throw err
    }
  }

  const updateBook = async (id, bookData) => {
    error.value = null
    try {
      const response = await api.put(`/books/${id}`, bookData)
      const index = books.value.findIndex((b) => b.id === id)
      if (index !== -1) {
        books.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al actualizar el libro'
      console.error('Error updating book:', err)
      throw err
    }
  }

  const deleteBook = async (id) => {
    error.value = null
    try {
      await api.delete(`/books/${id}`)
      books.value = books.value.filter((b) => b.id !== id)
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al eliminar el libro'
      console.error('Error deleting book:', err)
      throw err
    }
  }

  return {
    books,
    book,
    error,
    fetchBooks,
    fetchBookById,
    createBook,
    updateBook,
    deleteBook,
  }
}
