# 🛒 Front-end — Jornada de Compra (Contribuição do Integrante)

Este documento descreve **minha contribuição no Front-end**, com foco na **Jornada de Compra** do e-commerce (do catálogo até a confirmação do pedido).  
O objetivo ainda não foi alcançado, porém os planos para a finalização do projeto estão em andamento.

---

## 📌 Visão Geral do Projeto (Contexto)

- **Repositório:** fork de `Projeto-Full-Stackk/Main`.
- **Stack do Front-end citada no projeto:** MERN.
- **Linguagens predominantes no repo:** JavaScript (~75%), CSS (~21.5%), HTML (~3.5%).

> Fonte (repositório): README e resumo de linguagens do GitHub.  
> *Detalhes públicos do repo confirmam o uso de React + React Router + Axios, além da divisão frontend/backend.* 

---

## 🚀 Escopo da Minha Entrega (Jornada de Compra)

Implementei e integrei o fluxo completo de compra no cliente web:

1. **Catálogo de Produtos (Listagem)**
   - Consumo da API para obter a lista de produtos (`GET /products`).
   - Exibição em grade com nome, preço e botão **Ver detalhes** / **Adicionar ao carrinho**.
   - Estado de carregamento e mensagem de erro quando necessário.

2. **Produto Detalhado**
   - Página dedicada para cada item (`/produto/:id`), com foto, descrição, preço, estoque e seleção de quantidade.
   - Ação **Adicionar ao Carrinho** com feedback visual (toast/alert).

3. **Carrinho**
   - Tela de carrinho com:
     - **Alterar quantidade**, **remover item** e **limpar carrinho**.
     - **Subtotal** por item e **total geral**.
   - Persistência do carrinho (ex.: `localStorage`) para manter o estado entre atualizações de página.

4. **Checkout**
   - Formulário de dados do comprador (nome, e-mail, endereço, etc.) com **validações** de campos obrigatórios.
   - Resumo do pedido (itens, quantidades, valores e total).
   - Envio do pedido para a API (ex.: `POST /orders`) com tratamento de sucesso/erro.

5. **Confirmação de Pedido**
   - Tela de confirmação exibindo número/ID do pedido retornado pela API.
   - Opções para **voltar ao catálogo** ou **ver pedido**.

---

## 🧭 Rotas Principais

| Rota | Descrição |
|------|-----------|
| `/` | Início / Catálogo de produtos |
| `/produto/:id` | Detalhes do produto |
| `/carrinho` | Carrinho de compras |
| `/checkout` | Finalização do pedido |
| `/confirmacao/:orderId?` | Confirmação do pedido |

> As rotas são gerenciadas com **React Router**, garantindo navegação SPA.

---

## 🧠 Estado & Armazenamento

- **Carrinho**: estrutura com `items: [{ productId, name, price, qty, subtotal }]` + `total`.
- **Ações**: `addItem`, `removeItem`, `updateQty`, `clearCart`.
- **Persistência**: sincronização com `localStorage` (carrega no mount e salva a cada alteração).

---

## 🔌 Integração com API

- **Listagem de produtos**: `GET /products`
- **Produto por ID**: `GET /products/:id`
- **Criar pedido**: `POST /orders`  
  Payload do pedido inclui: itens (id, qty, price), total, e dados do comprador (checkout).

**Config da URL base da API**  
Crie um `.env` no frontend e configure a variável de ambiente da sua ferramenta (exemplos comuns):

- Se for **Vite**:
VITE_API_URL=http://localhost:3001

- Se for **Create React App**:
REACT_APP_API_URL=http://localhost:3001


O cliente HTTP (Axios) utiliza `process.env.VITE_API_URL` **ou** `process.env.REACT_APP_API_URL` como `baseURL`.

---

## 🎨 UX e Feedbacks

- Indicadores de **loading** nas chamadas de rede.
- **Mensagens de erro** claras em falhas de requisição.
- **Toasts/alerts** ao adicionar item ao carrinho e ao finalizar pedido.
- **Botões desabilitados** enquanto a ação está em andamento (evita duplo clique no checkout).

---

## ✅ Testes Manuais (Cenários Cobertos)

- Adicionar múltiplos itens com quantidades diferentes.
- Atualizar quantidades no carrinho e validar totais.
- Remover item e limpar carrinho.
- Preencher checkout com e sem campos obrigatórios (validações).
- Simular falha da API para garantir mensagens de erro e estados de retry.
- Confirmar pedido e checar visualização do ID retornado.

---
src/
  components/
    ProductCard.jsx
    CartItem.jsx
  pages/
    Catalog.jsx          # Lista produtos
    ProductDetails.jsx   # Detalhe do produto
    Cart.jsx             # Carrinho
    Checkout.jsx         # Formulário e resumo
    Confirmation.jsx     # Confirmação do pedido
  routes/
    AppRoutes.jsx
  context/ (ou store/)
    CartContext.jsx      # Ações do carrinho e persistência
  services/
    api.js               # Axios configurado com baseURL do .env


## 🏗️ Como Executar Localmente

> **Pré-requisitos**: Node.js LTS e o **back-end** do projeto rodando (porta ex.: `3001`).


# 1) Clonar o projeto (fork) e entrar no frontend
git clone <seu-fork>
cd Main/frontend

# 2) Instalar dependências
npm install

# 3) Configurar a URL da API no .env (ver seção Integração com API)

# 4) Rodar o app
# Se o projeto usa Vite:
npm run dev
# ou, se usa Create React App:
npm start

---


