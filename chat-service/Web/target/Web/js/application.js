$(document).ready(function () {

    //TODO: Make input params in JSON format
    var loginView = new ChatLoginView({
        field:"loginFieldId",
        login:"usernameFieldId",
        password:"passwordFieldId",
        loginBtn:"loginButtonId",
        resolve:"resolveFieldId"
    });

    var registrationView = new ChatRegistrationView({
        field:"regFieldId",
        login:"regUsernameId",
        password:"regPasswordId",
        okBtn:"regButtonId",
        resolve:"resolveFieldId",
        colorInput:"colorInputId"});

    var chatView = new ChatFieldView({
        field:"chatFieldId",
        sendBtn:"sendMessageBtn",
        messages:"chatMessagesId",
        inputField:"messageTextArea",
        logoutBtn:"logoutButton",
        logoutPanel:"logout",
        userList:"userListId",
        helpPanel:"helpPanel"});
    var service = new ChatService("./chat");

    LoginBinder(loginView, service);
    RegistrationBinder(registrationView, service);
    ChatBinder(chatView, service);

    loginView.decorate("loginPanelButtonId");
    registrationView.decorate("regPanelButtonId");
    chatView.decorate("logoutPanelButtonId", "helpPanelButtonId");

});

var LoginBinder = function (loginView, service) {

    $(document).bind(Events.LOGIN, function (e, data) {
        service.onLogin(data);
    });

    $(document).bind(Events.LOGIN_FAILED, function (e, data) {
        loginView.onLoginFailedResponse(data);
    });

    $(document).bind(Events.LOGIN_SUCCESS, function (e, data) {
        console.log("Login success");
        service.onLoginSuccess(data);
    });


};

var ChatBinder = function (chatview, service) {

    $(document).bind(Events.GET_USER_LIST_RESPONSE, function (e, data) {
        chatview.setUserList(data);
    });

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

    $(document).bind(Events.SEND_PRIVATE_MESSAGE, function (e, data) {
        console.log("send prvate message");
        service.onSendPrivateMessage(data);
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
