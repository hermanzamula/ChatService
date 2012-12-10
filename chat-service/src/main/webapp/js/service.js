var ChatService = function (chatURL) {
   this.serviceURL = chatURL;
   this. _content_type =  "application/json; charset=utf-8";
};

ChatService.prototype.onSendPublicMessage = function (messageData) {
    var instance = this;
    $.post(instance.serviceURL + "/messages/", messageData, function () {
            console.log("message has been sent");
        }, instance._content_type );
};

ChatService.prototype.onSendPrivateMessage = function (privateMessageData) {
    var instance = this;
    $.post(instance.serviceURL + "/messages/private/",  privateMessageData,
        function (data) {
            console.log("private message has been sent");
            var response = JSON.parse(data);
            instance.onSendPrivateMessageResponse(response);
        }, instance._content_type);
};

ChatService.prototype.onLogin = function (userData) {
    var instance = this;
    $.post(instance.serviceURL+ "/user/login/", userData, function(data){
        var response = JSON.parse(data);
        console.log("User "+ response.username + " enter.");
        instance.onLoginResponse(response);
    }, instance._content_type);
};

ChatService.prototype.onRegistration = function (userData) {
    var instance = this;
    $.post(instance.serviceURL+ "/user/registration/", userData, function(data){
        var response = JSON.parse(data);
        console.log("User "+ response.username + " has been registered and enter.");
        instance.onRegistrationResponse(response);
    }, instance._content_type);
};

ChatService.prototype.onSignIn = function () {
    location.href = "/registration.html";
};

ChatService.prototype.onLogout = function(userData){
    var instance = this;
    $.post(instance.serviceURL+ "/user/logout/", userData, function(data){
        var response = JSON.parse(data);
        console.log(JSON.stringify(data) + ": logout");
        instance.onLogout(response);
    }, instance._content_type);
};

ChatService.prototype.onRegistrationResponse = function (registrationResponseData) {
    $(document).trigger(Events.REGISTRATION_RESPONSE, [registrationResponseData]);
};

ChatService.prototype.onLoginResponse = function (userResponse) {
    $(document).trigger(Events.LOGIN_RESPONSE, [userResponse]);
};

ChatService.prototype.onSendPrivateMessageResponse = function (response) {
    $(document).trigger(Events.PRIVATE_MESSAGE_RESPONSE, [response]);
};

ChatService.prototype.onSendPublicMessageResponse = function (publicMessageResponse) {
    $(document).trigger(Events.PUBLIC_MESSAGE_RESPONSE, [publicMessageResponse]);
}


$(function () {

    $("#loginButton").click(function () {
        console.log("Login request");
        var username = $("#usernameFieldId").val();
        var password = $("#passwordFieldId").val();
        var message = {username:username, password:password};
        var messageString = JSON.stringify(message);

        $.ajax({
                type:"POST",
                url:"/chat/user/login/",
                contentType:"application/json; charset=utf-8",
                data:messageString,
                success:function (data) {
                    console.log("Login has been successfully passed: " + JSON.stringify(data));
                    location.href = "chat.html";
                }
            }
        );
    });

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

    $("#regBtnId").click(function () {
        console.log("Registration request");
        var username = $("#regUsernameId").val();
        var password = $("#regPasswordId").val();
        var message = {username:username, password:password};
        var messageString = JSON.stringify(message);

        $.ajax({
                type:"POST",
                url:"/chat/user/registration/",
                contentType:"application/json; charset=utf-8",
                data:messageString,
                success:function (data) {
                    console.log("Login has been successfully passed");
                    console.log("Response object: " + JSON.stringify(data));
                }
            }
        );
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