import { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const almacenes = ["Almacén Centro", "Almacén Norte", "Almacén Sur"];
const tallasDisponibles = ["35", "36", "37", "38", "39", "40", "41", "42", "43"];

export default function Registro() {
  const router = useRouter();
  const [referencia, setReferencia] = useState("");
  const [color, setColor] = useState("");
  const [talla, setTalla] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [almacen, setAlmacen] = useState("");

  const handleRegistro = async () => {
    if (!referencia || !color || !talla || !cantidad || !almacen) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("https://the-sneaky-store.onrender.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ referencia, color, talla, cantidad: Number(cantidad), almacen })
      });

      if (response.ok) {
        alert("Producto registrado exitosamente.");
        router.push("/inventario");
      } else {
        alert("Error al registrar el producto.");
      }
    } catch (error) {
      console.error("Error registrando el producto:", error);
      alert("Error de conexión.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sneakyBlue px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-sneakyPink">Registro de Mercancía</h1>

        <Input placeholder="Referencia" value={referencia} onChange={(e) => setReferencia(e.target.value)} />
        <Input placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} />

        <Select value={talla} onValueChange={setTalla}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una talla" />
          </SelectTrigger>
          <SelectContent>
            {tallasDisponibles.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input placeholder="Cantidad" type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />

        <Select value={almacen} onValueChange={setAlmacen}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un almacén" />
          </SelectTrigger>
          <SelectContent>
            {almacenes.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="w-full bg-sneakyPink text-white hover:bg-pink-600" onClick={handleRegistro}>
          Registrar
        </Button>
      </div>
    </div>
  );
}
