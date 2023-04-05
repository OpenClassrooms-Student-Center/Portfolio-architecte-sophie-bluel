import { fetchJSON } from "./fonctions/api.js";

const maListWork = await fetchJSON("http://localhost:5678/api/works");

console.log(maListWork);