/**
 * Created with IntelliJ IDEA.
 * User: Zamula
 * Date: 17.12.12
 * Time: 18:59
 * To change this template use File | Settings | File Templates.
 */

var Events = {
    SEND_PUBLIC_MESSAGE:"send-public-message",
    SEND_PRIVATE_MESSAGE:"send-private-message",
    SIGN_UP:"sign-up",
    LOGIN:"sign-out",
    LOGOUT:"logout",
    REGISTRATION:"registration",
    PUBLIC_MESSAGE_RESPONSE:"public-message-response",
    PRIVATE_MESSAGE_RESPONSE:"private-message-response",
    REGISTRATION_RESPONSE:"registration-response",
    LOGIN_RESPONSE:"login-response",
    GET_USER_LIST_RESPONSE:"get-user-list-response",
    GET_USER_LIST_REQUEST:"get-user-list-request",
    LOGOUT_RESPONSE:"logout-response",
    LOGIN_SUCCESS:"login-success",
    LOGIN_FAILED:"login-failed",
    REGISTRATION_SUCCESS:"registration-success",
    REGISTRATION_FAILED:"registration-failed"

};

LoginViewTriggers = function () {
};

LoginViewTriggers.triggerSignUpEvent = function () {
    $(document).trigger(Events.SIGN_UP);
};

LoginViewTriggers.triggerLoginRequestEvent = function (loginData) {
    $(document).trigger(Events.LOGIN, [loginData]);
};


ChattingTriggers = function () {
};


ChattingTriggers.triggerSendPublicMessageEvent = function (messageData) {
    $(document).trigger(Events.SEND_PUBLIC_MESSAGE, messageData);
};

ChattingTriggers.triggerSendPrivateMessageEvent = function (messageData) {
    $(document).trigger(Events.SEND_PRIVATE_MESSAGE, messageData);
};

ChattingTriggers.triggerLogoutEvent = function (data) {
    console.log("trigger logout");
    $(document).trigger(Events.LOGOUT, data);
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
    console.log(JSON.stringify(registrationResponseData) + " has been triggered");
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

var Util = function () {
}            ;

Util.isPrivateMessage = function (message) {
    //TODO: add body
    return false;
};