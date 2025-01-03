// Fonction pour connecter l'utilisateur et stocker le token
export const logIn = (token) => {
  sessionStorage.setItem("token", token);
  console.log("Utilisateur connecté avec token :", token);
};

// Fonction pour déconnecter l'utilisateur et supprimer le token
export const logOut = () => {
  sessionStorage.removeItem("token");
  console.log("Utilisateur déconnecté.");
};

// Fonction pour vérifier si l'utilisateur est connecté
export const isConnected = () => {
  const token = sessionStorage.getItem("token");
  return token ? true : false;
};
