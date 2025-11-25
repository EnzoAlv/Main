# 🛒 NexusCart – E-commerce Full Stack

Aplicação full stack de e-commerce desenvolvida para a disciplina de Desenvolvimento Web, com foco em:

- **Frontend moderno** em React (Vite), responsivo e com modo claro/escuro  
- **Backend REST** em Node.js + Express  
- Integração com **dois bancos de dados** (MongoDB + SQLite)  
- **Autenticação com JWT**, hash de senha com bcrypt e rotas protegidas  
- **Containerização com Docker** (frontend + backend + MongoDB)

---

## 📌 1. Visão Geral

O **NexusCart** simula uma loja virtual simples, onde usuários podem:

- Criar conta e fazer login  
- Navegar pela lista de produtos  
- Ver detalhes de um produto  
- Adicionar itens ao carrinho  
- Visualizar o carrinho e o resumo da compra  
- (Estrutura preparada para finalização de pedido)

Além disso, o projeto demonstra conceitos importantes da disciplina:

- Separação clara entre frontend e backend  
- Padrão de API REST  
- Uso combinado de **NoSQL (MongoDB)** e **SQL (SQLite)**  
- Autenticação e autorização com tokens JWT  
- Boas práticas de segurança no armazenamento de senhas  
- Dockerfiles e `docker-compose` para subir o ambiente em containers

---

## 🧩 2. Funcionalidades Principais

### 🖥️ Frontend (React + Vite)

- Interface moderna e responsiva
- Modo claro/escuro via `ThemeContext`
- Páginas:
  - `Home` – página inicial da aplicação
  - `Products` – listagem de produtos
  - `ProductDetail` – detalhes de um produto
  - `Login` – autenticação de usuários
  - `Register` – criação de conta
  - `Cart` – carrinho de compras (rota protegida)
  - `Checkout` – fluxo de finalização (rota protegida)
  - `Orders` – histórico de pedidos (rota protegida)
- Contexto de autenticação (`AuthProvider`) com:
  - Persistência de usuário e token no `localStorage`
  - Logout global
- Rotas protegidas com `ProtectedRoute` (React Router v6):
  - Somente usuários logados acessam `/cart`, `/checkout` e `/account/orders`

---

### ⚙️ Backend (Node.js + Express)

- API REST organizada por recursos:
  - `/api/users` – autenticação e dados do usuário
  - `/api/products` – catálogo de produtos
  - `/api/cart` – carrinho de compras por usuário logado
  - `/api/orders` – estrutura para pedidos
- Middleware de autenticação `protect`:
  - Valida o token JWT enviado no header `Authorization: Bearer <token>`
  - Anexa o `id` do usuário à requisição (`req.user`)
- Middleware `admin` (exemplo de autorização por perfil)
- Seed de dados:
  - Criação de usuário administrador e usuário comum
  - Inserção de produtos de exemplo (camiseta, mouse gamer, headset etc.)

---

### 🗄️ Bancos de Dados: SQL + NoSQL

O projeto utiliza **dois tipos de banco**, atendendo ao requisito da disciplina:

#### 🟢 NoSQL – MongoDB (Atlas)

Utilizado para os dados principais:

- `users` – usuários do sistema
- `products` – catálogo de produtos
- `orders` – estrutura para pedidos
- `cart` – itens de carrinho associados ao usuário

A conexão é feita via Mongoose, com `MONGODB_URI` em variáveis de ambiente.

#### 🔵 SQL – SQLite

Utilizado para **logging em banco relacional**:

- Arquivo `backend/data/nexuscart.db`
- Tabela `login_logs`, com colunas:
  - `id`
  - `user_id`
  - `email`
  - `created_at`
- Registro automatizado de logins bem-sucedidos

Isso demonstra claramente o uso de **NoSQL para dados de domínio** e **SQL para logging/auditoria** na mesma aplicação.

---

### 🔐 Segurança

- Senhas NUNCA são salvas em texto plano
- `User` model com:
  - `pre('save')` para hashear senhas com **bcrypt** antes de salvar
  - método `matchPassword` para comparar senha digitada com o hash
- Tokens JWT:
  - Gerados ao fazer login ou registrar
  - Assinados com `JWT_SECRET` do `.env`
  - Utilizados em rotas protegidas via header `Authorization: Bearer <token>`

---

### 🐳 Containerização (Docker)

- `backend/Dockerfile` – imagem do servidor Node/Express
- `frontend/Dockerfile` – imagem do app React (Vite)
- `docker-compose.yml` na raiz:
  - Sobe:
    - `mongo` (banco NoSQL)
    - `backend`
    - `frontend`

Em ambiente com Docker instalado, é possível levantar tudo com um único comando (detalhes mais abaixo).

---

## 🏗️ 3. Arquitetura da Aplicação

### Diagrama (alto nível)

