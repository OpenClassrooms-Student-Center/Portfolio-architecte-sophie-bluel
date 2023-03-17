
// Sending email and password input to API 
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })

    //tranform response from API into json format       
    .then((response) => response.json())

      .then((data) => {

      //check when the form has been submitted to get the data from the input
        form.addEventListener("submit", function (e) {
         //stops the page automatically refreshing
          e.preventDefault();
        //linking body to inputs
          const email = document.querySelector(".email");
          const password = document.querySelector(".password");
        })
                     
      })
     



    

    
