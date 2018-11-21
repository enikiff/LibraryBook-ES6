class LogIn extends Library
{
  constructor()
  {
    super();
    this.loginURI = 'http://127.0.0.1:3000/auth';
  }

  init() {
    //this.CheckTokenStatus();
    this.$loginModal = $("#login-modal");
    this.$loginHeader = $(".log-in-header");
    this.$registerModal = $("#register-modal");
    this._lockScreenModal();
    this._bindEvents();
    this._setTokenPoll();
    this.headerFix();

  }

  _bindEvents() {
    this.$loginModal.on("submit", $.proxy(this._handleLogIn, this));
    this.$loginHeader.on("click", ".log-out", $.proxy(this.LogOut, this));
    this.$registerModal.on("submit", $.proxy(this._handleRegister, this));
    $("#login-modal").on("hidden.bs.modal", $.proxy(this._eraseLoginModal, this));

  }
  _eraseLoginModal()
  {
      $("#emailLoginModal").empty();
      $("#passwordLoginModal").empty();
  }

  _handleRegister(e) {
    // //HANDLE REGISTERING A NEW USER SEND FIRST NAME, LAST NAME, EMAIL, AND PASSWORD TO THE BACKEND TO ADD A USER
    $.ajax({
      url: `${this.loginURI}/register`,
      type: 'POST',
      dataType: "json",
      data: $(e.target).serialize(),
      //headers: {"x-access-token": sessionStorage.getItem("jwt_token"),},
    }).done((jwt) => {
      this._setToken(jwt);
      this._switchLogInHeader(jwt.name);
      this._lockScreenModal(); //not hiding login modal after login completes **fix** below
      //this.$loginModal.modal('hide'); //forcing login modal to close lockScreenModal function should handle this
    }).fail(()=>{ false });
    e.preventDefault();

    return false;
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
      url: `${this.loginURI}/login`,
      type: 'POST',
      dataType: "json",
      data: $(e.target).serialize(),
      headers: {"x-access-token": sessionStorage.getItem("jwt_token"), "Content-Type": "application/x-www-form-urlencoded"}
    }).done((jwt) => {
      this._setToken(jwt);
      this._switchLogInHeader(jwt.name);
      this._lockScreenModal(); //not hiding login modal after login completes **fix** below
      this.$loginModal.modal('hide'); //forcing login modal to close lockScreenModal function should handle this
    }).fail(()=>{ false });
    // e.preventDefault();
    // return false;
  }

  _switchLogInHeader(data) {
    this.$loginHeader.find("span").text(`Welcome, ${data}!, `);
    this.$loginHeader.find("a").text("Log Out").addClass("log-out");
  }

  headerFix() {
    if (this._isLoggedIn()) { // keeps name up upon reload.
      let name = sessionStorage.getItem("jwt_name");
      this.$loginHeader.find("span").text(`Welcome, ${name}!, `);
      this.$loginHeader.find("a").text("Log Out").addClass("log-out");
    }
  }

  _setToken(jwt) {
    if(jwt.auth)
    {
      sessionStorage.setItem('jwt_token', jwt.token);
    }
  }

  _lockScreenModal() {
   //  this.$loginModal.modal({backdrop: "static", keyboard: false, show: !this._isLoggedIn()});
   //  _lockScreenModal() {
   // // this.$loginModal.modal({backdrop: "static", keyboard: false, show: !this._isLoggedIn()});
   console.log('_isLoggedIn: ', this._isLoggedIn());
   if (this._isLoggedIn()) {
     // this.$loginModal.removeData('bs.modal').modal({backdrop: true, keyboard: true, show: false});
     this.$loginModal.modal({backdrop: true, keyboard: true, show: false});
     this.$loginModal.modal('hide');// because it wont hide
     console.log('loggedin true');
     //this._fireGetPaginate(this.currentPage);// best place i found  to get it called when it needs to. DRY
   } else {
     this.$loginModal.modal({backdrop: "static", keyboard: false, show: true});
     console.log('logged in false');
     //this._fireGetPaginate(1);
   }

 }

  LogOut() {
    //DUMP USER TOKEN FROM LOCALSTORAGE AND MAKE THE LOCK SCREEN MODAL APPEAR BLOCKING USER INTERACTION WITH THE APP.
    $.ajax({
      url: `${this.loginURI}/logout`,
      type: 'GET',
      headers: {"x-access-token": sessionStorage.getItem("jwt_token"),},
    }).done((jwt) => {
      this._dumpToken();
      //this._switchLogInHeader(jwt.name);
      this._lockScreenModal(); //not hiding login modal after login completes **fix** below
    }).fail(()=>{ false });
    e.preventDefault();

    return false;
    }

  //Checks Token Status at the server (Am I still logged in?)
  CheckTokenStatus() {
    // VERIFY USERS AUTH TOKEN VIA GET REQUEST
    console.log("CheckTokenStatus");
    console.log(sessionStorage.getItem("jwt_token"));
    $.ajax({
      url: `${this.loginURI}/verify`,
      type: 'GET',
      dataType: "json",
      //data: $(e.target).serialize(),
      headers: {"x-access-token": sessionStorage.getItem("jwt_token"),},
    }).done((jwt) => {
      if(jwt.auth==false) {
       this._dumpToken();
      }
      this._lockScreenModal(); //not hiding login modal after login completes **fix** below
      //this.$loginModal.modal('hide'); //forcing login modal to close lockScreenModal function should handle this
    }).fail(()=>{ false });
    //e.preventDefault();

    return false;

  }

  //True or false only
  _isLoggedIn() {
    return this._getToken() ? true : false;
  }

  //Always checked on page load. Token should be wiped when expired or logged out
  _getToken() {
    return sessionStorage.getItem("jwt_token") || false;
  }

  _dumpToken() {
    sessionStorage.removeItem("jwt_token");
  }
}

$(() => {
  window.gLogIn = new LogIn();
  window.gLogIn.init();
})
