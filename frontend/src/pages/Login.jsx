import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    try {
      setLoading(true);

      const { data } = await api.post("/api/users/login", {
        email,
        password,
      });

      const token = data?.token;
      const user =
        data?.user ||
        data?.data ||
        (data?.email && { email: data.email }) || { email };

      setAuth({ token, user });
      navigate("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "32px 24px" }}>
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{
          padding: 24,
          maxWidth: 420,
          margin: "0 auto",
        }}
      >
        <h2>Entrar</h2>
        <p className="muted" style={{ marginBottom: 16 }}>
          Acesse sua conta para ver seus pedidos e continuar suas compras.
        </p>

        {err && (
          <p style={{ color: "var(--danger)", marginBottom: 8 }}>{err}</p>
        )}

        <label style={{ marginTop: 8 }}>Email</label>
        <input
          className="input"
          type="email"
          required
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{ marginTop: 12 }}>Senha</label>
        <input
          className="input"
          type="password"
          required
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ width: "100%", marginTop: 18 }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p
          className="muted"
          style={{ marginTop: 16, fontSize: 14, textAlign: "center" }}
        >
          Ainda não tem conta?{" "}
          <Link to="/register" className="btn-link">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}
