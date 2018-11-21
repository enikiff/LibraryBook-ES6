class LogIn {
  init() {
    this.$loginModal = $("#login-modal");
    this.$loginHeader = $(".log-in-header");
    this.$registerModal = $("#register-modal");
    this._bindEvents();
    this._setTokenPoll();
  }

  _bindEvents() {
    this.$loginModal.on("submit", $.proxy(this._handleLogIn, this));
    this.$loginHeader.on("click", ".log-out", $.proxy(this.LogOut, this));
    this.$registerModal.on("submit", $.proxy(this._handleRegister, this));
  }

  _handleRegister(e) {
    // //HANDLE REGISTERING A NEW USER SEND FIRST NAME, LAST NAME, EMAIL, AND PASSWORD TO THE BACKEND TO ADD A USER

  }

  //Polls every hours to check and validate token
  _setTokenPoll() {
    setTimeout(() => {
      this.CheckTokenStatus();
    }, 3600000);
  }

  _handleLogIn(e) {
    // //THIS FUNCTION WILL BE USED TO HANDLE LOGGING IN THE USER
    // //SETTING THE USERS AUTH TOKEN IN LOCAL STORAGE
    // //GRABBING THE USERS NAME TO UPDATE THE LOGIN HEADER
    // //ALSO REMOVE THE LOGIN MODAL LOCK
    //BONUS THERE IS ROOM HERE FOR REFACTOR

    $.ajax({
      url: `${loginURI}login`,
      type: 'POST',
      dataType: "json",
      data: $(e.target).serialize(),
      headers: {"x-access-token": localStorage.getItem("jwt_token")},
    }).done((jwt) => {
      this._setToken(jwt);
      this._switchLogInHeader(jwt.name);
      this._lockScreenModal(); //not hiding login modal after login completes **fix** below
      this.$loginModal.modal('hide'); //forcing login modal to close lockScreenModal function should handle this
    }).fail(()=>{ false });
    e.preventDefault();

    return false;
  }

  _switchLogInHeader(data) {
    this.$loginHeader.find("span").text(`Welcome, ${data}!, `);
    this.$loginHeader.find("a").text("Log Out").addClass("log-out");
  }

  _setToken(jwt) {
    if(jwt.auth)
    {
      localStorage.setItem('jwt_token', jwt.token);
    }
  }

  _lockScreenModal() {
    this.$loginModal.modal({backdrop: "static", keyboard: false, show: !this._isLoggedIn()});
  }

  LogOut() {
    //DUMP USER TOKEN FROM LOCALSTORAGE AND MAKE THE LOCK SCREEN MODAL APPEAR BLOCKING USER INTERACTION WITH THE APP.

  }

  //Checks Token Status at the server (Am I still logged in?)
  CheckTokenStatus() {
    // VERIFY USERS AUTH TOKEN VIA GET REQUEST

  }

  //True or false only
  _isLoggedIn() {
    return this._getToken() ? true : false;
  }

  //Always checked on page load. Token should be wiped when expired or logged out
  _getToken() {
    return localStorage.getItem("jwt_token") || false;
  }

  _dumpToken() {
    localStorage.removeItem("jwt_token");
  }
}

$(() => {
  window.gLogIn = new LogIn();
  window.gLogIn.init();
})
