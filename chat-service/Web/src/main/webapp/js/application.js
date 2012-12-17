$(document).ready(function () {
    var loginView = new ChatLoginView("usernameFieldId", "passwordFieldId",
            "loginButtonId", "signUpId", "resolveFieldId");
    var registrationView = new ChatRegistrationView(["regUsernameId", "regPasswordId",
        "regButtonId", "regResolveId"]);
    var chatView = new ChatFieldView();
    var service = new ChatService("./chat");

    LoginBinder(loginView, service);
    RegistrationBinder(registrationView, service);
    ChattingBinder(chatView, service);
});

var LoginBinder = function (loginView, service) {

    $(document).bind(Events.LOGIN, function (e, data) {
        service.onLogin(data);
    });

    $(document).bind(Events.LOGIN_RESPONSE, function (e, data) {
        loginView.onLoginResponse(data);
    });

    $(document).bind(Events.SIGN_UP, function (e) {
        service.onSignUp();
    });

    $(document).bind(Events.LOGIN_SUCCESS, function (e, data) {
        console.log("Login success");
        service.onLoginSuccess(data);
    });

    $(document).bind(Events.PUBLIC_MESSAGE_RESPONSE, function (e, data) {
        console.log(JSON.stringify(data));
    });

    $(document).bind(Events.PRIVATE_MESSAGE_RESPONSE, function (e, data) {

        console.log(JSON.stringify(data));
    });

};

var RegistrationBinder = function (regview, service) {
    $(document).bind(Events.REGISTRATION, function (e, data) {
        service.onRegistration(data);
    });
    $(document).bind(Events.REGISTRATION_RESPONSE, function (e, data) {
        regview.onRegistrationResponse(data);
    });

};

var ChattingBinder = function (chatView, service) {

};