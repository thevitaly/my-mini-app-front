import { useEffect, useState } from "react";

export default function App() {
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [cars, setCars] = useState([]);

    const API_URL = "https://my-backend-yzkf.onrender.com";


  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    loadCars();
  }, []);

  async function loadCars() {
    const res = await fetch(`${API_URL}/api/cars`);
    const data = await res.json();
    setCars(data.cars);
  }

  async function saveCar() {
    if (!model || !year) return;

    await fetch(`${API_URL}/api/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, year }),
    });

    setModel("");
    setYear("");
    loadCars();
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Добавить автомобиль</h2>

      <input
        style={inputStyle}
        placeholder="Марка"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />

      <input
        style={inputStyle}
        placeholder="Год"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button style={buttonStyle} onClick={saveCar}>
        Сохранить
      </button>

      <h3 style={{ marginTop: "30px" }}>Список</h3>

      {cars.map((c, i) => (
        <div key={i} style={itemStyle}>
          {c.model} — {c.year}
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  marginTop: "10px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  background: "#2ea6ff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const itemStyle = {
  padding: "10px 0",
  borderBottom: "1px solid #ddd",
};
