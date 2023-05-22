export function renderMiniWorks(category) {
	const modalWrapper = document.createElement("div");
	modalWrapper.className = "miniGallery";
	const divider = document.querySelector(".divider");

	fetch("http://localhost:5678/api/works")
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.then((works) => {
			//pour chaque objet work dans works alors on va ...
			works.forEach((work) => {
				const newFigure = document.createElement("figure");
				const newImage = document.createElement("img");
				const trashCan = document.createElement("i");
				trashCan.classList.add("fa-regular", "fa-trash-can", "deleteWork");
				newFigure.setAttribute("id", `edit-${work.id}`);

				newImage.src = work.imageUrl;
				newImage.alt = "Photo du projet";

				newFigure.appendChild(newImage);
				const newFigcaption = document.createElement("figcaption");
				newFigcaption.innerText = "éditer";
				newFigure.append(trashCan);
				newFigure.appendChild(newFigcaption);
				modalWrapper.appendChild(newFigure);
				divider.insertAdjacentElement("beforeBegin", modalWrapper);

				// Since we created the trashcan delete elements here we deal with them here
				trashCan.addEventListener("click", function () {
					const id = work.id;
					console.log(id);
					deleteWorks(id);
				});

				//async funtion to delete the works
				const deleteWorks = async function (id) {
					const response = await fetch(
						"http://localhost:5678/api/works/" + id,
						{
							method: "DELETE",
							headers: {
								"content-type": "application/json",
								Authorization: "Bearer " + window.localStorage.getItem("token"),
							},
						}
					);
					if (response.ok) {
						document.getElementById(`list-${id}`).remove();
						document.getElementById(`edit-${id}`).remove();
					  } else {
						console.error("Error deleting work");
					  }
				};
			});
		})

		.catch((err) => {
			gallery.innerHTML = `<p>Une erreur est survenue (${err})</p>`;
		});
}
