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
        var message = { username:"Pushkin", text:text, recipient: "Lermontov"};
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

        var  name = $("#getPrivateId").val();
        var request = {username:  name};
        var message = JSON.stringify(request);
        $.ajax({
            type:"POST",
            url:"./chat/messages/private/get/",
            contentType:"application/json; charset=utf-8",
            data: message,
            success:function (data) {
                console.log("Message processed successfully" + JSON.stringify(data));
                var messages = new PrivateMessageResponseList(JSON.stringify(data));
                console.log("Object received: " + messages.empty + " " + messages.messages[0].date);            }});
    });

});