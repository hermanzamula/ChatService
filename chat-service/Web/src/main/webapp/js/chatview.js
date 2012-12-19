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
    for (var i = 0; i < messages.length; i++) {
        $(this.chatMessagesId).append(
                "<span class='username' style='color:" + messages[i].color + "'>" + messages[i].username +
                        "</span> at <span class = 'date'>" + messages[i].date + "</span>: <span class='messageText'><pre>"
                        + messages[i].text + "</pre></span></br>"
        )
    }
};

ChatFieldView.prototype.onReceivePrivateMessages = function (privateMessages) {
    for (var i = 0; i < privateMessages.length; i++) {
        $(this.chatMessagesId).append(
                "<span class='username' style='color:" + privateMessages[i].color + "'>@" + privateMessages[i].username +
                        "</span> send you at <span class = 'date'>" + privateMessages[i].date + "</span>: <span class='messageText'><pre>"
                        + privateMessages[i].text + "</pre></span></br>"
        )
    }
};

var ChatRegistrationView = function (chatRegistrationFieldIds) {
    this.regFieldId = "#" + chatRegistrationFieldIds[0];
    this.regloginId = "#" + chatRegistrationFieldIds[1];
    this.regpasswordId = "#" + chatRegistrationFieldIds[2];
    this.okBtnId = "#" + chatRegistrationFieldIds[3];
    this.resolveFieldId = "#" + chatRegistrationFieldIds[4];
    var instance = this;
    $(this.okBtnId).click(function () {
        instance.onRegistrationRequest();
    });
};

ChatRegistrationView.prototype.decorate = function (regButton ) {
    this.regButtonClass = "#" + regButton ;
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
    var regRequest = new UserRegistrationData(login, pass);
    $(document).trigger(Events.REGISTRATION, [regRequest]);
};

ChatRegistrationView.prototype.onRegistrationFailedResponse = function (responseData) {
    $(this.resolveFieldId).css("color", "red").html('<h1>Such username is already used</h1>');
};