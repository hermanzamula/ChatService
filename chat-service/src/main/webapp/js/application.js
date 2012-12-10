$(document).ready(function () {
    var loginView = new ChatLoginView("usernameFieldId", "passwordFieldId",
            "loginButtonId", "signUpId", "resolveFieldId");
    var service = new ChatService("./chat");

    bind(loginView, service);
});

bind = function (loginView, service) {

    $(document).bind(Events.LOGIN, function (e, data) {
        service.onLogin(data);
    });

    $(document).bind(Events.LOGIN_RESPONSE, function (e, data) {
        loginView.onLoginResponse(data);
    });

    $(document).bind(Events.SIGN_UP, function(e){
        service.onSignUp();
    });
};