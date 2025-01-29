        export async function loadTemplate(urlTemplate, idContainer) {

            const reponse = await fetch(urlTemplate);
            const template = await reponse.text();
            
            document.getElementById(idContainer).innerHTML = template;  
        }

          
              
        
   
