<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useLoans } from '@/composables/useLoans'
import { useBooks } from '@/composables/useBooks'
import { useMembers } from '@/composables/useMembers'

const router = useRouter()
const { error, createLoan } = useLoans()
const { books, fetchBooks } = useBooks()
const { members, fetchMembers } = useMembers()

const loanModel = ref({
  book_id: null,
  member_id: null,
})

// Cargar libros y miembros al montar
onMounted(async () => {
  await fetchBooks()
  await fetchMembers()
})

// Crear préstamo
const handleSubmit = async () => {
  if (!loanModel.value.book_id || !loanModel.value.member_id) {
    ElMessage.warning('Debes seleccionar un libro y un miembro')
    return
  }

  try {
    await createLoan(loanModel.value)
    ElMessage.success('¡Préstamo creado exitosamente!')

    loanModel.value = {
      book_id: null,
      member_id: null,
    }

    // Redirigir después de 1 segundo
    setTimeout(() => {
      router.push('/loans')
    }, 1000)
  } catch (err) {
    console.error('Error al crear préstamo:', err)
  }
}
</script>

<template>
  <div style="max-width: 800px; margin: 0 auto">
    <el-card>
      <template #header>
        <div style="text-align: center; font-size: 20px; font-weight: bold">Nuevo Préstamo</div>
      </template>

      <!-- Mensaje de error -->
      <el-alert
        v-if="error"
        type="error"
        :title="error"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <el-form :model="loanModel" label-position="top" @submit.prevent="handleSubmit">
        <el-form-item label="Seleccionar Libro" required>
          <el-select
            v-model="loanModel.book_id"
            filterable
            placeholder="Selecciona un libro..."
            style="width: 100%"
          >
            <el-option
              v-for="book in books"
              :key="book.id"
              :label="`${book.name} - ${book.author || 'Sin autor'}`"
              :value="book.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Seleccionar Miembro" required>
          <el-select
            v-model="loanModel.member_id"
            filterable
            placeholder="Selecciona un miembro..."
            style="width: 100%"
          >
            <el-option
              v-for="member in members"
              :key="member.id"
              :label="`${member.names} ${member.last_name} - CC: ${member.cc}`"
              :value="member.id"
            />
          </el-select>
        </el-form-item>

        <el-alert type="info" :closable="false" style="margin-bottom: 20px">
          📅 La fecha del préstamo se registrará automáticamente al crear el préstamo
        </el-alert>

        <el-form-item>
          <el-button type="primary" plain native-type="submit"> Crear Préstamo </el-button>
          <el-button type="danger" plain @click="router.push('/loans')">Cancelar</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped></style>
