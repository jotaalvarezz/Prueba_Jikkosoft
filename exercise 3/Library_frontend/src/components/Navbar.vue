<script setup>
import { useRouter } from 'vue-router'
import { Document, Reading, User, House } from '@element-plus/icons-vue'

const router = useRouter()

const handleSelect = (key) => {
  router.push(key)
}
</script>

<template>
  <el-menu
    :default-active="$route.path"
    mode="horizontal"
    @select="handleSelect"
    :ellipsis="false"
    background-color="#fff"
    class="navbar"
  >
    <el-menu-item index="/" :icon="House"> 📚 Biblioteca </el-menu-item>

    <el-sub-menu index="books" :icon="Reading">
      <template #title>Libros</template>
      <el-menu-item index="/books">Ver Todos</el-menu-item>
      <el-menu-item index="/books/create">Agregar Nuevo</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="loans" :icon="Document">
      <template #title>Préstamos</template>
      <el-menu-item index="/loans">Ver Préstamos</el-menu-item>
      <el-menu-item index="/loans/create">Crear Préstamo</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="members" :icon="User">
      <template #title>Miembros</template>
      <el-menu-item index="/members">Ver Todos</el-menu-item>
      <el-menu-item index="/members/create">Agregar Nuevo</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.navbar {
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
