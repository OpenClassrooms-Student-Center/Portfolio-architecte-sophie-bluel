        export async function loadTemplate(urlTemplate, idContainer) {

            const reponse = await fetch(urlTemplate);
            const template = await reponse.text();
            console.log(template);

            document.getElementById(idContainer).innerHTML = template;
            
        }

           /*export async function loadTemplate(urlTemplate, idContainer) {
                try {
                  const response = await fetch(urlTemplate);
                  if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                  }
                  const template = await response.text();
                  console.log(template);
                  const container = document.getElementById(idContainer);
                  if (container) {
                    container.innerHTML = template;
                  } else {
                    console.error(`Conteneur avec l'ID "${idContainer}" introuvable.`);
                  }
                } catch (error) {
                  console.error("Erreur lors du chargement du template :", error);
                }
              }*/
              
        
   
