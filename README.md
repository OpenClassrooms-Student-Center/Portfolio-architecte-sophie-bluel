# Portfolio Architecte Sophie Bluel

## Introduction

Ce projet est un projet pour l'architecte Sophie Bluel.
Il permet de présenter ses réalisations et de gérer les projets via une interface intuitive.
Ce projet est développé dans le cadre du parcours de formation d'OpenClassRomms Intégrateur Web

## Fonctionnalités

- Affichage des projets de l'architecte
- Filtrage des projets par catégories
- Authentification de l'utilisateur pour gérer ses projets
- Ajout, modification, suppression de projets (pour les utilisateurs authentifiés)
- Prévisualisation des images avant ajout
- sélection de la catégorie dans un menu déroulant 
- Interface utilisateur réactive et accessible

## Technologies utilisées

- HTML 5
- CSS 3
- JavaScript Vanilla

## Appels API

Le projet effectue des appels API pour les opérations suivantes :

- **Récupération des projets de l'architecte** : Les projets sont récupérés depuis une API Restful.
- **Ajout de projets** : Les utilisateurs authentifiés peuvent ajouter de nouveaux projets en téléchargeant leurs fichiers et en les transmettant à l'API
- **Suppression de projets** : Les utilisateurs authentifiés peuvent supprimer des projets via des appels à l'API

## Authentification
 L'authentification des utilisateurs est gérée via la création et le stockage de tokens JWT (JSON Web Tokens).
 Les utilisateurs doivent s'authentifier pour accéder aux fonctionnalités d'administration, telles que l'ajout, la modification et la suppression de projets.

 - **Création de tokens** : Lors de la connexion via le formulaire de login, un Token JWT est généré et envoyé au client.
 - **Stockage des tokens** : Le Token est stoké dans le localStorage du navigateur pour maintenir la session de l'utilisateur.
 - **Vérification des tokens** : Les appels API nécessitant une authentification vérifient la validité du token avant d'authoriser l'accès.

## Installation

1. Clonez le dépôt Github : 

```bash
git clone https://github.com/adelbonn/Portfolio-architecte-sophie-bluel.git

2. Accédez au dépôt du répertoire du projet :
cd Portfolio-architecte-sophie-bluel

3. Installez les dépendances :
npm install

Utilisation :
1. Démarez le serveur de développement :
npm start

2. Ouvrez le navigateur et accédez à l'URL suivante :
http://localhost:3000 ou liveserver  (http://localhost:5500)
http://localhost:5678 pour accéder à la documentation de l'api

3.Utilisez l'interface pour naviguer dans le portefolio, ajouter, modifier ou supprimer des projets. 

4. Les informations pour le backend se trouve sur le Readme du Backend du projet


