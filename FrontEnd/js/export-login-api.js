/**
 * @function loginPortfolio
 * @returns {Promise}
 **/

export const loginPortfolio  = async () => {
    try {
      const reponse = await fetch("http://localhost:5678/api/users/login");
      
  
      return reponse;

    } catch (error) {
      console.error(error);
    }
  };