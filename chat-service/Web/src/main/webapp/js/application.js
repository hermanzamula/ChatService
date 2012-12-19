$(document).ready(function () {
    var loginView = new ChatLoginView("loginFieldId", "usernameFieldId", "passwordFieldId",
            "loginButtonId",  "resolveFieldId");
    var registrationView = new ChatRegistrationView(["regFieldId","regUsernameId", "regPasswordId",
        "regButtonId", "regResolveId"]);
    var chatView = new ChatFieldView("chatFieldId", "sendMessageBtn", "chatMessagesId", "messageTextArea", "logoutButton");
    var service = new ChatService("./chat");

    LoginBinder(loginView, service);
    RegistrationBinder(registrationView, service);
    ChatBinder(chatView, service);

    loginView.decorate("loginPanelButtonId");
    registrationView.decorate("regPanelButtonId");

});

$(window).unload(function(){
    alert("Пока, пользователь!");
});

var LoginBinder = function (loginView, service) {

    $(document).bind(Events.LOGIN, function (e, data) {
       service.onLogin(data);
    });

    $(document).bind(Events.LOGIN_FAILED, function (e, data) {
       loginView.onLoginFailedResponse(data);
    });


    $(document).bind(Events.SIGN_UP, function (e) {
        service.onSignUp();
    });

    $(document).bind(Events.LOGIN_SUCCESS, function (e, data) {
        console.log("Login success");
        service.onLoginSuccess(data);
    });


};

var ChatBinder = function (chatview, service) {
    $(document).bind(Events.LOGOUT, function (e, data) {
        service.onLogout(data);
    });


   $(document).bind(Events.PUBLIC_MESSAGE_RESPONSE, function (e, data) {
       console.log("bind public message");
       chatview.onReceivePublicMessages(data);
    });

    $(document).bind(Events.PRIVATE_MESSAGE_RESPONSE, function (e, data) {
        console.log("bind private message");
        chatview.onReceivePrivateMessages(data);
    });

    $(document).bind(Events.PRIVATE_MESSAGE_RESPONSE, function (e, data) {

        console.log(JSON.stringify(data));
    });

    $(document).bind(Events.SEND_PUBLIC_MESSAGE, function (e, data) {
        console.log("send public message");
        service.onSendPublicMessage(data);
    });
};

var RegistrationBinder = function (regview, service) {
    $(document).bind(Events.REGISTRATION, function (e, data) {
        service.onRegistration(data);
    });
    $(document).bind(Events.REGISTRATION_FAILED, function (e, data) {
        regview.onRegistrationFailedResponse(data);
    });

    $(document).bind(Events.REGISTRATION_SUCCESS, function (e, data) {
        service.onRegistrationSuccess(data);
    })
};
