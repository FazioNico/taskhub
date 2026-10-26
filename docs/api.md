# API TaskHub

Base URL : `http://localhost:3001`

Toutes les erreurs ont la forme :

```json
{ "error": { "code": "NOT_FOUND", "message": "Tâche 42 introuvable" } }
```

Codes : `VALIDATION_ERROR` (400), `BAD_REQUEST` (400), `NOT_FOUND` (404), `INTERNAL` (500).

## Modèle `Task`

| Champ       | Type                              | Description           |
| ----------- | --------------------------------- | --------------------- |
| `id`        | string                            | Identifiant           |
| `title`     | string                            | 1 à 200 caractères    |
| `project`   | string                            | Nom du projet         |
| `status`    | `todo` \| `in_progress` \| `done` | Statut                |
| `dueDate`   | string \| null                    | Échéance `YYYY-MM-DD` |
| `createdAt` | string                            | Date ISO de création  |

## GET /tasks

Paramètres de requête optionnels : `project`, `status`.

Réponse `200` : tableau de `Task`.

## GET /tasks/:id

Réponse `200` : `Task`. Erreur `404` si introuvable.

## POST /tasks

Body :

```json
{ "title": "Écrire les tests", "project": "mobile", "dueDate": "2026-11-01" }
```

Réponse `201` : la `Task` créée, statut `todo`. Erreur `400` si le body est invalide.

## DELETE /tasks/:id

Réponse `204`. Erreur `404` si introuvable.
