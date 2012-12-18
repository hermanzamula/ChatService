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


