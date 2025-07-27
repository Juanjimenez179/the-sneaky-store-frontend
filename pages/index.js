import { useState } from "react";
import { useRouter } from "next/router";

const admins = ["Elizabeth-Cardona20", "Gio-Cardona20"];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://the-sneaky-store.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
  
      if (!response.ok) {
        alert("Usuario o contraseña incorrectos");
        return;
      }
  
      const data = await response.json();
      // Guardar el token si lo necesitas
      localStorage.setItem("token", data.access_token);
      router.push("/inventario");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sneakyBlue px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-sneakyPink">The Sneaky Store</h1>
        <input
          type="text"
          placeholder="Usuario"
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-sneakyPink text-white py-2 rounded-md hover:bg-pink-600 transition"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
