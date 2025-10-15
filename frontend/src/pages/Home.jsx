import { useContext } from 'react';
import { Link } from "react-router-dom";
import ThemeContext from '../context/ThemeContext'; 
import logoLight from "../assets/logo1.png";       
import logoDark from "../assets/logo.png";      
import { FaShippingFast, FaShieldAlt, FaStar } from "react-icons/fa";

export default function Home() {
 
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <div
        style={{
          padding: "96px 24px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, var(--surface) 0%, rgba(34,197,94,.08) 100%)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <img 
            src={theme === 'dark' ? logoDark : logoLight} 
            alt="NexusCart Logo" 
            style={{ width: 140, height: "auto", marginBottom: 24 }} 
          />
          
          <h1 style={{ fontSize: "42px", fontWeight: "700" }}>
            Bem-vindo à NexusCart
          </h1>
          <p className="muted" style={{ fontSize: "18px", marginTop: 8 }}>
            Produtos exclusivos com a melhor qualidade e design.
          </p>

          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
            <Link to="/products" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '16px' }}>
              Ver todos os produtos
            </Link>
            <Link to="/login" className="btn btn-outline" style={{ padding: '12px 24px', fontSize: '16px' }}>
              Entrar
            </Link>
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: "80px 24px" }}>
        <div className="grid" style={{ maxWidth: 960, margin: '0 auto' }}>

          <article className="card" style={{ padding: 32, textAlign: 'center' }}>
            <FaStar size={32} style={{ color: 'var(--primary)', marginBottom: 16 }} />
            <h2>Seleção Premium</h2>
            <p className="muted">Curadoria com foco em design e qualidade.</p>
          </article>


          <article className="card" style={{ padding: 32, textAlign: 'center' }}>
            <FaShippingFast size={32} style={{ color: 'var(--primary)', marginBottom: 16 }} />
            <h2>Entrega Ágil</h2>
            <p className="muted">Envios rastreados e prazos transparentes.</p>
          </article>
          <article className="card" style={{ padding: 32, textAlign: 'center' }}>
            <FaShieldAlt size={32} style={{ color: 'var(--primary)', marginBottom: 16 }} />
            <h2>Suporte e Segurança</h2>
            <p className="muted">Atendimento humano e compra 100% segura.</p>
          </article>
        </div>
      </div>
    
      <div style={{ background: 'var(--bg)', padding: '80px 24px' }}>
        <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: 48, textAlign: 'center', background: 'var(--surface)' }}>
          <h2 style={{ fontSize: '28px' }}>Comece sua jornada</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            Descubra ofertas exclusivas e as últimas novidades ao criar a sua conta.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '16px' }}>
              Criar conta agora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}