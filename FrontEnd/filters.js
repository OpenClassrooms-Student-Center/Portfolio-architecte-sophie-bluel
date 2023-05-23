const articles = document.querySelectorAll("figure[data-id]");
const checkBoxs = document.querySelectorAll(".filterCheck");

   /****tool functions for filters****/ 
    function uncheckExcept(value){
        for (let i = 0; i < checkBoxs.length; i++){
            if (checkBoxs[i].dataset.id !== value) {
                checkBoxs[i].checked = false;
            }
        };
    }
    function uncheck(value){        
        for (let i = 0; i < checkBoxs.length; i++){
            if (checkBoxs[i].dataset.id == value) {
                checkBoxs[i].checked = false;
            }
        };
    }
    function hideAll(){
        for (let i=0; i<articles.length; i++){
            articles[i].style.display = "none";
        };
    }
    function showAll(){
        console.log(articles);
        uncheckExcept("0");
        for (let i=0; i<articles.length; i++){
            articles[i].style.display = "block";
        };
    }

    function showCategory(value){
        uncheck("0");
        for (let i=0; i<articles.length; i++){
            if (articles[i].dataset.id == value) {
                articles[i].style.display = "block";
            }
        };
    }
    function hideCategory(value){
        for (let i=0; i<articles.length; i++){
            if (articles[i].dataset.id == value) {
                articles[i].style.display = "none";
            }
        };
    }
    function allUnchecked() {
        let state = true;
        for (let i = 0; i < checkBoxs.length; i++) {
            if(checkBoxs[i].checked == true){
                state = false;
            };
        }
        console.log(state);
        return state
    }

    function toogle(check, id) {
        if(check.checked == true){
            showCategory(id)
        }else{
            hideCategory(id)
        }
    }


/***** main filter functiom *****/
export function filter(){    
    console.log(checkBoxs);
    let marker = true;
    for (let i = 0; i < checkBoxs.length; i++) {
        const filter = checkBoxs[i];
        console.log(filter);
        const id = filter.dataset.id;
        console.log(id);
        filter.addEventListener('click', function () {
                if (id == "0") {
                    console.log("0");
                    showAll()
                    marker = true;
                }else if(allUnchecked()){
                    console.log("all unchecked");
                    showAll()
                    marker = true;
                }else{
                    if(marker == true){
                        hideAll();
                        marker = false;
                    };
                    console.log(id);
                    toogle(filter, id)
                }
        })
    }
}