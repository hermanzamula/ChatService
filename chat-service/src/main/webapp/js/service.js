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
                success:function () {
                    console.log("Login has been successfully passed");
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
            success:function (data) {
                console.log("Message processed successfully");
                console.log("Object has been send: " + JSON.stringify(data));
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
});