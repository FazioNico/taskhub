# TaskHub

API REST de gestion de tâches, projet fil rouge de la formation **AI Dev Tools – Outils et Méthodes pour développeurs** (Nomades).

## Installation

```bash
npm install
npm run dev     # http://localhost:3001
npm test
```

## Endpoints

| Méthode | Route                     | Description                                     |
| ------- | ------------------------- | ----------------------------------------------- |
| GET     | `/health`                 | État du service                                 |
| GET     | `/tasks?project=&status=` | Liste des tâches, filtrables                    |
| GET     | `/tasks/:id`              | Une tâche                                       |
| POST    | `/tasks`                  | Crée une tâche (`title`, `project`, `dueDate?`) |
| DELETE  | `/tasks/:id`              | Supprime une tâche                              |

Détail : [docs/api.md](docs/api.md) et [docs/openapi.yaml](docs/openapi.yaml).

Exemple :

```bash
curl -X POST localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Écrire les tests","project":"mobile","dueDate":"2026-11-01"}'
```

## Structure

```
src/
  app.ts            création de l'app Express
  server.ts         démarrage + données de démo
  db.ts             stockage en mémoire
  errors.ts         AppError + middleware d'erreurs
  routes/tasks.ts   routes /tasks
  services/         logique métier
tests/              tests Vitest + Supertest
legacy/report.js    ancien générateur de rapport (exercice 1)
docs/               documentation d'API, ADR
```

## Fichiers pour les assistants IA

- `CLAUDE.md` : contexte projet pour Claude Code
- `.github/copilot-instructions.md` : contexte projet pour GitHub Copilot
- `.claude/commands/` : commandes slash personnalisées (`/review`, `/tdd`)
