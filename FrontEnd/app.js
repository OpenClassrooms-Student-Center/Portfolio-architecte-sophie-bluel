import ApiDataProvider from "./src/ApiDataProvider.js";
import CardBuilder from "./src/CardBuilder.js";
import EventListener from "./src/EventListener.js";
import ModalBuilder from "./src/ModalBuilder.js";
import UserLogin from "./src/UserLogin.js";

EventListener.listen();
UserLogin.validToken();

ApiDataProvider.getCategories().then((categories) => {
  CardBuilder.displayCategories(categories);
  ModalBuilder.selectCategoryId();
});

ApiDataProvider.getProjects().then((projects) => {
  CardBuilder.displayProjects(projects);
  ModalBuilder.displayModalProjects(projects);
});
