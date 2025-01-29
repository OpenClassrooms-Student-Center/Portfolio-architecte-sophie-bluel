export function verificationEmail(email) {

    email = htmlSpecialChars(email);

    if(!email.includes("@")){
        alert("Veuillez entrer un mail valide!")
        return
    }
    return email;
}

export function htmlSpecialChars(string) {
    return string
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}