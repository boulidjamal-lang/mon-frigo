# Mon Frigo 🧊

Application web (page unique, `index.html`) de gestion de garde-manger connecté : suivi du stock d'aliments, menu de la semaine, liste de courses et suggestions de recettes à partir de ce qu'il reste au frigo.

## Aperçu

- Interface en français, responsive (pensée mobile d'abord), avec mode sombre.
- Fonctionne comme une simple page HTML statique (pas de build, pas de serveur applicatif).
- Persistance des données via [Supabase](https://supabase.com) — à configurer une fois dans l'onglet **Réglages** de l'application (URL + clé du projet).

## Déploiement

Le site est publié automatiquement sur **GitHub Pages** à chaque push sur `main`, via le workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

Pour l'activer côté GitHub (une seule fois) :

1. Aller dans **Settings → Pages** du dépôt.
2. Sous **Build and deployment → Source**, choisir **GitHub Actions**.
3. Pousser sur `main` (ou relancer le workflow manuellement depuis l'onglet **Actions**) : le site devient accessible à l'URL indiquée dans l'onglet Pages.

## Configuration après déploiement

Une fois le site en ligne, ouvrir l'onglet **Réglages ⚙️** dans l'application et renseigner les identifiants Supabase (URL du projet + clé publique `anon`) pour que le stock, le menu et la liste de courses se sauvegardent réellement.

## Développement local

Aucune dépendance à installer : ouvrir directement `index.html` dans un navigateur, ou servir le dossier avec un petit serveur statique, par exemple :

```bash
npx http-server -p 8080
```
