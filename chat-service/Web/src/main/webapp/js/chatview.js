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
    if (ChatUtil.isPrivateMessage(message)) {
        console.log("Private message: " + message);
        var recipient = "";
        ChattingTriggers.triggerSendPrivateMessageEvent(ChatUtil.toPrivateMessageRequest(message, recipient));
    } else {
        ChattingTriggers.triggerSendPublicMessageEvent(ChatUtil.toPublicMessageRequest(message));
    }
};

ChatFieldView.prototype.onReceivePublicMessages = function (messages) {
    for (var i = 0; i < messages.length; i++) {
        $(this.chatMessagesId).append(
                "<span class='username' style='color:" + messages[i].color + "'>" + messages[i].username +
                        "</span> at <span class = 'date'>" + messages[i].date + "</span>: <span class='messageText'><pre>"
                        + messages[i].text + "</pre></span></br>"
        );
        this.downScroll();
    }
};

ChatFieldView.prototype.onReceivePrivateMessages = function (privateMessages) {
    for (var i = 0; i < privateMessages.length; i++) {
        $(this.chatMessagesId).append(
                "<span class='username' style='color:" + privateMessages[i].color + "'>@" + privateMessages[i].username +
                        "</span> send you at <span class = 'date'>" + privateMessages[i].date + "</span>: <span class='messageText'><pre>"
                        + privateMessages[i].text + "</pre></span></br>"
        );
        this.downScroll();
    }
};

ChatFieldView.prototype.downScroll = function () {
    $(this.chatFieldId).scrollTop($(this.chatFieldId)[0].scrollHeight);
};


var ChatRegistrationView = function (chatRegistrationFieldIds) {
    this.regFieldId = "#" + chatRegistrationFieldIds[0];
    this.regloginId = "#" + chatRegistrationFieldIds[1];
    this.regpasswordId = "#" + chatRegistrationFieldIds[2];
    this.okBtnId = "#" + chatRegistrationFieldIds[3];
    this.resolveFieldId = "#" + chatRegistrationFieldIds[4];
    this.colorInputId = "#" + chatRegistrationFieldIds[5];
    var instance = this;
    $(this.okBtnId).click(function () {
        instance.onRegistrationRequest();
    });

    $(this.colorInputId).spectrum({
        color: "#f00"
    });
};

ChatRegistrationView.prototype.decorate = function (regButton) {
    this.regButtonClass = "#" + regButton;
    slideDecorator(this.regButtonClass, this.regFieldId);
    slideDecorator(this.okBtnId, this.regFieldId);
};


var ChatLoginView = function (loginFieldId, chatLoginInputId, passwordInputId, okBtnId, resolveId) {

    this.loginId = "#" + chatLoginInputId;
    this.passwordId = "#" + passwordInputId;
    this.resolveId = "#" + resolveId;
    this.chatFieldId = "#" + loginFieldId;
    this.loginButtonId = "#" + okBtnId;
    var instance = this;
    $(this.loginButtonId).click(function () {
        instance.onLoginRequest();
    });
};

ChatLoginView.prototype.onLoginRequest = function () {
    var username = $(this.loginId).val();
    var password = $(this.passwordId).val();
    LoginViewTriggers.triggerLoginRequestEvent(ChatUtil.toLoginRequest(username, password));
};

/**
 * @param loginResponse - type of UserResponseData
 */
ChatLoginView.prototype.onLoginFailedResponse = function (loginResponse) {
    console.log(JSON.stringify(loginResponse));
    $(this.resolveId).html("<h1>Wrong username or password</h1>");
};


function slideDecorator(button, panel) {
    $(button).click(function () {
        $(panel).slideToggle("slow");
        $(this).toggleClass("active");
        return false;
    });
}

ChatLoginView.prototype.decorate = function (actionButton) {
    this.helpButtonClass = "#" + actionButton;
    slideDecorator(this.helpButtonClass, this.chatFieldId);
    slideDecorator(this.loginButtonId, this.chatFieldId);
};


ChatRegistrationView.prototype.onRegistrationRequest = function () {
    var login = $(this.regloginId).val();
    var pass = $(this.regpasswordId).val();
    var color = $(this.colorInputId).val();
    $(document).trigger(Events.REGISTRATION, [ChatUtil.toRegistrationRequest(login, pass, color)]);
};

ChatRegistrationView.prototype.onRegistrationFailedResponse = function (responseData) {
    console.log(JSON.stringify(responseData));
    $(this.resolveFieldId).css("color", "red").html('<h1>Such username is already used</h1>');
};