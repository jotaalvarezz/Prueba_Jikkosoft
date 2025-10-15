<script setup>
import { onMounted, ref, computed } from 'vue'
import { useBooks } from '@/composables/useBooks'

const { books, error, fetchBooks } = useBooks()
const searchFilter = ref('')

const filteredBooks = computed(() => {
  if (!searchFilter.value) return books.value
  return books.value.filter((book) =>
    book.name.toLowerCase().includes(searchFilter.value.toLowerCase()),
  )
})

onMounted(() => {
  fetchBooks()
})
</script>

<template>
  <div>
    <h1 style="margin-bottom: 20px">Catálogo de Libros</h1>

    <!-- Error -->
    <el-alert v-if="error" type="error" :title="error" :closable="false" />

    <!-- Sin libros -->
    <el-alert
      v-else-if="books.length === 0"
      type="info"
      title="No hay libros registrados en la biblioteca."
      :closable="false"
    />

    <!-- Filtro -->
    <div v-else style="margin-bottom: 20px; text-align: right">
      <el-input
        v-model="searchFilter"
        placeholder="Buscar por nombre..."
        style="width: 300px"
        clearable
      />
    </div>

    <!-- Sin resultados -->
    <el-alert
      v-if="!error && books.length > 0 && filteredBooks.length === 0"
      type="info"
      title="No se encontraron libros con ese nombre."
      :closable="false"
    />

    <!-- Tarjetas de libros -->
    <el-row v-if="!error && books.length > 0 && filteredBooks.length > 0" :gutter="20">
      <el-col v-for="book in filteredBooks" :key="book.id" :sm="8" style="margin-bottom: 20px">
        <el-card :body-style="{ padding: '0px' }">
          <img
            :src="book.cover_url || 'https://via.placeholder.com/300x400?text=Sin+Portada'"
            :alt="book.name"
            style="width: 100%; height: 300px; object-fit: cover"
          />
          <div style="padding: 14px">
            <h3 style="margin: 0 0 10px 0">{{ book.name }}</h3>
            <p style="color: #909399; font-size: 13px; margin: 0 0 10px 0">
              {{ book.author || 'Autor desconocido' }}
            </p>
            <p
              style="
                margin: 0 0 14px 0;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
              "
            >
              {{ book.description || 'Sin descripción disponible' }}
            </p>
            <el-button
              type="primary"
              plain
              style="width: 100%"
              @click="$router.push(`/books/${book.id}`)"
            >
              Ver Detalles
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-card {
  height: 470px;
}
</style>
