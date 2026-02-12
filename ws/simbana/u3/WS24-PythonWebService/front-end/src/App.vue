<script setup>
import './assets/style.css'
</script>
 

<template>
  <div>
    <h2>Customers</h2>

    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Type</th>
          <th>Discount</th>
          <th>Total Sale</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="c in customers" :key="c._id">
          <td>{{ c.id }}</td>
          <td>{{ c.fullName }}</td>
          <td>{{ c.email }}</td>
          <td>{{ c.type }}</td>
          <td>{{ c.discount }}%</td>
          <td>{{ c.totalSale }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customers: []
    }
  },
  async mounted() {
    const res = await fetch("http://127.0.0.1:8000/customers")
    this.customers = await res.json()
  }
}
</script>

<style>
</style>
