import ApiDataProvider from "./ApiDataProvider.js";
import CardBuilder from "./CardBuilder.js";
import EventListener from "./EventListener.js";

const cardBuilder = new CardBuilder();
const dataProvider = new ApiDataProvider();
const event = new EventListener();
event.dispatch();

dataProvider.getCategories.then((categories) => {
  cardBuilder.displayCategories(categories);
});
dataProvider.getProjects.then((projects) => {
  cardBuilder.displayProjects(projects);
});
