<script setup>
import { onMounted } from 'vue'
import { useLibraries } from '@/composables/useLibraries'

const { library, getLibrary } = useLibraries()

onMounted(() => {
  getLibrary()
})
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="library-info">
        <h3><i class="fa-solid fa-book"></i> Biblioteca Digital</h3>
        <p>Tu portal de acceso a miles de recursos digitales y conocimiento ilimitado.</p>
      </div>
      <div>
        <h4 style="margin-bottom: 15px">Servicios</h4>
        <div class="contact-details">
          <div class="contact-item">Catálogo Digital</div>
          <div class="contact-item">Préstamos</div>
          <div class="contact-item">Reservas</div>
        </div>
      </div>
      <div>
        <h4 style="margin-bottom: 15px">Contacto</h4>
        <div class="contact-details">
          <div class="contact-item">
            <i class="fa-solid fa-envelope"></i>
            <span v-if="library.email">{{ library.email }}</span>
            <span v-else>info@biblioteca.com</span>
          </div>
          <div class="contact-item">
            <i class="fa-solid fa-phone"></i>
            <span v-if="library.phone">{{ library.phone }}</span>
            <span v-else>+1 234 567 8900</span>
          </div>
          <div class="contact-item">
            <i class="fa-solid fa-location-dot"></i>
            <span v-if="library.address">{{ library.address }}</span>
            <span v-else>123 Calle Principal</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Biblioteca Digital. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #1e2a3a;
  color: white;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
}

.library-info {
  flex: 1;
  min-width: 250px;
}

.library-info h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: 600;
}

.library-info p {
  opacity: 0.8;
  line-height: 1.6;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-item i {
  color: #4a7ba7;
}

.contact-item strong {
  min-width: 80px;
  opacity: 0.9;
}

.contact-item span {
  opacity: 0.8;
}

.footer-bottom {
  background-color: #151f2b;
  padding: 15px 20px;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  opacity: 0.7;
  font-size: 0.9rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
