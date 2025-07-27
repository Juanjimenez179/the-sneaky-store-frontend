import { useState } from "react";

export default function Registro() {
  const [formulario, setFormulario] = useState({
    referencia: "",
    talla: "34",
    color: "",
    cantidad: 1,
  });

  const tallas = Array.from({ length: 11 }, (_, i) => 34 + i); // 34 al 44

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://the-sneaky-store.onrender.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulario),
    });

    if (res.ok) {
      alert("Producto registrado con éxito");
      setFormulario({ referencia: "", talla: "34", color: "", cantidad: 1 });
    } else {
      alert("Error al registrar producto");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-sneakyPink mb-6">
        Registrar nuevo producto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-xl shadow">
        <div>
          <label className="block mb-1 font-semibold">Referencia</label>
          <input
            name="referencia"
            value={formulario.referencia}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Talla</label>
          <select
            name="talla"
            value={formulario.talla}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {tallas.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Color</label>
          <input
            name="color"
            value={formulario.color}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            min="1"
            value={formulario.cantidad}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sneakyPink text-white font-semibold py-2 rounded hover:bg-pink-600 transition"
        >
          Registrar producto
        </button>
      </form>
    </div>
  );
}
