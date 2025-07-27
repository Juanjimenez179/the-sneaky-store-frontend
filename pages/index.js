import { useState } from "react";
import { useRouter } from "next/router";

const admins = ["Elizabeth-Cardona20", "Gio-Cardona20"];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (admins.includes(username) && password === "1234") {
      router.push("/inventario");
    } else {
      alert("Usuario o contraseña incorrectos");
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
