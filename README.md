# 📚 Librairie Scolaire - Application E-Commerce

[![Angular](https://img.shields.io/badge/Angular-18.2.2-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Application web de vente de fournitures scolaires développée avec Angular 18, permettant aux clients d'acheter des produits en ligne et aux administrateurs de gérer les commandes avec notifications email automatiques.

---

## 📋 Table des Matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies Utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du Projet](#-structure-du-projet)
- [API Endpoints](#-api-endpoints)
- [Comptes de Test](#-comptes-de-test)
- [Captures d'Écran](#-captures-décran)
- [Contribuer](#-contribuer)
- [Licence](#-licence)
- [Auteur](#-auteur)

---

## 🎯 Aperçu

**Librairie Scolaire** est une application e-commerce complète permettant la vente en ligne de fournitures scolaires (stylos, cahiers, livres, etc.). L'application offre une expérience utilisateur fluide avec un panier d'achat persistant et un système de gestion des commandes pour les administrateurs.

### Caractéristiques principales :
- ✅ Catalogue de produits avec filtrage par catégorie et recherche
- ✅ Système de panier d'achat persistant (localStorage)
- ✅ Processus de commande avec formulaire de validation
- ✅ Tableau de bord administrateur avec gestion des commandes
- ✅ Notifications email automatiques (EmailJS)
- ✅ Gestion des statuts de commandes
- ✅ Interface responsive (mobile-friendly)
- ✅ Authentification admin/client

---

## ✨ Fonctionnalités

### Pour les Clients
- 🛍️ **Navigation des produits** : Parcourir le catalogue avec filtres et recherche
- 🛒 **Gestion du panier** : Ajouter, modifier et supprimer des articles
- 💳 **Processus de commande** : Formulaire sécurisé avec validation
- 📧 **Confirmation email** : Recevoir un email de confirmation de commande
- 📱 **Interface responsive** : Compatible mobile, tablette et desktop

### Pour les Administrateurs
- 📊 **Tableau de bord** : Vue d'ensemble des commandes et statistiques
- 📦 **Gestion des commandes** : Voir, modifier et supprimer les commandes
- 🔄 **Changement de statut** : Mettre à jour le statut des commandes
- ✉️ **Envoi d'emails** : Notifier les clients automatiquement
- 🔍 **Recherche avancée** : Filtrer les commandes par nom, email ou ID

---

## 🛠️ Technologies Utilisées

### Frontend
- **Angular 18.2.2** - Framework JavaScript
- **TypeScript 5.0** - Langage de programmation
- **Bootstrap 5.3** - Framework CSS
- **Bootstrap Icons** - Icônes
- **RxJS** - Programmation réactive

### Backend & Services
- **JSON Server** - API REST simulée
- **EmailJS** - Service d'envoi d'emails
- **LocalStorage** - Persistance du panier

### Outils de Développement
- **Angular CLI** - Outil de ligne de commande
- **npm** - Gestionnaire de paquets
- **Concurrently** - Exécution simultanée de scripts

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v18.0.0 ou supérieur) - [Télécharger](https://nodejs.org/)
- **npm** (v9.0.0 ou supérieur)
- **Angular CLI** (v18.0.0 ou supérieur)

```bash
# Vérifier les versions installées
node --version
npm --version
ng version
```

---

## 🚀 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/librarie-scolaire.git
cd librarie-scolaire
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Installer JSON Server (globalement ou localement)

```bash
# Installation globale (recommandé)
npm install -g json-server

# OU installation locale
npm install --save-dev json-server
```

### 4. Installer les dépendances supplémentaires

```bash
npm install bootstrap bootstrap-icons @emailjs/browser
npm install --save-dev concurrently
```

---

## ⚙️ Configuration

### 1. Configuration EmailJS

Pour activer l'envoi d'emails automatiques :

1. Créez un compte gratuit sur [EmailJS](https://www.emailjs.com)
2. Configurez un service email (Gmail, Outlook, etc.)
3. Créez un template d'email
4. Récupérez vos identifiants :
   - **Service ID**
   - **Template ID**
   - **Public Key**

5. Mettez à jour le fichier `src/app/services/email.service.ts` :

```typescript
private serviceId = 'VOTRE_SERVICE_ID';
private templateId = 'VOTRE_TEMPLATE_ID';
private publicKey = 'VOTRE_PUBLIC_KEY';
```

### 2. Configuration de la Base de Données

Le fichier `db.json` à la racine contient les données initiales. Vous pouvez le modifier pour ajouter/supprimer des produits.

---

## 🎮 Utilisation

### Démarrage en mode développement

#### Option 1 : Deux terminaux séparés

**Terminal 1 - Angular :**
```bash
ng serve
# ou
npm start
```

**Terminal 2 - JSON Server :**
```bash
json-server --watch db.json --port 3000
```

#### Option 2 : Un seul terminal (avec concurrently)

```bash
npm run dev
```

### Accès à l'application

- **Frontend** : http://localhost:4200
- **API** : http://localhost:3000
- **Produits** : http://localhost:3000/products
- **Commandes** : http://localhost:3000/orders

### Build de production

```bash
ng build --configuration production
```

Les fichiers de production seront générés dans le dossier `dist/`.

---

## 👥 Comptes de Test

### Administrateur
- **Username:** `admin`
- **Password:** `admin123`
- **Accès:** Tableau de bord admin + gestion des commandes



---

## 📁 Structure du Projet

```
librarie-scolaire/
├── src/
│   ├── app/
│   │   ├── models/                      # Modèles de données
│   │   │   ├── product.model.ts
│   │   │   ├── cart-item.model.ts
│   │   │   ├── user.model.ts
│   │   │   └── order.model.ts
│   │   │
│   │   ├── services/                    # Services Angular
│   │   │   ├── product.service.ts       # Gestion des produits
│   │   │   ├── cart.service.ts          # Gestion du panier
│   │   │   ├── auth.service.ts          # Authentification
│   │   │   ├── order.service.ts         # Gestion des commandes
│   │   │   └── email.service.ts         # Envoi d'emails
│   │   │
│   │   ├── guards/                      # Guards de protection
│   │   │   └── admin.guard.ts           # Protection route admin
│   │   │
│   │   ├── components/                  # Composants Angular
│   │   │   ├── navbar/                  # Barre de navigation
│   │   │   ├── home/                    # Page d'accueil
│   │   │   ├── products/
│   │   │   │   ├── product-list/        # Liste des produits
│   │   │   │   └── product-card/        # Carte produit
│   │   │   ├── cart/                    # Panier
│   │   │   ├── checkout/                # Formulaire de commande
│   │   │   ├── login/                   # Connexion
│   │   │   └── admin/
│   │   │       ├── admin-dashboard/     # Tableau de bord admin
│   │   │       └── orders-list/         # Liste des commandes
│   │   │
│   │   ├── app-routing.module.ts        # Configuration des routes
│   │   ├── app.module.ts                # Module principal
│   │   └── app.component.ts
│   │
│   ├── assets/                          # Ressources statiques
│   │   └── images/
│   │
│   └── styles.css                       # Styles globaux
│
├── db.json                              # Base de données JSON
├── package.json                         # Dépendances npm
├── angular.json                         # Configuration Angular
├── tsconfig.json                        # Configuration TypeScript
└── README.md                            # Documentation
```

---

## 🔌 API Endpoints

### Produits

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/products` | Récupérer tous les produits |
| `GET` | `/products/:id` | Récupérer un produit par ID |
| `GET` | `/products?category=stylos` | Filtrer par catégorie |

### Commandes

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/orders` | Récupérer toutes les commandes |
| `GET` | `/orders/:id` | Récupérer une commande par ID |
| `POST` | `/orders` | Créer une nouvelle commande |
| `PATCH` | `/orders/:id` | Mettre à jour une commande |
| `DELETE` | `/orders/:id` | Supprimer une commande |

### Utilisateurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/users` | Récupérer tous les utilisateurs |
| `GET` | `/users?username=admin&password=admin123` | Authentification |

---

## 📸 Captures d'Écran

### Page d'Accueil
![Accueil](screenshots/home.png)

### Catalogue de Produits
![Produits](screenshots/products.png)

### Panier
![Panier](screenshots/cart.png)

### Tableau de Bord Admin
![Admin](screenshots/admin.png)

---

## 🏗️ Architecture & Patterns

### Design Patterns Utilisés

- **Service Pattern** : Séparation de la logique métier
- **Observer Pattern** : Utilisation de RxJS Observables
- **Guard Pattern** : Protection des routes admin
- **Component Communication** : EventEmitter pour parent-enfant
- **Dependency Injection** : Injection de services Angular

### Gestion d'État

- **LocalStorage** : Persistance du panier
- **BehaviorSubject** : État réactif du panier et de l'authentification

---

## 🧪 Tests

```bash
# Tests unitaires
ng test

# Tests end-to-end
ng e2e

# Coverage
ng test --code-coverage
```

---

## 🚧 Améliorations Futures

- [ ] Système de paiement en ligne (Stripe, PayPal)
- [ ] Gestion avancée des stocks
- [ ] Historique des commandes pour les clients
- [ ] Système de notation et avis clients
- [ ] Filtres avancés (prix, popularité)
- [ ] Recommandations de produits
- [ ] Multi-langues (i18n)
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)
- [ ] Notifications push

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une **Pull Request**

### Guidelines

- Suivez les conventions de code Angular
- Documentez les nouvelles fonctionnalités
- Ajoutez des tests si possible
- Mettez à jour le README si nécessaire

---

## 🐛 Résolution de Problèmes

### Erreur : "Cannot find module 'bootstrap'"

```bash
npm install bootstrap bootstrap-icons
```

### Port déjà utilisé

```bash
# Angular sur un autre port
ng serve --port 4201

# JSON Server sur un autre port
json-server --watch db.json --port 3001
```

### Styles Bootstrap non appliqués

Vérifiez `angular.json` et redémarrez le serveur :
```bash
ng serve
```

### Erreur EmailJS

Vérifiez vos identifiants dans `email.service.ts` et consultez la [documentation EmailJS](https://www.emailjs.com/docs/).

---

## 📚 Documentation

- [Angular Documentation](https://angular.io/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [JSON Server Documentation](https://github.com/typicode/json-server)

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Votre Nom**
- GitHub: [@votre-username](https://github.com/votre-username)
- LinkedIn: [Votre Profil](https://linkedin.com/in/votre-profil)
- Email: votre.email@example.com

---

## 🙏 Remerciements

- [Angular Team](https://angular.io/) pour le framework
- [Bootstrap Team](https://getbootstrap.com/) pour le framework CSS
- [EmailJS](https://www.emailjs.com/) pour le service d'emails
- [Unsplash](https://unsplash.com/) pour les images placeholder

---

## 📊 Statistiques du Projet

![GitHub stars](https://img.shields.io/github/stars/votre-username/librarie-scolaire?style=social)
![GitHub forks](https://img.shields.io/github/forks/votre-username/librarie-scolaire?style=social)
![GitHub issues](https://img.shields.io/github/issues/votre-username/librarie-scolaire)
![GitHub pull requests](https://img.shields.io/github/issues-pr/votre-username/librarie-scolaire)

---

<div align="center">
  <p>Fait avec ❤️ en Tunisie</p>
  <p>© 2024 Librairie Scolaire. Tous droits réservés.</p>
</div>
