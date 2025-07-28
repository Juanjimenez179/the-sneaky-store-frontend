import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [orden, setOrden] = useState("referencia");
  const [asc, setAsc] = useState(true);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(25);
  const [paginaActual, setPaginaActual] = useState(1);
  const [almacenes, setAlmacenes] = useState([]);
  const [almacenSeleccionado, setAlmacenSeleccionado] = useState("");

  useEffect(() => {
    fetch("https://the-sneaky-store.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        const almacenesUnicos = [...new Set(data.map((p) => p.almacen))];
        setAlmacenes(almacenesUnicos);
      })
      .catch(() => alert("Error al cargar inventario"));
  }, []);

  const productosFiltrados = productos.filter((p) => {
    const coincideFiltro = p.referencia.toLowerCase().includes(filtro.toLowerCase()) ||
                           p.color.toLowerCase().includes(filtro.toLowerCase());
    const coincideAlmacen = almacenSeleccionado ? p.almacen === almacenSeleccionado : true;
    return coincideFiltro && coincideAlmacen;
  });

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
    <div className="max-w-6xl mx-auto mt-8 space-y-6">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <Input
          placeholder="Buscar por referencia o color"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full md:w-1/2"
        />

        <Select value={almacenSeleccionado} onValueChange={setAlmacenSeleccionado}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por almacén" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            {almacenes.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <span>Registros por página:</span>
          <Select value={registrosPorPagina.toString()} onValueChange={(value) => setRegistrosPorPagina(Number(value))}>
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[25, 50, 100].map((num) => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {["referencia", "talla", "color", "cantidad", "almacen", "fecha"].map((col) => (
              <TableHead key={col} onClick={() => cambiarOrden(col)} className="cursor-pointer">
                {col.charAt(0).toUpperCase() + col.slice(1)} {orden === col && (asc ? "↑" : "↓")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {productosPagina.map((producto) => (
            <TableRow key={producto.id}>
              <TableCell>{producto.referencia}</TableCell>
              <TableCell>{producto.talla}</TableCell>
              <TableCell>{producto.color}</TableCell>
              <TableCell>{producto.cantidad}</TableCell>
              <TableCell>{producto.almacen}</TableCell>
              <TableCell>{new Date(producto.fecha).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center">
        <span>Página {paginaActual} de {totalPaginas}</span>
        <div className="space-x-2">
          <Button disabled={paginaActual === 1} onClick={() => setPaginaActual((p) => p - 1)}>Anterior</Button>
          <Button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual((p) => p + 1)}>Siguiente</Button>
        </div>
      </div>
    </div>
  );
}
