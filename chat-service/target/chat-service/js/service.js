var ChatService = function (chatURL) {
    this.serviceURL = chatURL;
};

ChatService.prototype.onSendPublicMessage = function (messageData) {
    var instance = this;
    $.postJSON(instance,"/messages/", messageData, function () {
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
    this.postJSON(instance, "/messages/private/", privateMessageData, function (data) {
        console.log("private message has been sent");
        var response = JSON.parse(data);
        instance.triggerSendPrivateMessageResponse(response);
    });
};

ChatService.prototype.onLogin = function (userData) {
    var instance = this;
    console.log(" try login: " + userData);
    this.postJSON(instance, "/user/login/", userData, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        console.log("User " + response.username + " enter." + response.ok + JSON.stringify(data));
        instance.triggerLoginResponse(response);
    });
};

ChatService.prototype.onRegistration = function (userData) {
    var instance = this;
    this.postJSON(instance, "/user/registration/", userData, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        console.log("User " + response.username + " has been registered and enter.");
        instance.triggerRegistrationResponse(response);
    });
};

ChatService.prototype.onSignUp = function () {
    location.href = "/registration.html";
};

ChatService.prototype.onLogout = function (userData) {
    var instance = this;
    this.postJSON(instance, "/user/logout/", userData, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        console.log(JSON.stringify(data) + ": logout");
        instance.triggerLogoutResponse(response);
    });
};

ChatService.prototype.onGetUserListRequest = function () {
    var instance = this;
    //TODO: Attention
    this.postJSON(instance, "/user/list/", function (data) {
        var response = JSON.parse(JSON.stringify(data));
        console.log(JSON.stringify(data) + ": get user list");
        instance.triggerUserListResponse(response);
    });
};

ChatService.prototype.onGetChangesRequest = function (username) {
    var instance = this;
    this.postJSON(instance, "/user/changes/", username, function (data) {
        var response = JSON.parse(JSON.stringify(data));
        console.log(JSON.stringify(data) + ": getChangesList");
        instance.triggerGetChangesResponse(response);
    });
};

ChatService.prototype.onGetPublicMessage = function (messageId) {
    var instance = this;
    this.postJSON(instance, "/messages/" + messageId, function (data) {
        var jsonMessage = JSON.parse(JSON.stringify(data));
        console.log(JSON.stringify(data) + ": receive message");
        instance.triggerGetPublicMessageResponse(messageId);
    })
} ;
ChatService.prototype.onLoginSuccess = function(){
  location.href = "chat.html";
};

ChatService.prototype.triggerRegistrationResponse = function (registrationResponseData) {
    $(document).trigger(Events.REGISTRATION_RESPONSE, [registrationResponseData]);
    console.log(JSON.stringify(registrationResponseData) + " has been triggered");
};

ChatService.prototype.triggerLoginResponse = function (userResponse) {
    $(document).trigger(Events.LOGIN_RESPONSE, [userResponse]);
};

ChatService.prototype.triggerSendPrivateMessageResponse = function (response) {
    $(document).trigger(Events.PRIVATE_MESSAGE_RESPONSE, [response]);
};

ChatService.prototype.triggerGetPublicMessageResponse = function (publicMessageResponse) {
    $(document).trigger(Events.PUBLIC_MESSAGE_RESPONSE, [publicMessageResponse]);
};

ChatService.prototype.triggerUserListResponse = function (userListResponse) {
    $(document).trigger(Events.GET_USER_LIST_RESPONSE, [userListResponse]);
};

ChatService.prototype.triggerGetChangesResponse = function (changesData) {
    $(document).trigger(Events.GET_USER_LIST_RESPONSE, [changesData]);
};

ChatService.prototype.triggerLogoutResponse = function (responseData) {
    $(document).trigger(Events.LOGOUT_RESPONSE, [responseData]);
};

/**
 $("#getMessageBtn").click(function () {
 var messageID = $("#getMessage").val();

 $.ajax({
 type:"POST",
 url:"./chat/messages/" + messageID,
 contentType:"application/json; charset=utf-8",

 success:function (data) {
 console.log("Message processed successfully");
 console.log("Object received: " + JSON.stringify(data));
 }});
 });

 $("#postMessageBtn").click(function () {

 var text = $("#postMessageId").val();
 console.log("Posting message: " + text);
 var message = { username:"Pushkin", text:text};
 var messageString = JSON.stringify(message);
 $.ajax({
 type:"POST",
 url:"./chat/messages/",
 contentType:"application/json; charset=utf-8",
 data:messageString,
 success:function () {
 console.log("Message processed successfully");
 console.log("Object has been send: ");
 }});
 });


 $("#getMessagesBtn").click(function () {

 $.ajax({
 type:"POST",
 url:"./chat/messages/all/",
 contentType:"application/json; charset=utf-8",

 success:function (data) {
 console.log("Message processed successfully");
 console.log("Object received: " + JSON.stringify(data));
 }});
 });

 $("#postPrivateBtn").click(function () {

 var text = $("#postPrivate").val();
 console.log("Posting message: " + text);
 var message = { username:"Pushkin", text:text, recipient:"Lermontov"};
 var messageString = JSON.stringify(message);
 $.ajax({
 type:"POST",
 url:"./chat/messages/private/",
 contentType:"application/json; charset=utf-8",
 data:messageString,
 success:function (data) {
 console.log("Message processed successfully");
 console.log("Object has been send" + JSON.stringify(data));
 }});
 });

 $("#getPrivateBtn").click(function () {

 var name = $("#getPrivateId").val();
 var request = {username:name};
 var message = JSON.stringify(request);
 $.ajax({
 type:"POST",
 url:"./chat/messages/private/get/",
 contentType:"application/json; charset=utf-8",
 data:message,
 success:function (data) {
 console.log("Message processed successfully" + JSON.stringify(data));
 var messages = new PrivateMessageResponseList(JSON.stringify(data));
 console.log("Object received: " + messages.empty + " " + messages.messages[0].date);
 }});
 });

 });
 **/