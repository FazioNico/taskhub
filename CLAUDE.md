# TaskHub

API REST de gestion de tâches (projet fil rouge de la formation AI Dev Tools).

## Stack

- Node.js 20+, Express 5, TypeScript strict (exécuté avec tsx)
- Validation : Zod
- Tests : Vitest + Supertest, couverture minimale 80 % sur `src/`
- Stockage : en mémoire (`src/db.ts`), pas de base de données

## Commandes

- `npm run dev` : serveur local sur http://localhost:3001 (données de démo chargées)
- `npm test` : tests
- `npm run coverage` : tests + couverture
- `npm run lint` : ESLint + Prettier
- `npm run typecheck` : vérification TypeScript

## Architecture

- `src/routes/` : une route = un fichier, validation Zod des entrées, aucune logique métier
- `src/services/` : logique métier, lève des `AppError`
- `src/db.ts` : accès aux données, seul fichier qui manipule le stockage
- `tests/` : tests Vitest, un fichier par route ou service
- `legacy/` : ancien code à refactorer (exercice 1)

## Conventions

- Pas de `any`
- Erreurs : toujours via la classe `AppError` (`src/errors.ts`), jamais `res.status(4xx)` à la main
- Dates d'échéance : chaînes `YYYY-MM-DD`, fuseau de référence Europe/Zurich
- Messages de commit : Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`)

## À ne pas faire

- Ne pas modifier un test existant pour le faire passer : corriger le code
- Ne pas ajouter de dépendance sans le signaler
- Ne pas modifier `src/seed.ts` (utilisé par les tests)
