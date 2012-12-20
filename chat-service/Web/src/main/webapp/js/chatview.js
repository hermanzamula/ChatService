/*
 properties:
 {
 field: "chatFieldId"...
 sendBtn:
 messages:
 inputField:
 logoutBtn:
 }
 */
var ChatFieldView = function (properties) {
    this.chatFieldId = "#" + properties.field;
    this.sendBtnId = "#" + properties.sendBtn;
    this.chatMessagesId = "#" + properties.messages;
    this.inputFieldId = "#" + properties.inputField;
    this.logoutBtn = "#" + properties.logoutBtn;

    var instance = this;

    $(this.sendBtnId).click(function () {
        instance.onSendMessageRequest();
    });

    $(this.logoutBtn).click(function () {
        ChattingTriggers.triggerLogoutEvent({});
    });

};


/*
 required fields
 properties:
 {
 login:
 password:
 resolve:
 field:
 loginBtn:
 }
 */
var ChatLoginView = function (properties) {

    this.loginId = "#" + properties.login;
    this.passwordId = "#" + properties.password;
    this.resolveId = "#" + properties.resolve;
    this.chatFieldId = "#" + properties.field;
    this.loginButtonId = "#" + properties.loginBtn;
    var instance = this;
    $(this.loginButtonId).click(function () {
        instance.onLoginRequest();
    });
};



/*
 required fields
 properties:
 {
 field:
 password:
 okBtn:
 resolve:
 colorInput:
 login:
 }
 */
var ChatRegistrationView = function (properties) {
    this.regFieldId = "#" + properties.field;
    this.regpasswordId = "#" + properties.password;
    this.okBtnId = "#" + properties.okBtn;
    this.resolveFieldId = "#" + properties.resolve;
    this.colorInputId = "#" + properties.colorInput;
    this.regloginId = "#" + properties.login;

    var instance = this;
    $(this.okBtnId).click(function () {
        instance.onRegistrationRequest();
    });

    $(this.colorInputId).spectrum({
        color:"#f00"
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
       this.appendToMessageArea(
            "<div class='username' style='color:" + messages[i].color + "'>" + messages[i].username +
                "</div> at <div class = 'date'>" + messages[i].date + "</div>: <div class='messageText'>"
                + messages[i].text + "</div><br/>"
        );
    }
};

ChatFieldView.prototype.onReceivePrivateMessages = function (privateMessages) {
    for (var i = 0; i < privateMessages.length; i++) {
        this.appendToMessageArea(
            "<span class='username' style='color:" + privateMessages[i].color + "'>@" + privateMessages[i].username +
                "</span> send you at <span class = 'date'>" + privateMessages[i].date + "</span>: <span class='messageText'>"
                + privateMessages[i].text + "</span><br/>"
        );
    }
};

ChatFieldView.prototype.appendToMessageArea = function (html) {
    $(this.chatMessagesId).append("<div class='messageBlock'>"+html+"</div>");
    this.downScroll();
};

ChatFieldView.prototype.downScroll = function () {
    $(this.chatMessagesId).scrollTop($(this.chatMessagesId)[0].scrollHeight);
};


ChatRegistrationView.prototype.decorate = function (regButton) {
    this.regButtonClass = "#" + regButton;
    slideDecorator(this.regButtonClass, this.regFieldId);
    slideDecorator(this.okBtnId, this.regFieldId);
};


ChatLoginView.prototype.onLoginRequest = function () {
    var username = $(this.loginId).val();
    var password = $(this.passwordId).val();
    ChatUtil.clearFields([this.loginId, this.passwordId]);
    ViewTriggers.triggerLoginRequestEvent(ChatUtil.toLoginRequest(username, password));
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
    this.helpButton = "#" + actionButton;
    slideDecorator(this.helpButton, this.chatFieldId);
    slideDecorator(this.loginButtonId, this.chatFieldId);
};

ChatRegistrationView.prototype.onRegistrationRequest = function () {
    var login = $(this.regloginId).val();
    var pass = $(this.regpasswordId).val();
    var color = $(this.colorInputId).val();
    ChatUtil.clearFields([this.regloginId, this.regpasswordId, this.colorInputId]);
    ViewTriggers.triggerRegistrationRequestEvent(ChatUtil.toRegistrationRequest(login, pass, color));
};

ChatRegistrationView.prototype.onRegistrationFailedResponse = function (responseData) {
    console.log(JSON.stringify(responseData));
    $(this.resolveFieldId).css("color", "red").html('<h1>Such username is already used</h1>');
};