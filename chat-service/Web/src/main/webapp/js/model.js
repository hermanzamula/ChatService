var LoginResponse = function (username, color) {
    this.username = username;
    this.color = color;
};

//TODO solve problem with inheritance
var RegistrationResponse = function (username, color, text) {
    this.username = username;
    this.color = color;
    this.text = text;
};


var LoginRequest = function (username, password) {
    this.username = username;
    this.password = password;
};

var RegistrationRequest = function (username, password, color) {
    this.username = username;
    this.password = password;
    this.color = color;
};


var PublicMessage = function (username, text) {
    this.username = username;
    this.text = text;
};

var PrivateMessage = function (text, recipient, from) {
    this.username = recipient;
    this.text = text;
    this.from = from;
};


var TransferUserData = function (username, color) {
    this.username = username;
    this.color = color;
};

GlobalUserData = function (login, color) {
    $.cookie(GlobalUserData.DATA_KEY, new LoginResponse(login, color));
};

GlobalUserData.getUsername = function () {
    $.cookie.json = true;
    console.log(JSON.stringify($.cookie(GlobalUserData.DATA_KEY)));
    var username ;
    try {
      username = $.cookie(GlobalUserData.DATA_KEY).username;
    } catch (exeption) {
        return  null;
    }
    return username;
};

GlobalUserData.getColor = function () {
    $.cookie.json = true;
    return  $.cookie(GlobalUserData.DATA_KEY).color;
};

GlobalUserData.clear = function () {
    $.removeCookie(GlobalUserData.DATA_KEY);
};

GlobalUserData.DATA_KEY = 'chat-user-data';




