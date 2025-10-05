# 🛒 Front-end — Jornada de Compra (Contribuição do Integrante)

Este documento descreve **minha contribuição no Front-end**, com foco na **Jornada de Compra** do e-commerce (do catálogo até a confirmação do pedido).  
O objetivo foi entregar uma experiência fluida, responsiva e alinhada ao back-end do projeto.

---

## 📌 Visão Geral do Projeto (Contexto)

- **Repositório:** fork de `Projeto-Full-Stackk/Main`.
- **Stack do Front-end citada no projeto:** React, React Router e Axios.
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
