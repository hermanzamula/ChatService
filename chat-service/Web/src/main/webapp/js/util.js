var Events = {
    SEND_PUBLIC_MESSAGE:"send-public-message",
    SEND_PRIVATE_MESSAGE:"send-private-message",
    SIGN_UP:"sign-up",
    LOGIN:"login",
    LOGOUT:"logout",
    REGISTRATION:"registration",
    PUBLIC_MESSAGE_RESPONSE:"public-message-response",
    PRIVATE_MESSAGE_RESPONSE:"private-message-response",
    REGISTRATION_RESPONSE:"registration-response",
    LOGIN_RESPONSE:"login-response",
    GET_USER_LIST_RESPONSE:"get-user-list-response",
    LOGOUT_RESPONSE:"logout-response",
    LOGIN_SUCCESS:"login-success",
    LOGIN_FAILED:"login-failed",
    REGISTRATION_SUCCESS:"registration-success",
    REGISTRATION_FAILED:"registration-failed"

};

ViewTriggers = function () {
};

ViewTriggers.triggerLoginRequestEvent = function (loginData) {
    $(document).trigger(Events.LOGIN, [loginData]);
};

ViewTriggers.triggerRegistrationRequestEvent = function (data) {
    $(document).trigger(Events.REGISTRATION, [data]);
};

ChattingTriggers = function () {

};


ChattingTriggers.triggerSendPublicMessageEvent = function (messageData) {
    $(document).trigger(Events.SEND_PUBLIC_MESSAGE, [messageData]);
};

ChattingTriggers.triggerSendPrivateMessageEvent = function (messageData) {
    $(document).trigger(Events.SEND_PRIVATE_MESSAGE, [messageData]);
};

ChattingTriggers.triggerLogoutEvent = function (data) {

    $(document).trigger(Events.LOGOUT, [data]);
};

/*
 Triggers for Service
 */
ServiceTriggers = function () {

};

ServiceTriggers.triggerLoginSuccessEvent = function (data) {
    $(document).trigger(Events.LOGIN_SUCCESS, [data]);
};

ServiceTriggers.triggerLoginFailedEvent = function (data) {
    $(document).trigger(Events.LOGIN_FAILED, [data]);
};

ServiceTriggers.triggerRegistrationSuccessEvent = function (data) {
    $(document).trigger(Events.REGISTRATION_SUCCESS, [data]);
};

ServiceTriggers.triggerRegistrationFailedEvent = function (data) {
    $(document).trigger(Events.REGISTRATION_FAILED, [data]);
};

ServiceTriggers.triggerRegistrationResponse = function (registrationResponseData) {
    $(document).trigger(Events.REGISTRATION_RESPONSE, [registrationResponseData]);
};

ServiceTriggers.triggerLoginResponse = function (userResponse) {
    $(document).trigger(Events.LOGIN_RESPONSE, [userResponse]);
};

ServiceTriggers.triggerSendPrivateMessageResponse = function (response) {
    $(document).trigger(Events.PRIVATE_MESSAGE_RESPONSE, [response]);
};

ServiceTriggers.triggerGetPublicMessageResponse = function (publicMessageResponse) {
    $(document).trigger(Events.PUBLIC_MESSAGE_RESPONSE, [publicMessageResponse]);
};

ServiceTriggers.triggerUserListResponse = function (userListResponse) {
    $(document).trigger(Events.GET_USER_LIST_RESPONSE, [userListResponse]);
};

ServiceTriggers.triggerLogoutResponse = function (responseData) {
    $(document).trigger(Events.LOGOUT_RESPONSE, [responseData]);
};

ServiceTriggers.triggerGetMessageResponse = function (responseData) {
    $(document).trigger(Events.PUBLIC_MESSAGE_RESPONSE, [responseData]);
};

ServiceTriggers.triggerGetPrivateMessageResponse = function (responseData) {
    $(document).trigger(Events.PRIVATE_MESSAGE_RESPONSE, [responseData]);
};

var ChatUtil = function () {
};

ChatUtil.IS_PRIVATE_REGEXP = new RegExp(/^@[^\s].*? /);

ChatUtil.findRecipient = function (message) {
    message = message.trim();
    return ChatUtil.IS_PRIVATE_REGEXP.exec(message).toString().replace("@", "").trim();
};

ChatUtil.isPrivateMessage = function (message) {
    message = message.trim();
    return ChatUtil.IS_PRIVATE_REGEXP.test(message);
};

/*
 returns array of public messages (PublicMessage)
 */
ChatUtil.fromPublicMessagesResponse = function (data) {
    return data.messages;
};

/*
 returns array of private messages (PrivateMessage)
 */
ChatUtil.fromPrivateMessagesResponse = function (data) {
    return data.messages;
};

/*
 returns LoginResponse
 */
ChatUtil.fromLoginResponse = function (data) {
    return new LoginResponse(data.username, data.color);
};

/*
 returns RegistrationResponse
 */
ChatUtil.fromRegistrationResponse = function (data) {
    return new RegistrationResponse(data.username, data.color, data.text);
};

/*
 return array of UserData
 */
ChatUtil.fromGetUserListResponse = function (data) {
    return data.users;
};
/*
 return LoginRequest
 */

ChatUtil.toLoginRequest = function (username, password) {
    return new LoginRequest(username, password);
};

/*
 return RegistrationRequest
 */
ChatUtil.toRegistrationRequest = function (username, password, color) {
    return new RegistrationRequest(username, password, color);
};

/*
 return PublicMessage
 */
ChatUtil.toPublicMessageRequest = function (text, from) {
    text = ChatUtil.escapeForbiddenElements(text);
    return new PublicMessage(from, text);
};

ChatUtil.toPrivateMessageRequest = function (text, recipient, username) {
    text = ChatUtil.escapeForbiddenElements(text);
    return new PrivateMessage(text, recipient, username);
};

ChatUtil.escapeForbiddenElements = function (text) {
    return text.replace(/<[^\s].*?>/g, "<esctag>")
};

ChatUtil.getGlobalUserData = function () {
    return new TransferUserData(GlobalUserData.getUsername(), GlobalUserData.getColor());
};

ChatUtil.isUserEnter = function () {
    var username = GlobalUserData.getUsername();
    return  username != null;
};

ChatUtil.clearInput = function (fields) {
    for (var i = 0; i < fields.length; i++) {
        $(fields[i]).val("");
    }
};

ChatUtil.getMessageBody = function (message) {
    return message.replace(ChatUtil.IS_PRIVATE_REGEXP, "");
};