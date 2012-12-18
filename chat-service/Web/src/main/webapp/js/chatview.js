var ChatFieldView = function (chatFieldId, sendBtn, chatBox, inputField, logoutBtn) {
    this.chatFieldId = "#" + chatFieldId;
    this.sendBtnId = "#" + sendBtn;
    this.chatMessagesId = "#" + chatBox;
    this.inputFieldId = "#" + inputField;
    this.logoutBtn = "#" + logoutBtn;

    var instance = this;

    $(this.sendBtnId).click(function () {
        instance.onSendMessageRequest();
    });

    $(this.logoutBtn).click(function () {
        ChattingTriggers.triggerLogoutEvent({});
    });
};

ChatFieldView.prototype.onSendMessageRequest = function () {
    var message = $(this.inputFieldId).val();
    if (Util.isPrivateMessage(message)) {
        console.log("Private message: " + message);
        ChattingTriggers.triggerSendPrivateMessageEvent({recipient:recipient, message:message});
    } else {
        ChattingTriggers.triggerSendPublicMessageEvent({message:message});
    }
};

ChatFieldView.prototype.onReceivePublicMessages = function (messages) {
    for (var i=0; i<messages.length; i++) {
        $(this.chatMessagesId).after(
                "<span class='username' style='color:" + messages[i].color + "'>" + messages[i].username +
                        "</span> at <span class = 'date'>" + messages[i].date + "</span>: <span class='messageText'>"
                        + messages[i].text + "</span></br>"
        )
    }
};

ChatFieldView.prototype.onReceivePrivateMessages = function(privateMessages) {
    for (var i =0; i<privateMessages.length; i++) {
        $(this.chatMessagesId).after(
                "<span class='username' style='color:" + privateMessages[i].color + "'>@" + privateMessages[i].username +
                "</span> send you at <span class = 'date'>" + privateMessages[i].date + "</span>: <span class='messageText'>"
                + privateMessages[i].text + "</span></br>"
        )
    }
};

var ChatRegistrationView = function (chatRegistrationFieldIds) {
    this.regloginId = "#" + chatRegistrationFieldIds[0];
    this.regpasswordId = "#" + chatRegistrationFieldIds[1];
    var okBtnId = "#" + chatRegistrationFieldIds[2];
    this.resolveFieldId = "#" + chatRegistrationFieldIds[3];
    var instance = this;
    $(okBtnId).click(function () {
        instance.onRegistrationRequest();
    });
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
    LoginViewTriggers.triggerLoginRequestEvent(request);
};

ChatLoginView.prototype.onSignUpRequest = function () {
    LoginViewTriggers.triggerSignUpEvent();
};

/**
 * @param loginResponse - type of UserResponseData
 */
ChatLoginView.prototype.onLoginFailedResponse = function (loginResponse) {
    $(this.resolveId).html("<h1>Wrong username or password</h1>");
};

ChatRegistrationView.prototype.onRegistrationRequest = function () {
    var login = $(this.regloginId).val();
    var pass = $(this.regpasswordId).val();
    var regRequest = new UserRegistrationData(login, pass);
    $(document).trigger(Events.REGISTRATION, [regRequest]);
};

ChatRegistrationView.prototype.onRegistrationFailedResponse = function (responseData) {
    $(this.resolveFieldId).css("color", "red").html('<h1>Such username is already used</h1>');
};