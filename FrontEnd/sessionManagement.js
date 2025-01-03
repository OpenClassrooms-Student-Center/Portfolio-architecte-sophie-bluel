export const logIn = (token) => {
  sessionStorage.setItem("token", token);
};

export const logOut = () => {
  sessionStorage.setItem("token", null);
};

export const isConnected = () => {
  const isConnected = false;
  isConnected = sessionStorage.getItem("token");

  return isConnected;
};

// export function isConnected() {
//     // Correction de la variable 'isConnected' pour qu'elle fonctionne correctement
//     const token = localStorage.getItem("token");
//     return token !== null && token !== "null";
//   }
