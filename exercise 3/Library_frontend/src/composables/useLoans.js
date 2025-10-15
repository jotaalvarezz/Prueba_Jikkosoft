import { ref } from 'vue'
import api from '@/services/api'

export function useLoans() {
  const loans = ref([])
  const loan = ref(null)
  const error = ref(null)

  const fetchLoans = async () => {
    error.value = null
    try {
      const response = await api.get('/loans')
      loans.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los préstamos'
      console.error('Error fetching loans:', err)
    }
  }

  const fetchActiveLoans = async () => {
    error.value = null
    try {
      const response = await api.get('/loans/active')
      loans.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los préstamos activos'
      console.error('Error fetching active loans:', err)
    }
  }

  const fetchLoanById = async (id) => {
    error.value = null
    try {
      const response = await api.get(`/loans/${id}`)
      loan.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar el préstamo'
      console.error('Error fetching loan:', err)
    }
  }

  const createLoan = async (loanData) => {
    error.value = null
    try {
      const response = await api.post('/loans', loanData)
      loans.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al crear el préstamo'
      console.error('Error creating loan:', err)
      throw err
    }
  }

  const returnLoan = async (id, returnData = {}) => {
    error.value = null
    try {
      const response = await api.post(`/loans/${id}/return`, returnData)
      // Actualizar el préstamo en la lista
      const index = loans.value.findIndex((l) => l.id === id)
      if (index !== -1) {
        loans.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al devolver el libro'
      console.error('Error returning loan:', err)
      throw err
    }
  }

  return {
    loans,
    loan,
    error,
    fetchLoans,
    fetchActiveLoans,
    fetchLoanById,
    createLoan,
    returnLoan,
  }
}
