var ChatService = function (chatURL) {
    this.serviceURL = chatURL;
};

const iMillis = 2000;

ChatService.prototype.startReceivePrivateMessage = function () {
    var instance = this;
    var timeFunc = function () {
        instance.postJSON(instance, "/messages/private/receive/", instance.userData, function (data) {
            var response = JSON.parse(JSON.stringify(data));

            if (response.empty == false) {

                console.log(JSON.stringify(data.messages[0]));

                ServiceTriggers.triggerGetPublicMessageResponse(response.messages);
            } else {
                //console.log(JSON.stringify(data));
            }
        });
    };
    this.receivePrivateIntervalID = window.setInterval(timeFunc, iMillis);

};

ChatService.prototype.startReceivePublicMessage = function () {
    var instance = this;
    var timeFunc = function () {
        instance.postJSON(instance, "/messages/receive/", instance.userData, function (data) {
            var response = JSON.parse(JSON.stringify(data));
            if (response.empty == false) {
                ServiceTriggers.triggerGetPublicMessageResponse(response.messages);
            } else {
                //console.log(JSON.stringify(data));
            }
        });
    };
    this.receivePublicIntervalID = window.setInterval(timeFunc, iMillis);
};

ChatService.prototype.onSendPublicMessage = function (messageData) {
    var instance = this;

    //TODO: make separate class for 'request'
    var request = {
        username:this.userData.username,
        text:messageData.message
    };


    this.postJSON(instance, "/messages/", request, function () {
        console.log("message has been sent");
    });
};

ChatService.prototype.postJSON = function (instance, uri, data, onsuccess) {
    var postMessage = JSON.stringify(data);
    $.ajax({type:"POST", url:instance.serviceURL + uri,
        data:postMessage, success:onsuccess, dataType:'json',
        contentType:'application/json; charset=utf-8'});
};

ChatService.prototype.onSendPrivateMessage = function (privateMessageData) {
    var instance = this;
    //TODO: make separate class for 'request'
    var request = {
        username:this.userData.username,
        recipient:privateMessageData.recipient,
        text:privateMessageData.message
    };

    this.postJSON(instance, "/messages/private/", request, function (data) {
        console.log("private message has been sent");
        var response = JSON.parse(data);
        ServiceTriggers.triggerSendPrivateMessageResponse(response);
    });
};

ChatService.prototype.onLogin = function (userData) {
    var instance = this;
    console.log(" try login: " + JSON.stringify(userData));
    this.postJSON(instance, "/user/login/", userData, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        console.log("User " + response.username + " enter." + response.ok + JSON.stringify(data));
        if (response.ok) {
            //ServiceTriggers.triggerRegistrationResponse(response);
            ServiceTriggers.triggerRegistrationSuccessEvent(response);
        } else {
            ServiceTriggers.triggerRegistrationFailedEvent(response);
        }
    });
};

ChatService.prototype.onRegistration = function (userData) {
    var instance = this;
    this.postJSON(instance, "/user/registration/", userData, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        console.log("User " + response.username + " has been registered and enter.");
        if (response.ok) {
            ServiceTriggers.triggerRegistrationSuccessEvent(response);
        } else {
            ServiceTriggers.triggerRegistrationFailedEvent(response);
        }
    });
};

ChatService.prototype.onSignUp = function () {
    //location.href = "/registration.html";
};


ChatService.prototype.onRegistrationSuccess = function (data) {
    var userData = new UserData(data.username, data.color);
    this.onLoginSuccess(userData);
};

ChatService.prototype.onLogout = function () {
    var instance = this;
    window.clearInterval(this.receivePrivateIntervalID);
    window.clearInterval(this.receivePublicIntervalID);
    this.postJSON(instance, "/user/logout/", this.userData, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        console.log(JSON.stringify(data) + ": logout");
        ServiceTriggers.triggerLogoutResponse(response);
    });
    this.userData = null;
};

ChatService.prototype.onGetUserListRequest = function () {
    var instance = this;
    //TODO: Attention
    this.postJSON(instance, "/user/list/", function (data) {
        var response = JSON.parse(JSON.stringify(data));
        console.log(JSON.stringify(data) + ": get user list");
        ServiceTriggers.triggerUserListResponse(response);
    });
};


ChatService.prototype.onLoginSuccess = function (userData) {
    this.userData = userData;
    this.startReceivePrivateMessage();
    this.startReceivePublicMessage();
};
