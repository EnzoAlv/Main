import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import ThemeToggle from "./ThemeToggle";
import CartBadge from "./CartBadge";
import "../styles/header.css";

export default function Header() {
  const { user, token, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const loggedIn = isAuthenticated ?? !!token;

  function handleLogout() {
    logout();
    navigate("/");
  }

  const firstName =
    user?.name || (user?.email ? user.email.split("@")[0] : null);

  return (
    <header className="shop-header">
      <div className="shop-container">
        {/* Logo */}
        <Link to="/" className="shop-logo">
          <span className="dot" />
          <span>NexusCart</span>
        </Link>

        {/* Navegação principal */}
        <nav className="shop-nav">
          <Link
            to="/"
            className={
              "shop-link" +
              (location.pathname === "/" ? " shop-link-active" : "")
            }
          >
            Início
          </Link>

          <Link
            to="/products"
            className={
              "shop-link" +
              (location.pathname.startsWith("/products")
                ? " shop-link-active"
                : "")
            }
          >
            Produtos
          </Link>

          {loggedIn && (
            <Link
              to="/account/orders"
              className={
                "shop-link" +
                (location.pathname.startsWith("/account")
                  ? " shop-link-active"
                  : "")
              }
            >
              Meus pedidos
            </Link>
          )}
        </nav>

        {/* Ações à direita */}
        <div className="shop-actions">
          {/* Tema */}
          <ThemeToggle />

          {/* Carrinho */}
          <CartBadge />

          {/* Login / Logout */}
          {!loggedIn ? (
            <div className="shop-auth">
              <Link to="/login" className="shop-btn-outline">
                Entrar
              </Link>
              <Link to="/register" className="shop-btn">
                Criar conta
              </Link>
            </div>
          ) : (
            <div className="shop-auth">
              <span className="shop-user">
                Olá, <strong>{firstName || "cliente"}</strong>
              </span>
              <button
                type="button"
                className="shop-btn-danger"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
