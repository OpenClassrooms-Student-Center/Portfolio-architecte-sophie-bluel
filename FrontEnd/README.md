
# Projet Sophie Bluel - Architecte d'Intérieur

La mission consiste à connecter le site internet de Sophie Bluel, architecte d'intérieur, à une API afin de récupérer et afficher dynamiquement ses travaux. Une première version statique a déjà été développée en HTML et CSS. L'objectif principal est d'ajouter des fonctionnalités dynamiques en interfaçant le site avec une base de données.

L'API, développée avec Express.js, utilise une base de données SQLite pour stocker les informations. À l'initialisation, la base de données contient 11 travaux enregistrés.
Voici les fonctionnalités:

    Récupération des données :
        Liste des catégories disponibles.
        Liste complète des travaux.
    Gestion des travaux :
        Ajout de nouveaux travaux.
        Suppression de travaux existants.
    Authentification des utilisateurs :
        Possibilité de connecter des utilisateurs à l'application.

Objectif final

À la fin de ce sprint, nous devons livrer une version fonctionnelle et dynamique de la galerie des travaux. Elle devra être prête pour une démonstration au client, permettant une gestion simple et efficace des travaux via l'interface utilisateur.

## GIT et GITHUB: Instructions pour les branches 
- `feature/presentation-travaux` : Branche pour la fonctionnalité de présentation des travaux.
- `feature/page-connexion` : Branche pour la page de connexion.
- `feature/modale` : Branche pour la fonctionnalité de la modale.

    Les étapes du sprint:

1. **Créer la page de présentation des travaux**.
2. **Coder la page de connexion**.
3. **Ajouter une modale**.

## Structure finale du projet
- `index.html` : Fichier HTML principal.
- `style.css` : Feuille de styles CSS.
- `app.js` : Script JavaScript principal.
- `api.js` : Fichier HTML principal.
- `auth.js` : Feuille de styles CSS.
- `gallery.js` : Script JavaScript principal.

Un fichier principal pour la logique générale :

    app.js : Contient le code principal qui orchestre le fonctionnement de l'application (initialisation, appels aux autres modules).

Un fichier pour la gestion de l'API :

    api.js : Gère toutes les interactions avec l'API, comme la récupération, l'ajout et la suppression des travaux. Cela permet de centraliser les appels réseau.

Un fichier pour la gestion des utilisateurs :

    auth.js : Contient les fonctions liées à la gestion des utilisateurs, comme la connexion ou la gestion des tokens.

Un fichier pour la gestion de la galerie :

    gallery.js : Contient le code pour afficher, mettre à jour ou supprimer les travaux dans la galerie. Cela inclut la manipulation du DOM pour rendre les travaux dynamiques.

#### Etape un: Créer la page de présentation des travaux