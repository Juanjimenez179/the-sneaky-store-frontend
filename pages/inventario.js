import { useEffect, useState } from "react";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orden, setOrden] = useState("referencia");
  const [asc, setAsc] = useState(true);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(25);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    fetch("https://the-sneaky-store.onrender.com/products")
      .then((res) => res.json())
      .then(setProductos)
      .catch(() => alert("Error al cargar inventario"));
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.referencia.toLowerCase().includes(filtro.toLowerCase()) ||
    p.color.toLowerCase().includes(filtro.toLowerCase())
  );

  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (a[orden] < b[orden]) return asc ? -1 : 1;
    if (a[orden] > b[orden]) return asc ? 1 : -1;
    return 0;
  });

  const totalPaginas = Math.ceil(productosOrdenados.length / registrosPorPagina);
  const productosPagina = productosOrdenados.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );

  const cambiarOrden = (campo) => {
    if (orden === campo) setAsc(!asc);
    else {
      setOrden(campo);
      setAsc(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6 px-4">
      <div className="flex justify-between items-center">
        <input
          placeholder="Buscar por referencia o color"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-1/2 p-2 border rounded"
        />

        <div className="flex items-center gap-2">
          <span>Registros por página:</span>
          <select
            className="border p-2 rounded"
            value={registrosPorPagina}
            onChange={(e) => setRegistrosPorPagina(Number(e.target.value))}
          >
            {[25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            {["referencia", "talla", "color", "cantidad", "fecha"].map((col) => (
              <th
                key={col}
                onClick={() => cambiarOrden(col)}
                className="border px-4 py-2 cursor-pointer bg-sneakyBlue text-white"
              >
                {col.charAt(0).toUpperCase() + col.slice(1)} {orden === col && (asc ? "↑" : "↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productosPagina.map((producto) => (
            <tr key={producto.id} className="text-center">
              <td className="border px-4 py-2">{producto.referencia}</td>
              <td className="border px-4 py-2">{producto.talla}</td>
              <td className="border px-4 py-2">{producto.color}</td>
              <td className="border px-4 py-2">{producto.cantidad}</td>
              <td className="border px-4 py-2">{new Date(producto.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center">
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <div className="space-x-2">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual((p) => p - 1)}
            className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual((p) => p + 1)}
            className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

