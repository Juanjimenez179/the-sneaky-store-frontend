import { useState } from "react";

export default function Registro() {
  const [formData, setFormData] = useState({
    referencia: "",
    talla: "",
    color: "",
    cantidad: "",
    almacen: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí después conectaremos el backend
    console.log("Formulario enviado:", formData);
    alert("Mercancía registrada (aún sin guardar en la base de datos)");
  };

  return (
    <div className="min-h-screen bg-sneakyBlue flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold text-sneakyPink text-center">Registrar Mercancía</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="referencia"
            placeholder="Referencia"
            value={formData.referencia}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            name="talla"
            placeholder="Talla"
            value={formData.talla}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <select
            type="text"
            name="almacen"
            placeholder="Nombre del Almacén"
            value={formData.almacen}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Selecciona un almacén</option>
            <option value="Almacén Centro">Almacén Centro</option>
            <option value="Almacén Bello">Almacén Bello</option>
            <option value="Almacén Itagüí">Almacén Itagüí</option>
            <option value="Almacén Online">Almacén Online</option>
          </select>

          <button
            type="submit"
            className="w-full bg-sneakyPink text-white py-2 rounded-md hover:bg-pink-600 transition"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

