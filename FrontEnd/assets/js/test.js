//What to do with response from API 3 possible outcomes bc 3 different code combos
      //API returns 200 value if the login was successful
      if (value === '200'){
        console.log("you're logged in!")
      }
     //API returns 401 value if the user is unauthorized
      else if (value === '401') {
        window.alert('User unauthorized')
      }
     //Else the user doesn't exist or wrong email or password
      else {
        window.alert('Wrong email or password')
      }





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

      //Injecting elements next to h2 already present
      modifyIcon.parentNode.insertBefore(modifyIcon, h2);
      modifyText.parentNode.insertBefore(modifyText, h2);

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