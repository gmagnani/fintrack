# 📈 FinTrack

O **FinTrack** é um painel de controle financeiro moderno e interativo. Ele permite que os usuários acompanhem e gerenciem seus ganhos, gastos e investimentos de forma intuitiva, fornecendo visualizações gráficas e tabelas detalhadas para manter a saúde financeira sob controle.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias e bibliotecas:

- **[React](https://reactjs.org/)**: Biblioteca JavaScript para construção da interface de usuário.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build rápida para o ambiente de desenvolvimento.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework utility-first para estilização rápida e responsiva.
- **[shadcn/ui](https://ui.shadcn.com/)** & **[Radix UI](https://www.radix-ui.com/)**: Componentes acessíveis e personalizáveis.
- **[Recharts](https://recharts.org/)**: Biblioteca para criação de gráficos dinâmicos.
- **[React Router](https://reactrouter.com/)**: Mapeamento de rotas e navegação da SPA.
- **[React Query (@tanstack)](https://tanstack.com/query)**: Gerenciamento de estado de requisições e cache.
- **[React Hook Form](https://react-hook-form.com/)** & **[Zod](https://zod.dev/)**: Criação de formulários e validação de esquemas.

## ✨ Funcionalidades

- **Dashboard Resumo**: Visualize o saldo total, ganhos, gastos e investimentos.
- **Gráficos Integrados**: Análise visual da proporção entre diferentes tipos de transações.
- **Gestão de Transações**: Crie, edite e exclua transações rapidamente através de modais interativos.
- **Filtros e Visualização**: Tabela interativa para listar as transações, com suporte a ordenação e filtros de data.
- **Autenticação**: Controle de acesso seguro utilizando tokens JWT com auto-refresh.

## 📋 Pré-requisitos

Para rodar este projeto localmente, você precisará ter instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** (versão 18+ recomendada)
- **[npm](https://www.npmjs.com/)** ou **yarn / pnpm** (gerenciador de pacotes)
- *(Opcional)* Git, para clonagem do repositório.

## 🛠️ Instalação e Execução

Siga o passo a passo abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SeuUsuario/fintrack.git
   cd fintrack
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   Abra o seu navegador e acesse `http://localhost:5173`.

## 🔐 Variáveis de Ambiente

Neste momento da aplicação, o projeto consome uma API de homologação através de uma URL configurada nativamente na instância do Axios (`src/lib/axios.js`). Portanto, **não existem chaves de ambiente (`.env`) obrigatórias** para rodar o projeto neste momento.

*(Caso necessite apontar para uma API local, basta modificar a URL base).*

## 📁 Estrutura de Pastas

A estrutura base da pasta `src/` está organizada da seguinte forma, focada em separação de responsabilidades (SoC):

```text
src/
├── api/          # Integrações com API e Hooks assíncronos (React Query)
├── assets/       # Arquivos estáticos (ex: imagens e vetores)
├── components/   # Componentes globais, específicos e elementos reúsáveis da UI (shadcn)
├── constants/    # Variáveis globais contantes
├── contexts/     # Provedores de contexto do React (Ex: AuthProvider)
├── forms/        # Configuração do uso do React Hook Form e Schemas Zod 
├── helpers/      # Funções utilitárias (formatação monetária, manipulação de datas)
├── lib/          # Instâncias de bibliotecas (Axios, Class Merge do Tailwind)
└── pages/        # Componentes que representam telas inteiras (Roteamento)
```

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Siga os passos:

1. Faça um **Fork** do projeto.
2. Crie uma nova branch com a sua feature: `git checkout -b minha-feature`.
3. Faça o commit das suas alterações: `git commit -m 'feat: Minha nova feature'`.
4. Faça o push para a branch: `git push origin minha-feature`.
5. Abra um **Pull Request**.

> Dúvidas ou encontrou um bug? Sinta-se à vontade para abrir uma Issue no repositório.

## 🌐 Deploy / Demonstração

> **[Insira o link para o deploy ou demo do projeto aqui, ex: https://fintrack.vercel.app]**

---

*Desenvolvido em conformidade com as melhores orientações e padrões do ecossistema front-end React.*
