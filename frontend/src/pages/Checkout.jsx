import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const [addr, setAddr] = useState({
    nome: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const [cepError, setCepError] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

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
      setErr(e.response?.data?.message || "Falha ao carregar carrinho");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadCart(); }, []);

  const total = useMemo(() => {
    return (items || []).reduce((acc, i) => acc + (i.product?.price ?? 0) * i.qty, 0);
  }, [items]);

  function validateCep(cep) {
    return /^\d{8}$/.test(cep);
  }

  // DICA: Função extra para buscar CEP automático (opcional, mas melhora muito a UX)
  async function handleBlurCep() {
    if (validateCep(addr.cep)) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${addr.cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setAddr(prev => ({
            ...prev,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }));
        }
      } catch (error) {
        console.log("Erro ao buscar CEP");
      }
    }
  }

  async function placeOrder(e) {
    e.preventDefault();
    setCepError('');
    if (!items.length) {
      alert('Seu carrinho está vazio.');
      return;
    }
    // Validação simples
    if (!addr.nome || !addr.cep || !addr.rua || !addr.numero || !addr.cidade || !addr.estado) {
      alert('Preencha os campos obrigatórios.');
      return;
    }
    if (!validateCep(addr.cep)) {
      setCepError('CEP inválido. Digite 8 números.');
      return;
    }
    try {
      setSaving(true);
      const payload = { address: addr, note: '' };
      const { data } = await api.post('/api/orders', payload);
      navigate('/account/orders', { state: { placed: data?._id || true } });
    } catch (e) {
      alert(e.response?.data?.message || 'Erro ao finalizar pedido');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="card" style={{ padding: 20, margin: 20 }}>Carregando...</div>;
  if (err) return <div className="card" style={{ padding: 20, margin: 20, color: 'red' }}>{err}</div>;

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      display: 'grid', 
      // AQUI ESTA A MAGIA: Define 2 colunas. 
      // A primeira ocupa o espaço restante (1fr), a segunda fixa em 380px.
      gridTemplateColumns: '1fr 380px', 
      gap: '24px',
      alignItems: 'start'
    }}>
      
      {/* Formulário de Endereço */}
      <form onSubmit={placeOrder} className="card" style={{ padding: '24px' }}>
        <h2 style={{marginBottom: '20px'}}>Endereço de entrega</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Nome Completo */}
          <div>
            <label style={{display:'block', marginBottom:4}}>Nome completo*</label>
            <input 
              className="input" 
              style={{width: '100%'}}
              value={addr.nome} 
              onChange={e => setAddr({ ...addr, nome: e.target.value })} 
            />
          </div>

          {/* CEP e Bairro (Lado a lado) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{display:'block', marginBottom:4}}>CEP*</label>
              <input
                className="input"
                style={{width: '100%'}}
                value={addr.cep}
                onBlur={handleBlurCep} // Busca endereço ao sair do campo
                onChange={e => {
                  setAddr({ ...addr, cep: e.target.value.replace(/\D/g, '') });
                  setCepError('');
                }}
                maxLength={8}
                placeholder="Somente números"
              />
              {cepError && <span style={{ color: 'red', fontSize: 12, display:'block', marginTop:4 }}>{cepError}</span>}
            </div>
            <div>
              <label style={{display:'block', marginBottom:4}}>Bairro</label>
              <input 
                className="input" 
                style={{width: '100%'}}
                value={addr.bairro} 
                onChange={e => setAddr({ ...addr, bairro: e.target.value })} 
              />
            </div>
          </div>

          {/* Rua */}
          <div>
            <label style={{display:'block', marginBottom:4}}>Rua*</label>
            <input 
              className="input" 
              style={{width: '100%'}}
              value={addr.rua} 
              onChange={e => setAddr({ ...addr, rua: e.target.value })} 
            />
          </div>

          {/* Número e Complemento */}
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '16px' }}>
            <div>
              <label style={{display:'block', marginBottom:4}}>Número*</label>
              <input 
                className="input" 
                style={{width: '100%'}}
                value={addr.numero} 
                onChange={e => setAddr({ ...addr, numero: e.target.value })} 
              />
            </div>
            <div>
              <label style={{display:'block', marginBottom:4}}>Complemento</label>
              <input 
                className="input" 
                style={{width: '100%'}}
                value={addr.complemento} 
                onChange={e => setAddr({ ...addr, complemento: e.target.value })} 
              />
            </div>
          </div>

          {/* Cidade e UF */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '16px' }}>
            <div>
              <label style={{display:'block', marginBottom:4}}>Cidade*</label>
              <input 
                className="input" 
                style={{width: '100%'}}
                value={addr.cidade} 
                onChange={e => setAddr({ ...addr, cidade: e.target.value })} 
              />
            </div>
            <div>
              <label style={{display:'block', marginBottom:4}}>UF*</label>
              <input 
                className="input" 
                style={{width: '100%'}}
                value={addr.estado} 
                maxLength={2}
                onChange={e => setAddr({ ...addr, estado: e.target.value.toUpperCase() })} 
              />
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            type="submit" 
            disabled={saving}
            style={{marginTop: '10px', padding: '12px', fontSize: '16px'}}
          >
            {saving ? 'Processando...' : 'Finalizar pedido'}
          </button>
        </div>
      </form>

      {/* Resumo do Pedido (Sidebar) */}
      <aside className="card" style={{ padding: '24px', position: 'sticky', top: '20px' }}>
        <h2 style={{marginBottom: '20px'}}>Resumo do pedido</h2>
        {!items.length ? (
          <p className="muted">Carrinho vazio.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map(i => {
              const id = i.product?._id || i.product;
              const name = i.product?.name || 'Produto indisponível';
              const price = i.product?.price ?? 0;
              const img = i.product?.images?.[0] || 'https://via.placeholder.com/100x80';
              
              return (
                <div key={id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: '12px', alignItems: 'center' }}>
                  <img src={img} alt={name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6, background: '#333' }} />
                  <div style={{overflow: 'hidden'}}>
                    <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
                    <div className="muted" style={{fontSize: '0.9rem'}}>Qtd: {i.qty}</div>
                  </div>
                  <div style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>R$ {Number(price * i.qty).toFixed(2)}</div>
                </div>
              );
            })}
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--border, #333)', margin: '8px 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem' }}>
              <span>Total</span>
              <span style={{color: 'var(--primary, #00ff00)'}}>R$ {Number(total).toFixed(2)}</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}