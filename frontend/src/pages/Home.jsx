import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { useAuth } from "../context/AuthProvider";

import logoLight from "../assets/logo1.png";
import logoDark from "../assets/logo.png";
import { FaShippingFast, FaShieldAlt, FaStar } from "react-icons/fa";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { user, isAuthenticated, token } = useAuth();

  const loggedIn = isAuthenticated ?? !!token;

  const firstName =
    user?.name || (user?.email ? user.email.split("@")[0] : null);

  const currentLogo = theme === "dark" ? logoDark : logoLight;

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          padding: "80px 24px 48px",
          background:
            theme === "dark"
              ? "radial-gradient(circle at top, #1f2937 0, #020617 55%, #000 100%)"
              : "radial-gradient(circle at top, #e5f6ff 0, #f9fafb 55%, #ffffff 100%)",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2.5fr)",
            gap: 32,
            alignItems: "center",
          }}
        >
          {/* Lado esquerdo - texto */}
          <div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "var(--primary)",
                marginBottom: 12,
              }}
            >
              {loggedIn ? "Bem-vindo de volta" : "Novo jeito de comprar online"}
            </p>

            <h1 style={{ fontSize: 36, marginBottom: 12 }}>
              {loggedIn
                ? `Que bom te ver, ${firstName || "cliente"} 👋`
                : "Tudo o que você precisa em um único lugar"}
            </h1>

            <p className="muted" style={{ maxWidth: 520, marginBottom: 24 }}>
              {loggedIn ? (
                <>
                  Continue de onde parou, acompanhe seus pedidos e descubra
                  novidades pensadas para você.
                </>
              ) : (
                <>
                  Descubra produtos selecionados, entrega rápida e uma
                  experiência simples para você focar apenas no que importa.
                </>
              )}
            </p>

            {/* Botões principais */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Link
                to="/products"
                className="btn btn-primary"
                style={{ padding: "12px 22px", fontSize: 15 }}
              >
                Ver produtos
              </Link>

              {!loggedIn ? (
                <>
                  <Link
                    to="/register"
                    className="btn btn-secondary"
                    style={{ padding: "12px 22px", fontSize: 15 }}
                  >
                    Criar conta grátis
                  </Link>
                  <Link
                    to="/login"
                    className="muted"
                    style={{
                      textDecoration: "underline",
                      fontSize: 14,
                    }}
                  >
                    Já tenho conta
                  </Link>
                </>
              ) : (
                <Link
                  to="/account/orders"
                  className="btn btn-secondary"
                  style={{ padding: "12px 22px", fontSize: 15 }}
                >
                  Ver meus pedidos
                </Link>
              )}
            </div>

            {loggedIn && (
              <p
                className="muted"
                style={{ fontSize: 13, marginTop: 10, opacity: 0.9 }}
              >
                Dica: você pode acessar seu carrinho e pedidos pelo menu no topo
                a qualquer momento.
              </p>
            )}
          </div>

          {/* Lado direito - logo + features */}
          <div
            style={{
              justifySelf: "stretch",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "flex-end",
            }}
          >
            {/* Logo em destaque */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                borderRadius: 999,
                background:
                  theme === "dark"
                    ? "rgba(15,23,42,0.9)"
                    : "rgba(255,255,255,0.9)",
                boxShadow: "0 12px 30px rgba(15,23,42,0.35)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={currentLogo}
                  alt="NexusCart"
                  style={{ width: "90%", height: "auto", objectFit: "contain" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                    color: "var(--muted)",
                  }}
                >
                  NexusCart
                </p>
              </div>
            </div>

            {/* 3 cards de features */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 12,
                width: "100%",
                maxWidth: 420,
              }}
            >
              <FeatureCard
                icon={<FaShippingFast size={18} />}
                title="Entrega ágil"
                text="Envios rápidos para todo o Brasil."
              />
              <FeatureCard
                icon={<FaShieldAlt size={18} />}
                title="Compra segura"
                text="Pagamento criptografado e protegido."
              />
              <FeatureCard
                icon={<FaStar size={18} />}
                title="Experiência 5★"
                text="Interface pensada nos detalhes."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Seção de destaques */}
      <section style={{ padding: "32px 24px 64px" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gap: 24,
          }}
        >
          <div>
            <h2>Por que usar o NexusCart?</h2>
            <p className="muted" style={{ maxWidth: 640 }}>
              Este projeto foi pensado como um e-commerce completo: catálogo,
              detalhes do produto, carrinho, autenticação e pedidos. Ótimo para
              estudar front-end e back-end na prática.
            </p>
          </div>

          {/* Cards inferiores – mais organizados */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            <div
              className="card"
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span
                className="badge"
                style={{ alignSelf: "flex-start", marginBottom: 4 }}
              >
                Catálogo
              </span>
              <h3 style={{ margin: 0 }}>Lista de produtos</h3>
              <p className="muted">
                Explore todos os itens disponíveis com visual limpo, preço em
                destaque e botão de compra.
              </p>
              <Link to="/products" className="btn-link">
                Ver lista de produtos →
              </Link>
            </div>

            <div
              className="card"
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span
                className="badge"
                style={{ alignSelf: "flex-start", marginBottom: 4 }}
              >
                Checkout
              </span>
              <h3 style={{ margin: 0 }}>Carrinho & pedidos</h3>
              <p className="muted">
                Fluxo de compra completo, com resumo do pedido e área para
                acompanhar o histórico.
              </p>
              <p className="muted" style={{ fontSize: 13 }}>
                Recursos disponíveis após login.
              </p>
            </div>

            <div
              className="card"
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span
                className="badge"
                style={{ alignSelf: "flex-start", marginBottom: 4 }}
              >
                Tema
              </span>
              <h3 style={{ margin: 0 }}>Modo claro e escuro</h3>
              <p className="muted">
                Alterne o tema no cabeçalho e veja toda a interface se adaptar
                automaticamente ao seu gosto.
              </p>
            </div>
          </div>

          {!loggedIn && (
            <div
              className="card"
              style={{
                maxWidth: 760,
                margin: "8px auto 0",
                padding: 32,
                textAlign: "center",
                background: "var(--surface)",
              }}
            >
              <h2 style={{ fontSize: 26 }}>Comece sua jornada</h2>
              <p className="muted" style={{ marginTop: 8 }}>
                Crie sua conta para testar o fluxo completo de login, carrinho
                e pedidos.
              </p>
              <div style={{ marginTop: 20 }}>
                <Link
                  to="/register"
                  className="btn btn-primary"
                  style={{ padding: "10px 24px", fontSize: 15 }}
                >
                  Criar conta agora
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div
      className="card"
      style={{
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        {icon}
      </div>
      <strong style={{ fontSize: 14 }}>{title}</strong>
      <p className="muted" style={{ fontSize: 13 }}>
        {text}
      </p>
    </div>
  );
}
