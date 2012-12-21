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
    this.userList = "#" + properties.userList;
    this.helpPanel = "#" + properties.helpPanel;
    this.logoutPanel = "#" + properties.logoutPanel;

    var self = this;

    $(this.sendBtnId).click(function () {
        self.onSendMessageRequest();
    });

    $(this.logoutBtn).click(function () {
        ChattingTriggers.triggerLogoutEvent({});
    });
    //noinspection FunctionWithInconsistentReturnsJS
    $(this.inputFieldId).keydown(function (e) {
        var k = e.keyCode || e.which;
        if (k == 13 && e.ctrlKey) {
            self.onSendMessageRequest();
            return false; // !!!
        }
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
};


ChatFieldView.prototype.onSendMessageRequest = function () {
    var message = $(this.inputFieldId).val();
    ChatUtil.clearInput([this.inputFieldId]);
    //TODO: Move conditions into service
    if (ChatUtil.isPrivateMessage(message)) {
        var recipient = ChatUtil.findRecipient(message);
        message = ChatUtil.getMessageBody(message);
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
                + messages[i].text + "</div>"
        );
    }
};

ChatFieldView.prototype.onReceivePrivateMessages = function (privateMessages) {
    for (var i = 0; i < privateMessages.length; i++) {
        this.appendToMessageArea(
            "<span class='username' style='color:" + privateMessages[i].color
                + "'>&gt&gt" + privateMessages[i].username +
                "</span> at <span class = 'date'>" +
                privateMessages[i].date + "</span>: <span class='messageText'>"
                + privateMessages[i].text + "</span>"
        );
    }
};

ChatFieldView.prototype.setUserList = function (users) {
    var list = "";
    for (var i = 0; i < users.length; i++) {
        list += "<span class='ulItem' style='color:" + users[i].color + "' id ='user" + i + "'>"
            + users[i].username + "</span><br/>";
    }
    $(this.userList).html(list);
};

ChatFieldView.prototype.decorate = function (logoutAction, helpAction) {
    this.getHelpBtn = "#" + helpAction;
    this.onLogoutBtn = "#" + logoutAction;
    slideDecorator(this.onLogoutBtn, this.logoutPanel);
    slideDecorator(this.getHelpBtn, this.helpPanel);
    slideDecorator(this.logoutBtn, this.logoutPanel);
};

ChatFieldView.prototype.appendToMessageArea = function (html) {
    $(this.chatMessagesId).append("<div class='messageBlock'>" + html + "</div><br/>");
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
    ChatUtil.clearInput([this.loginId, this.passwordId]);
    $(this.resolveId).text("");
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
    var color = "#" + $(this.colorInputId).val();
    ChatUtil.clearInput([this.regloginId, this.regpasswordId, this.colorInputId]);
    $(this.resolveFieldId).text("");
    ViewTriggers.triggerRegistrationRequestEvent(ChatUtil.toRegistrationRequest(login, pass, color));
};

ChatRegistrationView.prototype.onRegistrationFailedResponse = function (responseData) {
    console.log(JSON.stringify(responseData));
    $(this.resolveFieldId).css("color", "red").html('<h1>Such username is already used</h1>');
};