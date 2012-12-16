var UserRegistrationData = function (login, pass, color) {
    this.username = login;
    this.password = pass;
    this.color = color;
};

var UserData = function(login, color){
    this. username = login;
    this. color = color;
};

var UserRequest = function (username) {
    this.username = username;
};

var UserDataForUserList = function (jsonData) {
    var jsonMessage = JSON.parse(jsonData);
    this.id = jsonMessage.id;
    this.user = jsonMessage.username;
};

var UserResponseData = function (jsonData) {
    var jsonLoginData = JSON.parse(JSON.stringify(jsonData));
    this.ok = jsonLoginData.ok;
    this.username = jsonLoginData.username;
    //this.color = jsonLoginData.color;
};

var UserRegistrationResponseData = function (jsonData) {
    this.prototype = UserResponseData(jsonData);
    var jsonResponseData = JSON.parse(jsonData);
    this.message = jsonResponseData.message;
};

var MessageData = function (userData, message) {
    this.userData = userData;
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

var ChangesResponse = function (jsonData) {
    var jsonMessageData = JSON.parse(jsonData);
    this.noChanges = jsonMessageData.noChanges;
    this.changeMessages = jsonMessageData.changeMessages;
};

var UserListResponse = function (jsonData) {
    var jsonMessageData = JSON.parse(jsonData);
    this.users = jsonMessageData.users;
};

UserContext = function ( ) {
};

UserContext.setContext = function(userData){
    localStorage.setItem('chatData', JSON.stringify(userData));
};

UserContext.getUsername = function () {
    var userData = JSON.parse(localStorage.getItem('chatData'));
    return userData.username;
};

UserContext.getUserColor = function () {
    var userData = JSON.parse(localStorage.getItem('chatData'));
    return userData.color;
};

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
    GET_SERVER_CHANGES_RESPONSE:"get-server-changes-response",
    GET_SERVER_CHANGES_REQUEST:"get-server-changes-request",
    GET_USER_LIST_REQUEST:"get-user-list-request",
    LOGOUT_RESPONSE:"logout-response",
    LOGIN_SUCCESS:"login-success"
};

var Constants = {
    CONTENT_TYPE:"application/json; charset=utf-8"
};