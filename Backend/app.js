
const express = require("express"); //Framework web pour node.js
const path = require("path"); //Gestion des chemins de fichiers syst'èmes
const cors = require("cors"); //Permet les requêtes cross-origin (entre différents domaines)
require("dotenv").config(); //Charge les variables d'environnements du fichier .env
const helmet = require("helmet"); //Ajoute des en-têtes de sécurité http
const swaggerUi = require("swagger-ui-express"); //Interface utilisateur pour documentation API
const yaml = require("yamljs"); //Parse pour lire les fichiers YALM
const swaggerDocs = yaml.load("swagger.yaml"); //Charge la configuration Swagger

//Initialisation de l'application Express
const app = express();

//Middlewares de base
app.use(cors()); //Active CORS pour toutes les routes
app.use(express.json()); //Parse automatiquement le JSON des requêtes
app.use(express.urlencoded({ extended: true })); //Parse les données du formulaire
app.use(
  helmet({
    crossOriginResourcePolicy: false, //Permet le chargement des images cross-origin
  })
);

//configuration du dossier statique pour les images
app.use("/images", express.static(path.join(__dirname, "images")));

//import et configuration de la base de données
const db = require("./models");


//Import des differentes routes
const userRoutes = require("./routes/user.routes");
const categoriesRoutes = require("./routes/categories.routes");


//CORRECTION DU BUG : Suppression de .default car le module n'utilise pas export default, (ce code ne fonctionnait pas correctement, il semble qu'il soit a l'origine de mon pb pour me connecté a l'api comportant les données du projet)
//Ancien code qui posait problème:
//const worksRoutes = require("./routes/works.routes").default;
//Nouveau code corrigé:
const worksRoutes = require("./routes/works.routes");

//Synchronisation des routes de l'API
db.sequelize.sync().then(() => console.log("db is ready"));

//Configuration des routes de l'API
app.use("/api/users", userRoutes); //Routes pour la gestion des utilisateurs
app.use("/api/categories", categoriesRoutes); //Routes pour la gestion des categories
app.use("/api/works", worksRoutes); //Routes pour la gestion des works
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //Routes pour la documentation API

//Export de l'appli pour utilisatopn dans le server.js
module.exports = app;
