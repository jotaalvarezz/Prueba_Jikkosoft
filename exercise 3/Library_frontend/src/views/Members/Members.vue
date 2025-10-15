<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useMembers } from '@/composables/useMembers'
import membersColumns from './membersTable.js'

const { members, member, error, fetchMembers, fetchMemberById, deleteMember } = useMembers()
const viewModalVisible = ref(false)

onMounted(() => {
  fetchMembers()
})

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('es-ES')
}

const viewMember = async (id) => {
  await fetchMemberById(id)
  viewModalVisible.value = true
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('¿Estás seguro de eliminar este miembro?', 'Confirmar eliminación', {
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    })
    await deleteMember(id)
    ElMessage.success('Miembro eliminado')
  } catch (err) {
    if (err !== 'cancel') {
      ElMessage.error('Error al eliminar')
    }
  }
}
</script>

<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      "
    >
      <h1>Miembros</h1>
      <el-button type="primary" plain @click="$router.push('/members/create')">
        + Nuevo Miembro
      </el-button>
    </div>

    <!-- Error -->
    <el-alert v-if="error" type="error" :title="error" :closable="false" />

    <el-alert
      v-else-if="members.length === 0"
      type="info"
      title="No hay miembros registrados."
      :closable="false"
    />

    <el-table v-else :data="members" stripe style="width: 100%">
      <el-table-column type="index" label="#" width="80" />
      <el-table-column label="Nombre Completo" min-width="200">
        <template #default="{ row }"> {{ row.names }} {{ row.last_name }} </template>
      </el-table-column>
      <el-table-column
        v-for="column in membersColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
      />
      <el-table-column label="Fecha de Nacimiento" width="180">
        <template #default="{ row }">
          {{ formatDate(row.birthdate) }}
        </template>
      </el-table-column>
      <el-table-column label="Acciones" width="120" fixed="right">
        <template #default="{ row }">
          <i
            class="fa-solid fa-eye action-icon icon-blue"
            @click="viewMember(row.id)"
            title="Ver"
          ></i>
          <i
            class="fa-solid fa-pen-to-square action-icon icon-yellow"
            @click="$router.push(`/members/${row.id}/edit`)"
            title="Editar"
          ></i>
          <i
            class="fa-solid fa-trash action-icon icon-red"
            @click="handleDelete(row.id)"
            title="Eliminar"
          ></i>
        </template>
      </el-table-column>
    </el-table>

    <!-- Modal Ver Miembro -->
    <el-dialog v-model="viewModalVisible" title="Detalles del Miembro" width="500px">
      <el-descriptions v-if="member" :column="1" border>
        <el-descriptions-item label="Cédula">{{ member.cc }}</el-descriptions-item>
        <el-descriptions-item label="Nombres">{{ member.names }}</el-descriptions-item>
        <el-descriptions-item label="Apellidos">{{ member.last_name }}</el-descriptions-item>
        <el-descriptions-item label="Email">{{ member.email }}</el-descriptions-item>
        <el-descriptions-item label="Teléfono">{{ member.phone || '-' }}</el-descriptions-item>
        <el-descriptions-item label="Fecha de Nacimiento">{{
          formatDate(member.birthdate)
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<style scoped>
.action-icon {
  cursor: pointer;
  margin: 0 8px;
}
.icon-blue {
  color: #409eff;
}
.icon-yellow {
  color: #e6a23c;
}
.icon-red {
  color: #f56c6c;
}
</style>
