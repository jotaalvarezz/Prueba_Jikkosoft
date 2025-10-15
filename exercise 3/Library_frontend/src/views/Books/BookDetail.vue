<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useBooks } from '@/composables/useBooks'
import { useGenres } from '@/composables/useGenres'

const route = useRoute()
const router = useRouter()
const { book, error, fetchBookById, updateBook, deleteBook } = useBooks()
const { bookGenres, fetchBookGenres } = useGenres()

onMounted(async () => {
  const bookId = route.params.id
  await fetchBookById(bookId)
  await fetchBookGenres(bookId)
})

const goBack = () => {
  router.push('/books')
}

const editBook = () => {
  router.push(`/books/${book.value.id}/edit`)
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm(
      `¿Estás seguro de que quieres eliminar el libro "${book.value.name}"?`,
      'Confirmar eliminación',
      {
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        type: 'warning',
      },
    )

    await deleteBook(book.value.id)
    ElMessage.success('Libro eliminado exitosamente')
    router.push('/books')
  } catch (err) {
    if (err !== 'cancel') {
      console.error('Error al eliminar libro:', err)
      ElMessage.error('Error al eliminar el libro')
    }
  }
}
</script>

<template>
  <div>
    <!-- Error -->
    <el-alert v-if="error" type="error" :title="error" :closable="false">
      <el-button style="margin-top: 10px" @click="goBack">Volver a Libros</el-button>
    </el-alert>

    <div v-else-if="book">
      <el-button style="margin-bottom: 20px" @click="goBack">← Volver a Libros</el-button>

      <el-row :gutter="30">
        <el-col :span="8">
          <el-image
            :src="book.cover_url || 'https://via.placeholder.com/300x400?text=Sin+Portada'"
            :alt="book.name"
            fit="cover"
            style="width: 100%; border-radius: 8px"
          />
        </el-col>

        <el-col :span="16">
          <h1 style="margin-bottom: 20px">{{ book.name }}</h1>

          <el-descriptions :column="1" border>
            <el-descriptions-item label="Autor">
              {{ book.author || 'Autor desconocido' }}
            </el-descriptions-item>

            <el-descriptions-item label="Descripción">
              {{ book.description || 'Sin descripción disponible' }}
            </el-descriptions-item>

            <el-descriptions-item label="Géneros" v-if="bookGenres.length > 0">
              <el-tag
                v-for="genre in bookGenres"
                :key="genre.id"
                type="primary"
                style="margin-right: 5px"
              >
                {{ genre.name }}
              </el-tag>
            </el-descriptions-item>

            <el-descriptions-item label="Biblioteca">
              {{ book.library?.name || 'No especificado' }}
            </el-descriptions-item>

            <el-descriptions-item label="Fecha de Registro">
              {{ new Date(book.createdAt).toLocaleDateString('es-ES') }}
            </el-descriptions-item>
          </el-descriptions>

          <div style="margin-top: 20px">
            <i
              class="fa-solid fa-pen-to-square action-icon icon-yellow"
              @click="editBook"
              title="Editar"
            ></i>
            <i
              class="fa-solid fa-trash action-icon icon-red"
              @click="handleDelete"
              title="Eliminar"
            ></i>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.action-icon {
  cursor: pointer;
  margin: 0 10px;
}
.icon-yellow {
  color: #e6a23c;
}
.icon-red {
  color: #f56c6c;
}
</style>
