alert ("Hello")

/* Create Gallery */
const tahinaElement = document.createElement("figure");
tahinaElement.classList.add("figtahina");
const parisvElement = document.createElement("figure");
parisvElement.classList.add("figparisv");
const sushisenElement = document.createElement("figure");
sushisenElement.classList.add("figsushisen");
const balisiereElement = document.createElement("figure");
balisiereElement.classList.add("figbalisiere");
const thermopolisElement = document.createElement("figure");
thermopolisElement.classList.add("figthermopolis");
const parisxElement = document.createElement("figure");
parisxElement.classList.add("figparisxElement");
const coteauElement = document.createElement("figure");
coteauElement.classList.add("figcoteau");
const fernezeElement = document.createElement("figure");
fernezeElement.classList.add("figferneze");
const parisxviiiElement = document.createElement("figure");
parisxviiiElement.classList.add("figparisxviii");
const lullabyElement = document.createElement("figure");
lullabyElement.classList.add("figlullaby");
const arteElement = document.createElement("figure");
arteElement.classList.add("figarte");

document.querySelector(".gallery").appendChild(tahinaElement);
document.querySelector(".gallery").appendChild(parisvElement);
document.querySelector(".gallery").appendChild(sushisenElement);
document.querySelector(".gallery").appendChild(balisiereElement);
document.querySelector(".gallery").appendChild(thermopolisElement);
document.querySelector(".gallery").appendChild(parisxElement);
document.querySelector(".gallery").appendChild(coteauElement);
document.querySelector(".gallery").appendChild(fernezeElement);
document.querySelector(".gallery").appendChild(parisxviiiElement);
document.querySelector(".gallery").appendChild(lullabyElement);
document.querySelector(".gallery").appendChild(arteElement);



const imgtahinaElement = document.createElement("img");
const imgparisvElement = document.createElement("img");
const imgsushisenElement = document.createElement("img");
const imgbalisiereElement = document.createElement("img");
const imgthermopolisElement = document.createElement("img");
const imgparisxElement = document.createElement("img");
const imgcoteauElement = document.createElement("img");
const imgfernezeElement = document.createElement("img");
const imgparisxviiiElement = document.createElement("img");
const imglullabyElement = document.createElement("img");
const imgarteElement = document.createElement("img");

document.querySelector(".figtahina").appendChild(imgtahinaElement);
document.querySelector(".figparisv").appendChild(imgparisvElement);
document.querySelector(".figsushisen").appendChild(imgsushisenElement);
document.querySelector(".figbalisiere").appendChild(imgbalisiereElement);
document.querySelector(".figthermopolis").appendChild(imgthermopolisElement);
document.querySelector(".figparisxElement").appendChild(imgparisxElement);
document.querySelector(".figcoteau").appendChild(imgcoteauElement);
document.querySelector(".figferneze").appendChild(imgfernezeElement);
document.querySelector(".figparisxviii").appendChild(imgparisxviiiElement);
document.querySelector(".figlullaby").appendChild(imglullabyElement);
document.querySelector(".figarte").appendChild(imgarteElement);

const captiontahinaElement = document.createElement("figcaption");
captiontahinaElement.innerText = "Abat-jour Tahina";
const captionparisvElement = document.createElement("figcaption");
captionparisvElement.innerText = "Appartement Paris V";
const captionsushisenElement = document.createElement("figcaption");
captionsushisenElement.innerText = "Restaurant Sushisen - Londres";
const captionbalisiereElement = document.createElement("figcaption");
captionbalisiereElement.innerText = "Villa \"La Balisière\" - Port-Louis";
const captionthermopolisElement = document.createElement("figcaption");
captionthermopolisElement.innerText = "Structures Thermopolis";
const captionparisxElement = document.createElement("figcaption");
captionparisxElement.innerText = "Appartement Paris X";
const captioncoteauElement = document.createElement("figcaption");
captioncoteauElement.innerText = "Pavillon \"Le coteau\" - Cassis";
const captionfernezeElement = document.createElement("figcaption");
captionfernezeElement.innerText = "Villa Ferneze - Isola d'Elba";
const captionparisxviiiElement = document.createElement("figcaption");
captionparisxviiiElement.innerText = "Appartement Paris XVIII";
const captionlullabyElement = document.createElement("figcaption");
captionlullabyElement.innerText = "Bar \"Lullaby\" - Paris";
const captionarteElement = document.createElement("figcaption");
captionarteElement.innerText = "Hôtel First Arte - New Delhi";

document.querySelector(".figtahina").appendChild(captiontahinaElement);
document.querySelector(".figparisv").appendChild(captionparisvElement);
document.querySelector(".figsushisen").appendChild(captionsushisenElement);
document.querySelector(".figbalisiere").appendChild(captionbalisiereElement);
document.querySelector(".figthermopolis").appendChild(captionthermopolisElement);
document.querySelector(".figparisxElement").appendChild(captionparisxElement);
document.querySelector(".figcoteau").appendChild(captioncoteauElement);
document.querySelector(".figferneze").appendChild(captionfernezeElement);
document.querySelector(".figparisxviii").appendChild(captionparisxviiiElement);
document.querySelector(".figlullaby").appendChild(captionlullabyElement);
document.querySelector(".figarte").appendChild(captionarteElement);

/* filters */
/* Create filters */
const tousElement = document.createElement("button");
tousElement.innerText = "Tous";
tousElement.classList.add("filters");

const objetsElement = document.createElement("button");
objetsElement.innerText = "Objets";
objetsElement.classList.add("filters");

const appartementsElement = document.createElement("button");
appartementsElement.innerText = "Appartements";
appartementsElement.classList.add("filters");

const hotelsrestaurantsElement = document.createElement("button");
hotelsrestaurantsElement.innerText = "Hôtels & restaurants";
hotelsrestaurantsElement.classList.add("filters");

document.querySelector(".filtersdiv").appendChild(tousElement);

document.querySelector(".filtersdiv").appendChild(objetsElement);

document.querySelector(".filtersdiv").appendChild(appartementsElement);

document.querySelector(".filtersdiv").appendChild(hotelsrestaurantsElement);

/* Function filter */
const buttonFilters = document.querySelector("filters");
buttonFilters.addEventListener("click", function () {

})


