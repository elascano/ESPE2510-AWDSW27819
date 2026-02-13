import { useMemo, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function App() {
  const [product, setProduct] = useState({
    name: '',
    // array required by backend: [day, month, year]
    expiration: ['', '', '']
  })
  const [productId, setProductId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const isValid = useMemo(() => {
    const [d, m, y] = product.expiration
    const day = Number(d), month = Number(m), year = Number(y)
    return Number.isInteger(day) && Number.isInteger(month) && Number.isInteger(year)
  }, [product])

  const onChangeDate = (index) => (e) => {
    const v = e.target.value
    setProduct(p => ({ ...p, expiration: p.expiration.map((x, i) => i === index ? v : x) }))
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/days-to-expire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error desconocido')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function fetchById() {
    setError('')
    setResult(null)
    const id = Number(productId)
    if (!Number.isInteger(id) || id < 1) {
      setError('Product id must be a positive integer')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/days-to-expire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Days Until Expiration</h1>

      <div className="card">
        <label>
          Search product by ID
          <input inputMode="numeric" placeholder="e.g. 1" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        <button onClick={fetchById} disabled={loading}>Fetch & Compute</button>
      </div>

      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          {result.name && <strong>{result.name}</strong>}
          {result.expired ? (
            <p>Expired {result.daysLeft} day(s) ago.</p>
          ) : (
            <p>{result.daysLeft} day(s) remaining until expiration.</p>
          )}
          <small>Expiration (ISO): {result.expirationISO}</small>
        </div>
      )}

      <footer>
        <small>
          API: <code>{API_URL}</code>
        </small>
      </footer>
    </div>
  )
}
