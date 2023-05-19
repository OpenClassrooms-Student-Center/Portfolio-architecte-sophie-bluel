export default class ApiDataProvider {
  getProjects = fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((projects) => {
      return projects;
    });

  getProjectsByCategory = (category) => {
    fetch("http://localhost:5678/api/works")
      .then((res) => res.json())
      .then((projects) => {
        return projects;
      });
  };

  getCategories = fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((categories) => {
      let categoriesSet = new Set();
      categories.map((category) => {
        categoriesSet.add(category);
      });
      return categoriesSet;
    });
}
