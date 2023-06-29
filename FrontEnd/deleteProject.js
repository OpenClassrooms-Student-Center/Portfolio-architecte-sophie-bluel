const deleteProject = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const url =`http://localhost:5678/api/works/${id}`
      const request = await fetch(url, {
        method: 'DELETE',
        headers: {
          'accept':'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
        const res = await request.json();
        console.log(res);
    } catch (e) {
      console.log("error", e);
    }
  }

  module.exports = deleteProject;