
//Page modification when user logs in

    //redirect user to home page
     location.href('index.html')

     //select the filter div and delete it to make space for new elemnts once logged in
      const filterDiv = document.querySelector(".filterDiv");
      filterDiv.remove();

     //create new elemnts needed
      //selecting section needed
      const portfolioSection = document.querySelector(".portfolio");

      //Icon pour modifier
      const modifyIcon = document.createElement("i");
      modifyIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right");

      //"modifer" text next to icon
      const modifyText = document.createElement("p");
      modifyText.innerText = "modifier";

      //<a> pour regrouper l'icon et le text pour faciliter le lien
      const modalLink = document.createElement("a");
      modalLink.className(".js-modal")
      modalLink.appendChild(modifyIcon);
      modalLink.appendChild(modifyText);

      //Injecting elements next to h2 already present
      modalLink.parentNode.insertBefore(modalLink, h2);

      //Creating the logged in nav
      const nav = document.createElement("nav");
      const modeEditionText = document.createElement("p");
      modeEditionText.innerText = "Mode édition";
      const btn = document.createElement("button");
      btn.innerText = "publier les changements";


     //Injecting elements above the basic nav
      nav.appendChild("p")
      nav.appendChild("button")
      const header = document.querySelector("header")
      nav.parentNode.insertBefore(nav, header);