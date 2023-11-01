/**
 * @function loginPortfolio
 * @returns {Promise}
 **/

export const loginPortfolio  = async (user) => {
    try {
      const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      return reponse;

    } catch (error) {
      console.error(error);
    }
  };