<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useMembers } from '@/composables/useMembers'

const router = useRouter()
const route = useRoute()
const { member, fetchMemberById, createMember, updateMember } = useMembers()
const error = ref(null)

const isEditing = computed(() => route.name === 'member-edit')
const memberId = computed(() => route.params.id)

const memberModel = ref({
  cc: '',
  names: '',
  last_name: '',
  email: '',
  phone: '',
  birthdate: '',
})

onMounted(async () => {
  if (isEditing.value) {
    await fetchMemberById(memberId.value)
    if (member.value) {
      memberModel.value = { ...member.value }
    }
  }
})

const handleSubmit = async () => {
  error.value = null
  try {
    if (isEditing.value) {
      await updateMember(memberId.value, memberModel.value)
      ElMessage.success('Miembro actualizado')
    } else {
      await createMember(memberModel.value)
      ElMessage.success('Miembro creado')
    }
    setTimeout(() => router.push('/members'), 1000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Error'
  }
}
</script>

<template>
  <div style="max-width: 800px; margin: 0 auto">
    <el-card>
      <template #header>
        <div style="text-align: center; font-size: 20px; font-weight: bold">
          {{ isEditing ? 'Editar Miembro' : 'Agregar Miembro' }}
        </div>
      </template>

      <el-alert
        v-if="error"
        type="error"
        :title="error"
        :closable="false"
        style="margin-bottom: 20px"
      />

      <el-form :model="memberModel" label-position="top" @submit.prevent="handleSubmit">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Cédula" required>
              <el-input
                type="number"
                v-model="memberModel.cc"
                placeholder="Ej: 1234567890"
                maxlength="50"
                show-word-limit
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Email" required>
              <el-input
                v-model="memberModel.email"
                type="email"
                placeholder="Ej: juan@ejemplo.com"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Nombres" required>
              <el-input
                v-model="memberModel.names"
                placeholder="Ej: Juan Carlos"
                maxlength="150"
                show-word-limit
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Apellidos" required>
              <el-input
                v-model="memberModel.last_name"
                placeholder="Ej: Pérez García"
                maxlength="150"
                show-word-limit
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Teléfono">
              <el-input type="number" v-model="memberModel.phone" placeholder="Ej: 3001234567" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Fecha de Nacimiento">
              <el-date-picker
                v-model="memberModel.birthdate"
                type="date"
                placeholder="Selecciona una fecha"
                style="width: 100%"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- Botones -->
        <el-form-item style="margin-top: 20px">
          <el-button type="primary" plain native-type="submit"> Guardar Miembro </el-button>
          <el-button type="danger" plain @click="router.push('/members')">Cancelar</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped></style>
