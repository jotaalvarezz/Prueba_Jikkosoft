import { ref } from 'vue'
import api from '@/services/api'

export function useGenres() {
  const genres = ref([])
  const bookGenres = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchGenres = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/genres')
      genres.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar géneros'
      console.error('Error fetching genres:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchBookGenres = async (bookId) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/books/${bookId}/genres`)
      bookGenres.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar géneros del libro'
      console.error('Error fetching book genres:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    genres,
    bookGenres,
    loading,
    error,
    fetchGenres,
    fetchBookGenres,
  }
}
