var ChatFieldView = function (chatFieldId, sendBtn, chatBox, inputField) {
    this.chatFieldId = "#" + chatFieldId;
    this.sendBtnId = "#" + sendBtn;
    this.chatBoxId = "#" + chatBox;
    this.inputFieldId = "#" + inputField;
    var instance = this;

    this.chatData = new UserContext();
    $(sendBtn).click(function () {
        instance.onSendMessageRequest();
    });
};

ChatFieldView.prototype.onSendMessageRequest = function () {
    var username = UserContext.getUsername();
    var color = UserContext.getUserColor();
    var message = $(this.inputFieldId).val();

    if (Util.isPrivateMessage(message)) {
        var dataPrivate = new MessageData(new UserData(username, color), message);
        EventTriggers.triggerSendPublicMessageEvent(dataPrivate);
    } else {
        var recipient = Util.getRecipientName(message);
        var data = new MessageData({username:username, color:color, recipient:recipient}, message);
        EventTriggers.triggerSendPublicMessageEvent(data);
    }


};

Util = function () {
};

Util.isPrivateMessage = function (message) {

    //TODO: add body
    var recipient = message.match(/[@+] /gi);
    return false;
};



EventTriggers = function () {
};

EventTriggers.triggerLoginSuccessEvent = function (data) {
    $(document).trigger(Events.LOGIN_SUCCESS, [data]);
};

EventTriggers.triggerSendPublicMessageEvent = function (messageData) {
    $(document).trigger(Events.SEND_PUBLIC_MESSAGE, messageData);
};

EventTriggers.triggerSendPrivateMessageEvent = function (messageData) {
    $(document).trigger(Events.SEND_PRIVATE_MESSAGE, messageData);
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
    if (responseData.ok) {
        EventTriggers.triggerLoginSuccessEvent(responseData);
        return;
    }
    $(this.resolveFieldId).css("color", "red").html('<h1>Such username is already used</h1>');
};