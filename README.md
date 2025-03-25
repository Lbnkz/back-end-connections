# back-end-connections

Este repositório contém um **back-end em Node.js** para execução dinâmica de queries em múltiplos bancos de dados (**Oracle, Firebird, MySQL e PostgreSQL**).  

O objetivo é permitir que um **front-end** se conecte ao back-end, envie os parâmetros da conexão e a query desejada, e receba os resultados da consulta.

## 🚀 Tecnologias Utilizadas

- **Linguagem:** Node.js
- **Framework:** Express.js
- **Bancos de Dados:** Oracle, Firebird, MySQL, PostgreSQL
- **ORMs e Bibliotecas:**
  - pg (PostgreSQL)
  - oracledb (Oracle)
  - node-firebird (Firebird)
  - mysql2 (Mysql)
- **Autenticação:** JWT
- **Outros:** Docker, dotenv, Winston (logs)

## ⚙️ Como Funciona?

1. **No front-end**, o usuário preenche:
   - Tipo do banco de dados (ex: MySQL, PostgreSQL)
   - Host, porta, usuário e senha
   - Nome do banco de dados
   - Query SQL a ser executada
   #### **📍 Endpoint**
    ```http
    POST /v1/execute-query
    ```

2. **O front-end envia uma requisição para o back-end**, como:

   ```json
   {
     "dbType": "mysql",
     "host": "localhost",
     "port": 3306,
     "username": "root",
     "password": "12345",
     "database": "meubanco",
     "query": "SELECT * FROM usuarios"
   }
   ```

3. **O back-end executa a query** e retorna os resultados:

   ```json
   {
     "success": true,
     "data": [
       { "id": 1, "nome": "Lucas", "email": "lucas@email.com" },
       { "id": 2, "nome": "Maria", "email": "maria@email.com" }
     ]
   }
   ```

## 🔧 Configuração do Ambiente

### 📌 Pré-requisitos

- **Node.js** instalado (18+ recomendado)
- **Banco de Dados configurado**
- **Variáveis de ambiente** (`.env.example` disponível)

### 📥 Instalação

```bash
npm install
```

### ▶️ Executando o Projeto

```bash
npm run dev
```

O servidor será iniciado na porta definida no `.env` (padrão: **3000**).

## 📂 Estrutura do Projeto

```
back-end-connections/
│── src/
│   ├── config/            # Configuração dos bancos de dados
│   ├── database/          # Conexões dinâmicas
│   ├── routes/            # Rotas da API
│   ├── controllers/       # Lógica das requisições
│   ├── services/          # Regras de negócio
│── .env.example           # Exemplo de variáveis de ambiente
│── package.json           # Dependências do projeto
│── README.md              # Documentação
│── server.js              # Ponto de entrada da aplicação
```

## 📌 Próximos Passos

- [ ] Criar autenticação e autorização (JWT)
- [ ] Implementar logs e auditoria
- [ ] Criar um front-end para interação com o sistema
- [ ] Melhorar tratamento de erros e segurança

## 🤝 Contribuição

Se quiser contribuir, abra uma **issue** ou **pull request**!

---