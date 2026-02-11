import { useState } from "react";
import ProductView from "./view/ProductView.jsx";
import { handleCalculateDays } from "./controller/productController.js";

const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const products = [
    { id: "p1", name: "Rose Glow Serum", brand: "Bloom" },
    { id: "p2", name: "Velvet Blush", brand: "Bloom" },
    { id: "p3", name: "Cherry Lip Oil", brand: "Bloom" },
    { id: "p4", name: "Petal Mist Toner", brand: "Bloom" },
    { id: "p5", name: "Silk Touch Primer", brand: "Bloom" }
  ];

  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const filteredProducts = products.filter((product) => {
    const label = `${product.name} ${product.brand}`.toLowerCase();
    return label.includes(search.trim().toLowerCase());
  });
  const selectedProduct = products.find((product) => product.id === selectedId) || null;

  const isPastDate = (d, m, y) => {
    const dateParts = [d, m, y].map((value) => Number(value));
    if (dateParts.some((value) => !Number.isInteger(value))) {
      return false;
    }
    const [dd, mm, yy] = dateParts;
    const inputDate = new Date(yy, mm - 1, dd);
    if (Number.isNaN(inputDate.getTime())) {
      return false;
    }
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const inputStart = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );
    return inputStart < start;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!selectedProduct) {
      setError("Select a product first");
      return;
    }
    if (isPastDate(day, month, year)) {
      setError("Expiration date cannot be in the past");
      return;
    }
    await handleCalculateDays({
      day,
      month,
      year,
      apiBase,
      setResult,
      setError,
      setLoading
    });
  };

  return (
    <ProductView
      day={day}
      month={month}
      year={year}
      search={search}
      setSearch={(value) => {
        setSearch(value);
        setSelectedId("");
        setResult(null);
      }}
      selectedId={selectedId}
      setSelectedId={(value) => {
        setSelectedId(value);
        setResult(null);
      }}
      products={filteredProducts}
      selectedProduct={selectedProduct}
      setDay={setDay}
      setMonth={setMonth}
      setYear={setYear}
      result={result}
      error={error}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
};

export default App;
