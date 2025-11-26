import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard"; // redirect
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-[#222] p-6 rounded-xl w-96 text-white space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && (
          <div className="bg-red-600 text-white p-2 rounded">{error}</div>
        )}

        <input
          className="w-full p-2 rounded bg-[#333] text-white"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-[#333] text-white"
          type="password"
          placeholder="admin123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-[#3194A0] p-2 rounded text-white font-bold">
          Login
        </button>
      </form>
    </div>
  );
}
