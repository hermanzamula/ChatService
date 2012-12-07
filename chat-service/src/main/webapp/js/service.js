$(function () {

    $("#loginButton").click(function () {
        console.log("Login request");
        var username = $("#usernameFieldId").val();
        var password = $("#passwordFieldId").val();
        var message = {username: username, password: password};
        var messageString = JSON.stringify(message);
        $.ajax({
                type: "POST",
                url: "/chat/user/login",
                contentType: "application/json; charset=utf-8",
                data: messageString,
                success: function () {
                    console.log("Login has been successfully passed");
                }
            }
        );
    });
});