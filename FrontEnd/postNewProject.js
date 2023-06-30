export const postNewProjectData = async (index, title, imageFile) => {
  const url = "http://localhost:5678/api/works";
  const token = sessionStorage.getItem("token");
  const formData = new FormData();
  formData.append("image", imageFile, imageFile.name);
  formData.append("title", title);
  formData.append("category", index);

  try {
    const postProject = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const res = await postProject.json();
    console.log(res);
  } catch (e) {
    console.error("error", e);
  }
};
