import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function loadCart() {
    try {
      setLoading(true);
      const { data } = await api.get("/api/cart");
      const arr = Array.isArray(data) ? data : data?.items || [];
      setItems(arr);
      setErr("");
    } catch (e) {
      console.error("Erro ao carregar carrinho", e);
      setItems([]);
      setErr(e.response?.data?.message || "Falha ao carregar o carrinho.");
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(productId) {
    try {
      await api.delete(`/api/cart/${productId}`);
      await loadCart();
    } catch (e) {
      console.error("Erro ao remover item", e);
    }
  }

  async function clearCart() {
    try {
      if(!window.confirm("Tem certeza que deseja esvaziar o carrinho?")) return;
      await api.delete("/api/cart/remove-all");
      await loadCart();
    } catch (e) {
      console.error("Erro ao limpar carrinho", e);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <div style={{padding: 20}}>Carregando...</div>;
  if (err) return <div style={{padding: 20, color: 'red'}}>{err}</div>;

  const total = items.reduce(
    (acc, i) => acc + (i.product?.price ?? 0) * (i.qty ?? 0),
    0
  );

  if (!items || items.length === 0)
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <h2>🛒 Meu Carrinho</h2>
        <p className="muted" style={{marginTop: 20}}>Seu carrinho está vazio.</p>
        <button className="btn btn-primary" style={{marginTop: 20}} onClick={() => navigate('/')}>
          Ir para a loja
        </button>
      </div>
    );

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <h2 style={{ marginBottom: '24px' }}>🛒 Meu Carrinho</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px', 
        gap: '24px',
        alignItems: 'start'
      }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item) => {
            const product = item.product || {};
            const id = product._id || item.product;
            const name = product.name || "Produto";
            const price = product.price ?? 0;
            const img = product.images?.[0] || "https://via.placeholder.com/120x90";

            return (
              <div key={id} className="card" style={{ 
                padding: '16px', 
                display: 'grid', 
                gridTemplateColumns: '100px 1fr auto',
                gap: '16px',
                alignItems: 'center'
              }}>
                <img
                  src={img}
                  alt={name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    background: '#333'
                  }}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{name}</h4>
                  <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
                    Quantidade: {item.qty}
                  </p>
                  <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--primary, #00ff00)' }}>
                    R$ {(price * item.qty).toFixed(2)}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => removeItem(id)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #ff4444',
                      color: '#ff4444',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            );
          })}

          <div style={{textAlign: 'right', marginTop: '10px'}}>
             <button 
                onClick={clearCart} 
                style={{
                  background: 'transparent', 
                  color: '#ccc', 
                  border: 'none', 
                  textDecoration: 'underline', 
                  cursor: 'pointer'
                }}
              >
               Limpar carrinho inteiro
             </button>
          </div>
        </div>
        <div className="card" style={{ 
          padding: '24px', 
          position: 'sticky', 
          top: '20px',
          height: 'fit-content'
        }}>
          <h3 style={{ marginTop: 0 }}>Resumo</h3>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border, #444)', margin: '16px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.2rem', fontWeight: 'bold' }}>
             <span>Total</span>
             <span>R$ {total.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary" 
            style={{ width: '100%', padding: '14px', fontSize: '1rem', cursor: 'pointer' }}
            onClick={() => navigate("/checkout")}
          >
            Finalizar compra
          </button>
          
          <button 
            style={{ width: '100%', marginTop: '10px', background: 'transparent', border:'none', color: '#aaa', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Continuar comprando
          </button>
        </div>

      </div>
    </div>
  );
}