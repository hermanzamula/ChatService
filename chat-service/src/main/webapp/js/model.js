var UserData = function (login, pass) {
    this.login = login;
    this.pass = pass;
};

var UserResponseData = function (jsonData) {
    var jsonLoginData = JSON.parse(jsonData);
    this.isOk = jsonLoginData.isOk;
    this.username = jsonLoginData.username;
};

var UserRegistrationResponseData = function (jsonData) {
    this.prototype = UserResponseData(jsonData);
    var jsonResponseData = JSON.parse(jsonData);
    this.message = jsonResponseData.message;
};

var MessageData = function (username, message) {
    this.username = username;
    this.message = message;
};


var MessageResponse = function (jsonData) {
    var jsonMessageData = JSON.parse(jsonData);
    this.username = jsonMessageData.username;
    this.date = jsonMessageData.date;
    this.text = jsonMessageData.text;
};

var PrivateMessageResponse = function (jsonData) {
    this.prototype = MessageResponse(jsonData);
    var jsonMessageData = JSON.parse(jsonData);
    this.from = jsonMessageData.from;
};

var PrivateMessageResponseList = function (jsonData) {
    var jsonMessageData = JSON.parse(jsonData);
    this.empty = jsonMessageData.empty;
    this.messages = jsonMessageData.messages;
};

var Events = {
    SEND_PUBLIC_MESSAGE:"send-public-message",
    SEND_PRIVATE_MESSAGE:"send-private-message",
    SIGN_IN:"sign-in",
    LOGIN:"sign-out",
    LOGOUT:"logout",
    REGISTRATION:"registration",
    PUBLIC_MESSAGE_RESPONSE:"public-message-response",
    PRIVATE_MESSAGE_RESPONSE:"private-message-response",
    REGISTRATION_RESPONSE:"registration-response",
    LOGIN_RESPONSE:"login-response"
};

var Constants = {
    CONTENT_TYPE:"application/json; charset=utf-8"
};