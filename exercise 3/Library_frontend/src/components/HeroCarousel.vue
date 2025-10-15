<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isHomePage = computed(() => {
  return route.path === '/'
})

const carouselItems = [
  {
    id: 1,
    title: 'Bienvenido a la Biblioteca',
    description: 'Descubre un mundo de conocimiento y aventuras literarias',
    icon: '📚',
  },
  {
    id: 2,
    title: 'Amplia Colección de Libros',
    description: 'Explora miles de títulos en diferentes géneros y categorías',
    icon: '📖',
  },
  {
    id: 3,
    title: 'Préstamos Fáciles y Rápidos',
    description: 'Gestiona tus préstamos de manera sencilla y eficiente',
    icon: '📋',
  },
  {
    id: 4,
    title: 'Únete a Nuestra Comunidad',
    description: 'Conviértete en miembro y disfruta de todos los beneficios',
    icon: '👥',
  },
]
</script>

<template>
  <el-carousel v-if="isHomePage" :interval="5000" arrow="always">
    <el-carousel-item v-for="item in carouselItems" :key="item.id">
      <div class="carousel-content">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <div class="carousel-icon">{{ item.icon }}</div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.carousel-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  text-align: center;
}

.carousel-content h2 {
  color: #475669;
  font-size: 2rem;
  margin-bottom: 10px;
}

.carousel-content p {
  color: #475669;
  font-size: 1rem;
  margin-bottom: 15px;
  opacity: 0.8;
}

.carousel-icon {
  font-size: 3rem;
  line-height: 1;
}

.el-carousel__item:nth-child(odd) {
  background-color: #d3dce6;
}

.el-carousel__item:nth-child(even) {
  background-color: #d3dce6;
}
</style>
