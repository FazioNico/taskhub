# ADR 0001 – Stockage en mémoire

- Statut : accepté
- Date : 2026-10-22

## Contexte

TaskHub sert de support de formation. Les participants doivent pouvoir cloner le projet et lancer les tests en moins de deux minutes, sur des machines hétérogènes, sans installer de base de données.

## Décision

Les données sont stockées en mémoire dans `src/db.ts`. Ce module est le seul point d'accès aux données, ce qui permet de le remplacer plus tard (SQLite, Postgres) sans toucher aux services.

## Conséquences

- Installation triviale, tests rapides et isolés (`db.reset()`)
- Les données sont perdues à chaque redémarrage
- Pas de concurrence ni de transactions : inadapté à la production
