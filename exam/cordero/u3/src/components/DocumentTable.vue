<script setup>
const props = defineProps({
  documents: {
    type: Array,
    required: true
  },
  dataSource: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['delete', 'add'])

const truncateDescription = (desc) => {
  if (!desc) return 'Sin descripción'
  const maxLength = 60
  return desc.length > maxLength ? desc.substring(0, maxLength) + '...' : desc
}

const truncateTitle = (title) => {
  if (!title) return 'Sin título'
  const maxLength = 50
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title
}


const formatId = (id) => {
  if (!id) return 'N/A'
  return id.toString().substring(0, 8) + '...'
}
</script>

<template>
  <div class="table-container">
    <table v-if="documents.length > 0">
      <!-- Tabla de Productos -->
      <thead v-if="dataSource === 'productos'">
        <tr>
          <th class="col-nombre">Nombre</th>
          <th class="col-marca">Marca</th>
          <th class="col-categoria">Categoría</th>
          <th class="col-precio">Precio</th>
          <th class="col-stock">Stock</th>
          <th class="col-descripcion">Descripción</th>
          <th class="col-sku">SKU</th>
          <th class="col-activo">Estado</th>
          <th class="col-acciones">Acciones</th>
        </tr>
      </thead>
      <tbody v-if="dataSource === 'productos'">
        <tr v-for="doc in documents" :key="doc._id">
          <td class="col-nombre" :title="doc.nombre"><strong>{{ truncateTitle(doc.nombre) }}</strong></td>
          <td class="col-marca">{{ doc.marca }}</td>
          <td class="col-categoria">{{ doc.categoria }}</td>
          <td class="col-precio">${{ doc.precio?.toLocaleString() }}</td>
          <td class="col-stock" :class="{ 'low-stock': doc.stock < 10 }">{{ doc.stock }}</td>
          <td class="col-descripcion" :title="doc.descripcion"><small>{{ truncateDescription(doc.descripcion) }}</small></td>
          <td class="col-sku"><small>{{ doc.sku }}</small></td>
          <td class="col-activo">
            <span :class="doc.activo ? 'badge-active' : 'badge-inactive'">
              {{ doc.activo ? '✓ Activo' : '✗ Inactivo' }}
            </span>
          </td>
          <td class="col-acciones">
            <button class="btn-add" @click="emit('add', doc)">+ Agregar</button>
            <button class="btn-delete" @click="emit('delete', doc)">🗑 Eliminar</button>
          </td>
        </tr>
      </tbody>
      
      <!-- Tabla de Carrito -->
      <thead v-if="dataSource === 'carrito'">
        <tr>
          <th class="col-id">ID</th>
          <th class="col-usuario">Usuario ID</th>
          <th class="col-productos">Productos</th>
          <th class="col-total">Total</th>
          <th class="col-estado">Estado</th>
          <th class="col-fecha">Fecha Creación</th>
          <th class="col-metodo">Método Pago</th>
          <th class="col-direccion">Dirección Envío</th>
        </tr>
      </thead>
      <tbody v-if="dataSource === 'carrito'">
        <tr v-for="doc in documents" :key="doc._id">
          <td class="col-id" :title="doc._id"><small>{{ formatId(doc._id) }}</small></td>
          <td class="col-usuario" :title="doc.usuarioId"><small>{{ formatId(doc.usuarioId) }}</small></td>
          <td class="col-productos">
            <span class="badge-products">{{ doc.cantidadProductos }} items</span>
          </td>
          <td class="col-total"><strong>${{ doc.total?.toLocaleString() }}</strong></td>
          <td class="col-estado">
            <span :class="doc.estado === 'activo' ? 'badge-active' : 'badge-inactive'">
              {{ doc.estado }}
            </span>
          </td>
          <td class="col-fecha">{{ doc.fechaCreacion }}</td>
          <td class="col-metodo">{{ doc.metodoPago }}</td>
          <td class="col-direccion" :title="doc.direccionEnvio"><small>{{ truncateDescription(doc.direccionEnvio) }}</small></td>
        </tr>
      </tbody>
    </table>
    
    <div v-else class="no-data">
      No se encontraron documentos
    </div>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #1a1a1a;
  font-size: 0.85rem;
}

thead {
  background-color: #646cff;
  position: sticky;
  top: 0;
}

th {
  padding: 0.6rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

td {
  padding: 0.5rem 0.6rem;
  border-bottom: 1px solid #333;
}

tbody tr {
  transition: background-color 0.2s;
}

tbody tr:hover {
  background-color: #2a2a2a;
}

tbody tr:last-child td {
  border-bottom: none;
}

.col-nombre {
  width: 20%;
  min-width: 150px;
}

.col-marca {
  width: 10%;
  min-width: 100px;
}

.col-categoria {
  width: 10%;
  min-width: 100px;
}

.col-precio {
  width: 10%;
  min-width: 80px;
  text-align: right;
  font-weight: 600;
  color: #4ade80;
}

.col-stock {
  width: 8%;
  min-width: 60px;
  text-align: center;
  font-weight: 600;
}

.low-stock {
  color: #ff6b6b;
}

.col-descripcion {
  width: 25%;
  min-width: 150px;
  color: #aaa;
  line-height: 1.2;
}

.col-sku {
  width: 10%;
  min-width: 90px;
  text-align: center;
  color: #999;
}

.col-activo {
  width: 10%;
  min-width: 80px;
  text-align: center;
}

.col-acciones {
  width: 10%;
  min-width: 90px;
  text-align: center;
}


.plos-link:hover {
  color: #535bf2;
  transform: scale(1.3);
}


.badge-active {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background-color: #4ade80;
  color: #1a1a1a;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.badge-inactive {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background-color: #ff6b6b;
  color: white;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.badge-products {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background-color: #646cff;
  color: white;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.btn-delete {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-add {
  background: #22c55e;
  color: #fff;
  border: none;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 0.4rem;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-add:hover {
  background: #16a34a;
}

.btn-delete:hover {
  background: #dc2626;
}

.btn-delete:active {
  transform: scale(0.97);
}

/* Columnas para Carrito */
.col-id {
  width: 8%;
  min-width: 80px;
  text-align: center;
  color: #999;
}

.col-usuario {
  width: 8%;
  min-width: 80px;
  text-align: center;
  color: #999;
}

.col-productos {
  width: 10%;
  min-width: 80px;
  text-align: center;
}

.col-total {
  width: 10%;
  min-width: 90px;
  text-align: right;
  font-weight: 600;
  color: #4ade80;
}

.col-estado {
  width: 10%;
  min-width: 90px;
  text-align: center;
}

.col-fecha {
  width: 12%;
  min-width: 100px;
  text-align: center;
}

.col-metodo {
  width: 12%;
  min-width: 100px;
  text-align: center;
}

.col-direccion {
  width: 20%;
  min-width: 150px;
  color: #aaa;
}

.no-data {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #888;
}

small {
  font-size: 0.8rem;
}

@media (prefers-color-scheme: light) {
  table {
    background-color: #ffffff;
  }
  
  td {
    border-bottom-color: #e0e0e0;
  }
  
  tbody tr:hover {
    background-color: #f5f5f5;
  }
  
  .col-descripcion {
    color: #666;
  }
}
</style>
