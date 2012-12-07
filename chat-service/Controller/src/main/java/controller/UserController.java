package controller;

import controller.dto.UserLoginRequest;
import controller.dto.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import service.ChatService;

import javax.inject.Inject;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Inject
    private ChatService service;

    @RequestMapping(value = "/id")
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public UserResponse login(@RequestBody UserLoginRequest request) {

        final boolean loginStatus = service.enterChat(request.getUserName(), request.getPassword());
        return new UserResponse(loginStatus, request.getUserName());
    }
}
