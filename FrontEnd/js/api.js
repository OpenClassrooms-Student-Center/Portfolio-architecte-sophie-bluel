// module api.js
export const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
};

export const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
};

async function fetchUsers() {
  let user = {
    email: "sophie.bluel@test.tld",
    password: "S0phie",
  };

  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok === true) {
    return response.json();
  } else {
    alert("Impossible de se connecter");
  }
}
fetchUsers().then((user) => console.log(user));
