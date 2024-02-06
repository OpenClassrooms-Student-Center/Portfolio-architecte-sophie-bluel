







async function getUser() {
    let url = 'http://localhost:5678/api/users/login';
    try {
        let res = await fetch(url);
        console.log( "les users "+res);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
   
}
getUser();