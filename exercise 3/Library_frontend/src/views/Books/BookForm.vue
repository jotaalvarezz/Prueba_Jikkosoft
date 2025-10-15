<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useBooks } from '@/composables/useBooks'
import { useLibraries } from '@/composables/useLibraries'
import { useGenres } from '@/composables/useGenres'

const router = useRouter()
const route = useRoute()
const { error, createBook, updateBook, fetchBookById, book } = useBooks()
const { library, getLibrary } = useLibraries()
const { genres, fetchGenres, bookGenres, fetchBookGenres } = useGenres()

const isEditing = computed(() => route.name === 'book-edit')
const bookId = computed(() => route.params.id)

const bookModel = ref({
  name: '',
  author: '',
  library_id: null,
  description: '',
  cover_url: '',
})

const selectedGenres = ref([])

// Cargar la biblioteca y géneros al montar
onMounted(async () => {
  await getLibrary()
  await fetchGenres()

  // Si es edición, cargar los datos del libro
  if (isEditing.value) {
    await fetchBookById(bookId.value)
    await fetchBookGenres(bookId.value)
  }
})

// Observar cuando se cargue la biblioteca y asignar el ID automáticamente
watch(library, (newLibrary) => {
  if (newLibrary && newLibrary.id) {
    bookModel.value.library_id = newLibrary.id
  }
})

// Observar cuando se cargue el libro para edición
watch(
  book,
  (newBook) => {
    if (newBook && isEditing.value) {
      bookModel.value = {
        name: newBook.name,
        author: newBook.author,
        library_id: newBook.library_id,
        description: newBook.description,
        cover_url: newBook.cover_url,
      }
    }
  },
  { immediate: true },
)

// Observar cuando se carguen los géneros del libro
watch(
  bookGenres,
  (newGenres) => {
    if (newGenres && isEditing.value) {
      selectedGenres.value = newGenres.map((g) => g.id)
    }
  },
  { immediate: true },
)

// Crear o actualizar libro
const handleSubmit = async () => {
  try {
    // Agregar géneros al modelo antes de enviar
    const bookData = {
      ...bookModel.value,
      genres: selectedGenres.value,
    }

    if (isEditing.value) {
      await updateBook(bookId.value, bookData)
      ElMessage.success('¡Libro actualizado exitosamente!')
    } else {
      await createBook(bookData)
      ElMessage.success('¡Libro creado exitosamente!')
    }

    // Redirigir después de 1 segundo
    setTimeout(() => {
      if (isEditing.value) {
        router.push(`/books/${bookId.value}`)
      } else {
        router.push('/books')
      }
    }, 1000)
  } catch (err) {
    console.error(`Error al ${isEditing.value ? 'actualizar' : 'crear'} libro:`, err)
  }
}
</script>

<template>
  <div style="max-width: 800px; margin: 0 auto">
    <el-card>
      <template #header>
        <div style="text-align: center; font-size: 20px; font-weight: bold">
          {{ isEditing ? 'Editar Libro' : 'Agregar Libro' }}
        </div>
      </template>

      <!-- Mensaje de error -->
      <el-alert
        v-if="error"
        type="error"
        :title="error"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <!-- Formulario -->
      <el-form :model="bookModel" label-position="top" @submit.prevent="handleSubmit">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Nombre del Libro" required>
              <el-input
                v-model="bookModel.name"
                placeholder="Ej: Cien años de soledad"
                maxlength="150"
                show-word-limit
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Autor">
              <el-input v-model="bookModel.author" placeholder="Ej: Gabriel García Márquez" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="URL de la Portada">
              <el-input
                v-model="bookModel.cover_url"
                placeholder="Usar esta https://picsum.photos/seed/book-1984/300/450"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="Géneros">
              <el-select
                v-model="selectedGenres"
                multiple
                filterable
                placeholder="Selecciona géneros..."
                style="width: 100%"
              >
                <el-option
                  v-for="genre in genres"
                  :key="genre.id"
                  :label="genre.name"
                  :value="genre.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="Descripción">
              <el-input
                v-model="bookModel.description"
                type="textarea"
                :rows="4"
                placeholder="Breve descripción del libro..."
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-alert v-if="library.name" type="info" :closable="false" style="margin-bottom: 20px">
          📚 Este libro se agregará a: <strong>{{ library.name }}</strong>
        </el-alert>

        <el-form-item style="margin-top: 20px">
          <el-button type="primary" plain native-type="submit">
            {{ isEditing ? 'Actualizar Libro' : 'Guardar Libro' }}
          </el-button>
          <el-button
            type="danger"
            plain
            @click="router.push(isEditing ? `/books/${bookId}` : '/books')"
            >Cancelar</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped></style>
