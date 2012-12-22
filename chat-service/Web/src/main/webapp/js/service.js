var ChatService = function (chatURL) {
    this.serviceURL = chatURL;
    if (ChatUtil.isUserEnter()) {
        this.getUserList(this);
        this.onReadyToChat();
    }
};

ChatService.REQUEST_TIME = 1000;
ChatService.GET_USERS_REQUEST_TIME = ChatService.REQUEST_TIME * 5;

ChatService.prototype.startReceivePrivateMessage = function () {
    var instance = this;
    var timeFunc = function () {
        instance.postJSON(instance, "/messages/private/receive/", ChatUtil.getGlobalUserData(), function (data) {
            var response = JSON.parse(JSON.stringify(data));
            if (response.empty == false) {
                console.log(JSON.stringify(data));
                ServiceTriggers.triggerGetPrivateMessageResponse(ChatUtil.fromPrivateMessagesResponse(response));
            }
        });
    };
    this.receivePrivateIntervalID = window.setInterval(timeFunc, ChatService.REQUEST_TIME);
};

ChatService.prototype.startReceivePublicMessage = function () {
    var instance = this;
    var timeFunc = function () {
        instance.postJSON(instance, "/messages/receive/", ChatUtil.getGlobalUserData(), function (data) {
            var response = JSON.parse(JSON.stringify(data));
            if (response.empty == false) {
                ServiceTriggers.triggerGetPublicMessageResponse(ChatUtil.fromPublicMessagesResponse(response));
            }
        });
    };
    this.receivePublicIntervalID = window.setInterval(timeFunc, ChatService.REQUEST_TIME);
};

ChatService.prototype.onSendPublicMessage = function (messageData) {
    var instance = this;
    messageData.username = GlobalUserData.getUsername();
    this.postJSON(instance, "/messages/", messageData, function () {
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
    privateMessageData.username = GlobalUserData.getUsername();
    this.postJSON(instance, "/messages/private/", privateMessageData, function (data) {
        console.log("private message has been sent");
        var response = JSON.parse(data);
        ServiceTriggers.triggerSendPrivateMessageResponse(response);
    });
};

ChatService.prototype.onLogin = function (userData) {
    var instance = this;
    if (ChatUtil.isUserEnter()) {
        this.onLogout();
    }
    this.postJSON(instance, "/user/login/", userData, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        loginResponse = ChatUtil.fromLoginResponse(response);
        console.log("User " + response.username + " enter." + response.ok + JSON.stringify(data));
        if (response.ok) {
            ServiceTriggers.triggerLoginSuccessEvent(loginResponse);
        } else {
            ServiceTriggers.triggerLoginFailedEvent(loginResponse);
        }
    });
};

ChatService.prototype.onRegistration = function (userData) {
    var self = this;
    if (ChatUtil.isUserEnter()) {
        this.onLogout();
    }
    this.postJSON(self, "/user/registration/", userData, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        var regResponse = ChatUtil.fromRegistrationResponse(response);
        if (response.ok) {
            ServiceTriggers.triggerRegistrationSuccessEvent(regResponse);
        } else {
            ServiceTriggers.triggerRegistrationFailedEvent(regResponse);
        }
    });
};


ChatService.prototype.onRegistrationSuccess = function (data) {
    this.onLoginSuccess(ChatUtil.toRegistrationRequest(data.username, data.password, data.color));
};

ChatService.prototype.onLogout = function () {
    var instance = this;
    this.postJSON(instance, "/user/logout/", ChatUtil.getGlobalUserData(), function (data) {
        var response = JSON.parse(JSON.stringify(data));
        ServiceTriggers.triggerLogoutResponse(response);
    });
    this.onExitFromChat();
};

ChatService.prototype.startReceiveUserList = function () {
    var self = this;
    this.receiveUserListTimerId = setInterval(function () {
        self.getUserList(self);
    }, ChatService.GET_USERS_REQUEST_TIME);
};

ChatService.prototype.getUserList = function (self) {
    self.postJSON(self, "/user/list/", {}, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        ServiceTriggers.triggerUserListResponse(ChatUtil.fromGetUserListResponse(response));
    });
};

ChatService.prototype.onLoginSuccess = function (userData) {
    GlobalUserData(userData.username, userData.color);
    this.onReadyToChat();
};

ChatService.prototype.onReadyToChat = function () {
    this.startReceivePrivateMessage();
    this.startReceivePublicMessage();
    this.startReceiveUserList();
};

ChatService.prototype.onExitFromChat = function () {
    window.clearInterval(this.receivePrivateIntervalID);
    window.clearInterval(this.receivePublicIntervalID);
    window.clearInterval(this.receiveUserListTimerId);
    GlobalUserData.clear();
};
