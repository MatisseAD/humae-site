# Humae – Site Officiel

Site web du cabinet d'expertise comptable **Humae** (Brindas, 69). Construit avec Next.js 16 App Router, Supabase (base de données + stockage), Resend (email), et déployé sur Vercel.

---

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation locale](#installation-locale)
3. [Variables d'environnement](#variables-denvironnement)
4. [Architecture et modèle d'authentification](#architecture-et-modèle-dauthentification)
5. [Pages et routes API](#pages-et-routes-api)
6. [Workflow admin/membre](#workflow-adminmembre)
7. [Configuration Supabase](#configuration-supabase)
8. [Contraintes de l'upload](#contraintes-de-lupload)
9. [Checklist de maintenance](#checklist-de-maintenance)
10. [Déploiement Vercel](#déploiement-vercel)

---

## Prérequis

- **Node.js** >= 20.9
- **npm** >= 9
- Un projet **Supabase** avec les tables `team`, `news`, `users` et le bucket de stockage `uploads`
- Un compte **Resend** pour l'envoi d'emails
- Un compte **Vercel** pour le déploiement (optionnel en local)

---

## Installation locale

```bash
git clone https://github.com/MatisseAD/humae-site.git
cd humae-site
npm install
cp .env.example .env.local   # puis remplir les variables
npm run dev
```

L'application est disponible sur http://localhost:3000.

---

## Variables d'environnement

Copier `.env.example` vers `.env.local` et remplir chaque valeur :

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Clé API Resend pour l'envoi du formulaire de contact |
| `RESEND_FROM_EMAIL` | Expéditeur vérifié dans Resend |
| `CONTACT_EMAIL_TO` | Destinataire des demandes du formulaire |
| `ADMIN_PASSWORD` | Mot de passe de connexion au tableau de bord admin |
| `ADMIN_JWT_SECRET` | Secret JWT pour signer les tokens administrateur (>= 32 caractères) |
| `MEMBER_JWT_SECRET` | Secret JWT distinct pour les comptes membres (>= 32 caractères) |
| `SUPABASE_URL` | URL de votre projet Supabase (côté serveur uniquement) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé de service Supabase – **ne jamais exposer côté client** |
| `NEXT_PUBLIC_SUPABASE_URL` | Même origine Supabase, utilisée pour l’allowlist stricte des images publiques |

> **Important:** les mots de passe et secrets JWT ne doivent jamais être commités. Utiliser deux secrets JWT différents et les générer avec `openssl rand -base64 48`.

---

## Architecture et modèle d'authentification

### Admin

- Route : `POST /api/login`
- Vérifie `{ password }` contre `ADMIN_PASSWORD` (variable d'environnement).
- Émet un JWT typé (rôle, audience et émetteur vérifiés ; expiration 7 jours) dans le cookie `adminAuth` (httpOnly, secure en prod).
- Toutes les routes d'écriture protégées via `lib/authGuard.ts -> requireAdmin()`.

### Membre

- Route : `POST /api/user-login`
- Mots de passe hachés avec **`crypto.scrypt`** (Node.js natif, pas de dépendance externe).
- Migration transparente : anciens hachages SHA-256 détectés et remplacés par scrypt à la prochaine connexion.
- JWT membre `{ role, userId }`, signé avec un secret distinct et une audience dédiée, dans le cookie `userAuth` (expiration 30 jours, httpOnly, secure en prod).

---

## Pages et routes API

| URL | Description | Auth |
|---|---|---|
| `/` | Page d'accueil | Public |
| `/contact` | Formulaire de contact | Public |
| `/admin/login` | Connexion admin | – |
| `/admin` | Tableau de bord admin | Admin JWT |
| `/member/login` | Connexion membre | – |
| `/member` | Tableau de bord membre | Membre JWT |
| `GET /api/team` | Liste équipe | Public |
| `POST /api/team` | Ajouter membre | Admin |
| `PUT /api/team/[id]` | Modifier membre | Admin ou membre propriétaire |
| `DELETE /api/team/[id]` | Supprimer membre | Admin |
| `GET /api/news` | Liste actualités | Public |
| `POST/PUT/DELETE /api/news/*` | CRUD actualités | Admin |
| `GET /api/users` | Liste utilisateurs | Admin |
| `POST /api/users` | Créer utilisateur | Admin |
| `GET /api/users/[id]` | Détail utilisateur | Admin ou membre propriétaire |
| `DELETE /api/users/[id]` | Supprimer utilisateur | Admin |
| `POST /api/upload` | Upload image vérifié | Admin ou membre propriétaire |

---

## Workflow admin/membre

### Créer un compte membre

1. Se connecter à `/admin`.
2. Dans **Équipe**, ajouter le profil (nom, rôle, photo).
3. Dans **Utilisateurs**, créer un identifiant en associant le membre.
4. Communiquer les identifiants au membre ; il se connecte via `/member/login`.

### Modifier un profil membre

Le membre connecté peut mettre à jour son URL LinkedIn et sa photo de profil depuis `/member`.

---

## Configuration Supabase

### Tables requises

```sql
create table team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  "imageSrc" text not null default '',
  "linkedinUrl" text
);

create table news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null default '',
  content text not null,
  "imageSrc" text not null default ''
);

create table users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  "passwordHash" text not null,
  "memberId" uuid references team(id)
);
```

### Bucket de stockage

Créer un bucket public nommé **`uploads`** avec les sous-dossiers `team/` et `news/`.

---

## Contraintes de l'upload

- **Types acceptés** : image/jpeg, image/png, image/webp, image/gif
- **Taille maximale en entrée** : 3 Mo (compatible avec la limite de corps des fonctions Vercel)
- **Traitement** : décodage, rotation EXIF, limite de 25 mégapixels, redimensionnement à 2400 px et réencodage WebP sans métadonnées
- **Profils membres** : 5 uploads maximum par jour et suppression de l’ancienne image après une mise à jour de profil réussie
- **Nommage** : sanitisé et rendu unique automatiquement (timestamp + aléatoire)
- **Auth requise** : token admin, ou token du membre propriétaire pour sa photo de profil

---

## Checklist de maintenance

### Avant chaque déploiement

- [ ] `npm run lint` — aucune erreur
- [ ] `npm run build` — build réussi
- [ ] Variables d'environnement à jour sur Vercel
- [ ] Tester connexion admin en prévisualisation
- [ ] Tester connexion membre en prévisualisation

### Rotation des secrets (tous les 6 mois)

1. Générer un nouveau `ADMIN_JWT_SECRET`, `MEMBER_JWT_SECRET` et `ADMIN_PASSWORD`.
2. Mettre à jour sur Vercel et en local.
3. Redéployer (les sessions actives sont invalidées).

### Post-déploiement

- [ ] Vérifier la page d'accueil
- [ ] Tester le formulaire de contact
- [ ] Tester `/admin` (connexion + CRUD)
- [ ] Tester `/member` (connexion + mise à jour profil)

---

## Déploiement Vercel

```bash
vercel deploy --prod
```

Ou via intégration GitHub : chaque push sur la branche de production configurée (actuellement `master` dans ce dépôt) déclenche un déploiement automatique.
Configurer toutes les variables d'environnement dans **Settings > Environment Variables**.

Dans **Settings > Domains**, `www.humae.fr` doit être le domaine principal et `humae.fr` doit rediriger vers lui. Le DNS est géré chez OVH : l'apex doit conserver uniquement la valeur `A` indiquée par Vercel et ne doit pas publier d'ancien enregistrement `AAAA` vers l'hébergement OVH.
