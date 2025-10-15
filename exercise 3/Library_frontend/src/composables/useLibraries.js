import { ref } from 'vue'
import api from '@/services/api'

export function useLibraries() {
  const library = ref({})

  const getLibrary = async () => {
    try {
      const response = await api.get('librares/first')
      library.value = response.data
    } catch (err) {
      console.error('Error fetching library:', err)
    }
  }
  return { library, getLibrary }
}
