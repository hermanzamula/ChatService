package controller;

import controller.dto.UserLoginRequest;
import controller.dto.UserRequest;
import controller.dto.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.ChatService;

import javax.inject.Inject;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Inject
    private ChatService service;

    @RequestMapping(value = "/id", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public UserResponse login(@RequestBody UserLoginRequest request) {
        final boolean loginStatus = service.enterChat(request.getUsername(), request.getPassword());
        return new UserResponse(loginStatus, request.getUsername());
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public String logout(@RequestBody UserRequest request) {
        service.exitChat(request.getUsername());
        return "User \'" + request.getUsername() + "\' left chat";
    }
}
