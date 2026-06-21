# Night Café

Um planner pessoal leve, com paleta **Latte**, que roda inteiramente no navegador — sem backend, sem banco de dados, sem conta. Tudo fica salvo no `localStorage` do seu próprio dispositivo.

🔗 **Live:** [night-cafe.vercel.app](https://night-cafe.vercel.app/)

## Sobre o projeto

Night Café é a evolução de um projeto anterior chamado **All Hour**, reconstruído com uma abordagem *local-first*: em vez de depender de um servidor e de um banco Postgres, todos os dados — tarefas, blocos semanais, categorias e sessões de pomodoro — são persistidos diretamente no `localStorage`, com uma camada de serviços que imita uma API assíncrona (`get`, `create`, `update`, `delete`), facilitando trocar a implementação no futuro sem reescrever as páginas.

## Funcionalidades

- **Weekly Planner** — organize blocos de tempo por dia da semana, vinculados a categorias.
- **Daily Tasks** — lista de tarefas do dia, com categoria, status de conclusão e resumo (concluídas/pendentes).
- **Pomodoro Timer** — ciclos de foco e descanso (curto/longo) com contador de sessões, vinculável a uma tarefa ativa.
- **Settings** — gerenciamento de categorias usadas para organizar tarefas e blocos.

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [react-router-dom](https://reactrouter.com/) (client-side routing)
- CSS Modules
- `localStorage` como única camada de persistência

## Rodando localmente

```bash
git clone https://github.com/GabeNune/Night-Cafe.git
cd Night-Cafe
npm install
npm run dev
```

O app abre em `http://localhost:5173` (porta padrão do Vite).

## Build

```bash
npm run build
npm run preview
```

## Deploy

O projeto está hospedado na [Vercel](https://vercel.com/). Como é uma SPA com rotas via `BrowserRouter`, o arquivo `vercel.json` na raiz garante que qualquer rota (`/tasks`, `/pomodoro`, `/settings`) seja redirecionada para o `index.html`, evitando 404 em reloads.

## Estrutura

```
src/
├── components/      # componentes compartilhados (Topbar, etc.)
├── pages/           # Weekly, Tasks, Pomodoro, Settings
├── routes/          # configuração de rotas
├── services/        # camada de acesso ao localStorage
└── styles/          # estilos globais e paleta Latte
```

## Status

Projeto pessoal, em desenvolvimento contínuo.
