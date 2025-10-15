<script setup></script>

<template>
  <div>
    <h1 style="margin-bottom: 30px">Sistema de Gestión de Biblioteca</h1>

    <el-row :gutter="20">
      <!-- Tarjeta de Libros -->
      <el-col :sm="8">
        <el-card shadow="hover" class="home-card">
          <template #header>
            <div style="font-size: 18px">📚 Libros</div>
          </template>
          <p>Gestiona el catálogo completo de libros de la biblioteca.</p>
          <el-button type="primary" @click="$router.push('/books')">Ver Libros</el-button>
        </el-card>
      </el-col>

      <!-- Tarjeta de Préstamos -->
      <el-col :sm="8">
        <el-card shadow="hover" class="home-card">
          <template #header>
            <div style="font-size: 18px">📖 Préstamos</div>
          </template>
          <p>Administra los préstamos activos y el historial.</p>
          <el-button type="primary" @click="$router.push('/loans')"> Ver Préstamos </el-button>
        </el-card>
      </el-col>

      <!-- Tarjeta de Miembros -->
      <el-col :sm="8">
        <el-card shadow="hover" class="home-card">
          <template #header>
            <div style="font-size: 18px">👥 Miembros</div>
          </template>
          <p>Gestiona los miembros registrados en la biblioteca.</p>
          <el-button type="primary" @click="$router.push('/members')">Ver Miembros</el-button>
        </el-card>
      </el-col>
    </el-row>

    <el-alert type="info" :closable="false" style="margin-top: 30px">
      <template #title>
        <strong>¡Bienvenido!</strong>
      </template>
      Este es el sistema de gestión de biblioteca. Usa el menú de navegación para acceder a las
      diferentes secciones.
    </el-alert>
  </div>
</template>

<style scoped>
.home-card {
  height: 200px;
}
</style>
