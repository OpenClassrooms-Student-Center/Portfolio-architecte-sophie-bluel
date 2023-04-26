        
        function deleteWorks(){
            
            document.addEventListener("click", function (e){
                const target = e.target.querySelector(".deleteWork")
                const urlBase = "http://localhost:5678/api/works/"
                const miniGallery = document.querySelector(".miniGallery")
                if(target){
                    console.log("deleted")
                }
        
            })
        }

        deleteWorks()