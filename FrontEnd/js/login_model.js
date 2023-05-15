class LoginModel {
  constructor() {
    this.email = "";
    this.password = "";
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  checkId() {
    return this.email === "sophie.bluel@test.tld" && this.password === "S0phie";
  }
}
