export const closeModal = (savebar, modal) => {
  const closeModalHandler = () => {
    savebar.style.display = "none";
    modal.style.display = "none";
  };

  // Close modal when close button is clicked
  document
    .querySelector(".fa-xmark")
    .addEventListener("click", closeModalHandler);

  // Close modal when click occurs outside the modal
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModalHandler();
    }
  });
};
