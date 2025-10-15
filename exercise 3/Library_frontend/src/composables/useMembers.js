import { ref } from 'vue'
import api from '@/services/api'

export function useMembers() {
  const members = ref([])
  const member = ref(null)
  const error = ref(null)

  const fetchMembers = async () => {
    error.value = null
    try {
      const response = await api.get('/members')
      members.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar los miembros'
      console.error('Error fetching members:', err)
    }
  }

  const fetchMemberById = async (id) => {
    error.value = null
    try {
      const response = await api.get(`/members/${id}`)
      member.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al cargar el miembro'
      console.error('Error fetching member:', err)
    }
  }

  const createMember = async (memberData) => {
    error.value = null
    try {
      const response = await api.post('/members', memberData)
      members.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al crear el miembro'
      console.error('Error creating member:', err)
      throw err
    }
  }

  const updateMember = async (id, memberData) => {
    error.value = null
    try {
      const response = await api.put(`/members/${id}`, memberData)
      const index = members.value.findIndex((m) => m.id === id)
      if (index !== -1) {
        members.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al actualizar el miembro'
      console.error('Error updating member:', err)
      throw err
    }
  }

  const deleteMember = async (id) => {
    error.value = null
    try {
      await api.delete(`/members/${id}`)
      members.value = members.value.filter((m) => m.id !== id)
    } catch (err) {
      error.value = err.response?.data?.error || 'Error al eliminar el miembro'
      console.error('Error deleting member:', err)
      throw err
    }
  }

  return {
    members,
    member,
    error,
    fetchMembers,
    fetchMemberById,
    createMember,
    updateMember,
    deleteMember,
  }
}