```text
                  ┌──────────────────────────┐
                  │        FRONTEND          │
                  │    React + Vite (SPA)    │
                  │                          │
                  │  - Páginas: Home,        │
                  │    Products, Cart, etc.  │
                  │  - AuthContext           │
                  │  - ThemeContext          │
                  └───────────┬──────────────┘
                              │ HTTP (JSON)
                              │
                              ▼
                  ┌──────────────────────────┐
                  │         BACKEND          │
                  │   Node.js + Express      │
                  │                          │
                  │  Rotas REST:             │
                  │   /api/users             │
                  │   /api/products          │
                  │   /api/cart              │
                  │   /api/orders            │
                  │                          │
                  │  Auth: JWT + bcrypt      │
                  │  Middleware: protect     │
                  └───────┬─────────┬────────┘
                          │         │
                          │         │
          NoSQL (domínio) ▼         ▼ SQL (logs)
     ┌──────────────────────┐   ┌─────────────────┐
     │      MongoDB Atlas   │   │     SQLite      │
     │  - users             │   │  login_logs     │
     │  - products          │   └─────────────────┘
     │  - orders            │
     │  - carrinho          │
     └──────────────────────┘
```
## 4. Tecnologias Utilizadas
Frontend

React

Vite

React Router DOM (v6)

Context API (Auth + Theme)

CSS modularizado em /styles

Backend

Node.js

Express

Mongoose (MongoDB ODM)

SQLite3

bcryptjs

jsonwebtoken

dotenv

Multer (para upload de imagens, se utilizado)

Banco de Dados

MongoDB (Atlas)

SQLite (arquivo local)

Outros

Docker + Docker Compose (containerização)

npm como gerenciador de pacotes

## 📁 5. Estrutura de Pastas (simplificada)
Projeto Ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js          # Conexão MongoDB
│   │   │   └── sqlite.js      # Conexão SQLite
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── seeds/
│   │   │   └── seeds.js       # Seed de usuários e produtos
│   │   └── server.js          # App Express
│   ├── data/
│   │   └── nexuscart.db       # Banco SQLite
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   ├── AuthProvider.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Checkout.jsx
│   │   ├── styles/
│   │   │   ├── base.css
│   │   │   ├── theme.css
│   │   │   └── cart.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   └── vite.config.js
│
├── docker-compose.yml
└── README.md


(A estrutura pode variar levemente, mas a ideia geral é essa.)

## ⚙️ 6. Como Rodar o Projeto (sem Docker)
6.1. Pré-requisitos

Node.js (versão 18+ recomendada)

npm

Conta no MongoDB Atlas ou instância local do MongoDB

6.2. Backend – Configuração e Execução

Acesse a pasta do backend:

cd backend


Instale as dependências:

npm install


Crie um arquivo .env na pasta backend com o seguinte conteúdo (exemplo):

MONGODB_URI=mongodb+srv://USUARIO:SENHA@cluster.../nexuscart
JWT_SECRET=umsegredobemforte
PORT=4000

SEED_ADMIN_EMAIL=admin@nexusc.art
SEED_ADMIN_PASS=admin123
SEED_USER_EMAIL=user@nexusc.art
SEED_USER_PASS=user123


Rode o seed (para criar usuários e produtos padrão):

node src/seeds/seeds.js


Inicie o servidor backend:

npm run dev


O backend ficará disponível em:
👉 http://localhost:4000

6.3. Frontend – Configuração e Execução

Em outro terminal, acesse a pasta do frontend:

cd frontend


Instale as dependências:

npm install


Crie um arquivo .env na pasta frontend (se necessário):

VITE_API_URL=http://localhost:4000


Inicie o frontend:

npm run dev


O frontend ficará disponível em (porta padrão do Vite):
👉 http://localhost:5173

## 🐳 7. Como Rodar com Docker (opcional)
7.1. Pré-requisitos

Docker

Docker Compose

7.2. Comando único

Na raiz do projeto (onde está docker-compose.yml):

docker compose up --build


Isso irá:

Construir a imagem do backend

Construir a imagem do frontend

Subir um container do mongo

Portas esperadas:

Backend: http://localhost:4000

Frontend: http://localhost:5173

## 🔗 8. Rotas Principais da API
Autenticação / Usuário

POST /api/users/register – cria um novo usuário

POST /api/users/login – autentica e retorna token JWT

GET /api/users/me – dados do usuário logado (rota protegida)

Produtos

GET /api/products – lista todos os produtos

GET /api/products/:id – detalhes de um produto

Carrinho (rota protegida – requer token)

GET /api/cart – obtém itens do carrinho do usuário logado

POST /api/cart – adiciona item ao carrinho do usuário

DELETE /api/cart/:productId – remove um item específico

Pedidos (estrutura pronta para expansão)

GET /api/orders – lista pedidos do usuário logado

POST /api/orders – cria um novo pedido (fluxo a ser expandido)

## 🔑 9. Fluxo de Autenticação e Rotas Protegidas

Usuário se registra em /register ou faz login em /login.

Backend retorna um token JWT + dados básicos do usuário.

O frontend salva:

token no localStorage

user no localStorage

O AuthProvider:

Configura api.defaults.headers.common.Authorization = Bearer <token>

Disponibiliza user e logout via Context

Rotas protegidas:

No frontend: ProtectedRoute só permite acesso se houver token

No backend: protect valida JWT antes de processar a rota

## Projeto desenvolvido pelos integrantes:
// Enzo Alvarenga Mariano //
Túlio Teixeira //
Felipe Pucci //
Sarah Costa //

## como parte da disciplina de Desenvolvimento Web.
