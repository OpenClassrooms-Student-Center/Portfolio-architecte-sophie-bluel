// module api.js
export const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

export const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}
