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
    var jsonResponseData = JSON.parse(jsonData);
    this.prototype = UserResponseData(jsonData);
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
