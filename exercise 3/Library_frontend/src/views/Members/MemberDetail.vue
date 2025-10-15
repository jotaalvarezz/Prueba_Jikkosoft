<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMembers } from '@/composables/useMembers'

const route = useRoute()
const router = useRouter()
const { member, loading, error, fetchMemberById } = useMembers()

onMounted(async () => {
  const memberId = route.params.id
  await fetchMemberById(memberId)
})

const goBack = () => {
  router.push('/members')
}

// Formatear fecha
const formatDate = (dateString) => {
  if (!dateString) return 'No especificado'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div>
    <div v-if="loading" style="text-align: center; padding: 40px">
      <el-icon class="is-loading" :size="40">
        <Loading />
      </el-icon>
    </div>

    <el-alert v-else-if="error" type="error" :title="error" :closable="false">
      <el-button style="margin-top: 10px" @click="goBack">Volver a Miembros</el-button>
    </el-alert>

    <div v-else-if="member">
      <el-button style="margin-bottom: 20px" @click="goBack">← Volver a Miembros</el-button>

      <el-card>
        <template #header>
          <div style="display: flex; align-items: center; gap: 15px">
            <el-avatar :size="60" style="background-color: #409eff">
              {{ member.names?.charAt(0) }}{{ member.last_name?.charAt(0) }}
            </el-avatar>
            <div>
              <h2 style="margin: 0">{{ member.names }} {{ member.last_name }}</h2>
              <p style="margin: 5px 0 0 0; color: #909399">Miembro ID: {{ member.id }}</p>
            </div>
          </div>
        </template>

        <el-descriptions :column="2" border>
          <el-descriptions-item label="Cédula" :span="1">
            {{ member.cc }}
          </el-descriptions-item>

          <el-descriptions-item label="Email" :span="1">
            {{ member.email }}
          </el-descriptions-item>

          <el-descriptions-item label="Teléfono" :span="1">
            {{ member.phone || 'No especificado' }}
          </el-descriptions-item>

          <el-descriptions-item label="Fecha de Nacimiento" :span="1">
            {{ formatDate(member.birthdate) }}
          </el-descriptions-item>

          <el-descriptions-item label="Nombres" :span="1">
            {{ member.names }}
          </el-descriptions-item>

          <el-descriptions-item label="Apellidos" :span="1">
            {{ member.last_name }}
          </el-descriptions-item>
        </el-descriptions>

        <div style="margin-top: 20px">
          <el-button type="warning">Editar Información</el-button>
          <el-button type="info">Ver Préstamos</el-button>
          <el-button type="danger">Eliminar Miembro</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>
