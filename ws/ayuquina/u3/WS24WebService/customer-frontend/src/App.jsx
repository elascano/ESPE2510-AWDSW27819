import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = 'https://universidad-1i99.onrender.com/oopdatabase/customers'
  //sadasdasd

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos')
        }
        return response.json()
      })
      .then(data => {
        setCustomers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="loading">Loading data...</div>
  }

  if (error) {
    return (
      <div className="error">
        <strong>Error:</strong> {error}
        <br />
        <small>Asegúrate de que el servidor Python esté corriendo en http://localhost:8000</small>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Customer Management System</h1>     
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Discount (%)</th>
            <th>Total Sale ($)</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id?.$oid || customer.id}>
              <td>{customer.id}</td>
              <td>{customer.fullName}</td>
              <td>{customer.email}</td>
              <td>{customer.type}</td>
              <td>{customer.discount}</td>
              <td>${customer.totalSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
