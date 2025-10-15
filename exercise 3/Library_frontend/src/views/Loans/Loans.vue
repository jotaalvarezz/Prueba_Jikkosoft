<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useLoans } from '@/composables/useLoans'
import loansColumns from './loansTable.js'

const { loans, error, fetchLoans, fetchActiveLoans, returnLoan } = useLoans()
const filterType = ref('all')

onMounted(() => {
  fetchLoans()
})

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const handleFilterChange = async () => {
  if (filterType.value === 'all') {
    await fetchLoans()
  } else if (filterType.value === 'active') {
    await fetchActiveLoans()
  } else if (filterType.value === 'returned') {
    const allLoans = await fetchLoans()
    loans.value = loans.value.filter((loan) => loan.returned_at !== null)
  }
}

const handleReturn = async (id) => {
  try {
    await returnLoan(id)
    ElMessage.success('Libro devuelto exitosamente')
    await handleFilterChange()
  } catch (err) {
    ElMessage.error('Error al devolver el libro')
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
      <h1>Préstamos</h1>
      <div style="display: flex; gap: 15px">
        <el-select v-model="filterType" @change="handleFilterChange" style="width: 150px">
          <el-option label="Todos" value="all"></el-option>
          <el-option label="Activos" value="active"></el-option>
          <el-option label="Devueltos" value="returned"></el-option>
        </el-select>
        <el-button type="primary" plain @click="$router.push('/loans/create')"
          >+ Nuevo Préstamo</el-button
        >
      </div>
    </div>

    <!-- Error -->
    <el-alert v-if="error" type="error" :title="error" :closable="false" />

    <!-- Sin préstamos -->
    <el-alert
      v-else-if="loans.length === 0"
      type="info"
      title="No hay préstamos registrados."
      :closable="false"
    />

    <!-- Tabla de préstamos -->
    <el-table v-else :data="loans" stripe style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column
        v-for="column of loansColumns"
        :key="column.label"
        :prop="column.prop"
        :label="column.label"
        :width="column.minWidth"
      />
      <el-table-column label="Miembro" min-width="200">
        <template #default="{ row }"> {{ row.member.names }} {{ row.member.last_name }} </template>
      </el-table-column>
      <el-table-column label="Fecha Préstamo" width="180">
        <template #default="{ row }">
          {{ formatDate(row.loan_date) }}
        </template>
      </el-table-column>
      <el-table-column label="Fecha Devolución" width="180">
        <template #default="{ row }">
          {{ formatDate(row.returned_at) }}
        </template>
      </el-table-column>
      <el-table-column label="Estado" width="120">
        <template #default="{ row }">
          <el-tag v-if="row.returned_at" type="success">Devuelto</el-tag>
          <el-tag v-else type="warning">Activo</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Acciones" width="80">
        <template #default="{ row }">
          <i
            v-if="!row.returned_at"
            class="fa-solid fa-check action-icon icon-green"
            @click="handleReturn(row.id)"
            title="Devolver"
          ></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.action-icon {
  cursor: pointer;
  margin: 0 8px;
}
.icon-green {
  color: #67c23a;
}
</style>
