var ChatFieldView = function (chatFieldId) {

};

var ChatRegistrationView = function (chatRegistrationFieldId) {

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
        $(this.resolveId).css("color", "green").html(loginResponse.username);
    } else {
        $(this.resolveId).css("color", "red").html(loginResponse.username);
    }
};