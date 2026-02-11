const ProductView = ({
  day,
  month,
  year,
  search,
  setSearch,
  selectedId,
  setSelectedId,
  products,
  selectedProduct,
  setDay,
  setMonth,
  setYear,
  result,
  error,
  loading,
  onSubmit
}) => {
  return (
    <div className="page">
      <header className="hero">
        <p className="tag">Bloom Cosmetics</p>
        <h1>Find Products</h1>
        <p className="subtitle">Search and select a product before calculating expiry.</p>
      </header>

      <main className="card">
        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label>
              Search
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name"
              />
            </label>
          </div>

          <div className="field">
            <label>
              Select product
              <select
                className="select"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                required
              >
                <option value="">Choose one</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} · {product.brand}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="row">
            <label>
              Day
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="DD"
                required
              />
            </label>
            <label>
              Month
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="MM"
                required
              />
            </label>
            <label>
              Year
              <input
                type="number"
                inputMode="numeric"
                min="2020"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
                required
              />
            </label>
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </form>

        {selectedProduct && (
          <div className="alert info">
            <p>Selected: {selectedProduct.name}</p>
            <p>Brand: {selectedProduct.brand}</p>
          </div>
        )}
        {error && <div className="alert error">{error}</div>}
        {result && (
          <div className="alert success">
            <p>Days left to sell: {result.daysLeft}</p>
            <p>Expiration date: {result.product.expiresAt}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductView;
