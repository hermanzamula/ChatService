var ChatFieldView = function (chatFieldId) {

};

EventTriggers = function(){
};

EventTriggers.triggerLoginSuccessEvent = function(data){
    $(document).trigger(Events.LOGIN_SUCCESS, [data]);
};

var ChatRegistrationView = function (chatRegistrationFieldIds) {
    this.regloginId = "#" + chatRegistrationFieldIds[0];
    this.regpasswordId = "#" + chatRegistrationFieldIds[1];
    var okBtnId = "#" + chatRegistrationFieldIds[2];
    this.resolveFieldId = "#" + chatRegistrationFieldIds[3];
    var instance = this;
    $(okBtnId).click(function () {
        instance.onRegistrationRequest();
    })
};

var ChatLoginView = function (chatLoginInputId, passwordInputId, okBtnId, signUpId, resolveId) {

    this.loginId = "#" + chatLoginInputId;
    this.passwordId = "#" + passwordInputId;
    this.resolveId = "#" + resolveId;
    var instance = this;
    $("#" + okBtnId).click(function () {
        instance.onLoginRequest();
    });
    $("#" + signUpId).click(function () {
        instance.onSignUpRequest();
    });
};

ChatLoginView.prototype.onLoginRequest = function () {
    var username = $(this.loginId).val();
    var password = $(this.passwordId).val();
    var request = new UserRegistrationData(username, password);
    $(document).trigger(Events.LOGIN, [request]);
};

ChatLoginView.prototype.onSignUpRequest = function () {
    $(document).trigger(Events.SIGN_UP);
};

/**
 *
 * @param loginResponse - type of UserResponseData
 */
ChatLoginView.prototype.onLoginResponse = function (loginResponse) {
    if (loginResponse.ok) {
        EventTriggers.triggerLoginSuccessEvent(loginResponse);
    }
    $(this.resolveId).html("<h1>Wrong username or password</h1>");
};

ChatRegistrationView.prototype.onRegistrationRequest = function () {
    var login = $(this.regloginId).val();
    var pass = $(this.regpasswordId).val();
    var regRequest = new UserRegistrationData(login, pass);
    $(document).trigger(Events.REGISTRATION, [regRequest]);
};

ChatRegistrationView.prototype.onRegistrationResponse = function (responseData) {
    if(responseData.ok){
      EventTriggers.triggerLoginSuccessEvent(responseData);
        return;
    }
    $(this.resolveFieldId).css("color", "red").html('<h1>Such username is already used</h1>');
 };