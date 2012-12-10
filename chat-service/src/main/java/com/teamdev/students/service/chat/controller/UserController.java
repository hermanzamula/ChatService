package com.teamdev.students.service.chat.controller;

import com.teamdev.students.service.chat.controller.dto.request.UserLoginRequest;
import com.teamdev.students.service.chat.controller.dto.request.UserRegistrationRequest;
import com.teamdev.students.service.chat.controller.dto.request.UserRequest;
import com.teamdev.students.service.chat.controller.dto.response.ChangesResponse;
import com.teamdev.students.service.chat.controller.dto.response.UserListResponse;
import com.teamdev.students.service.chat.controller.dto.response.UserRegistrationResponse;
import com.teamdev.students.service.chat.controller.dto.response.UserResponse;
import com.teamdev.students.service.chat.data.User;
import com.teamdev.students.service.chat.service.ChatService;
import com.teamdev.students.service.chat.util.ControllerUtil;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

import static com.teamdev.students.service.chat.util.ControllerUtil.fromRequest;
import static com.teamdev.students.service.chat.util.ControllerUtil.toResponse;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Inject
    private ChatService service;

    private static final Logger LOGGER = Logger.getLogger(UserController.class);

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public UserResponse login(@RequestBody UserLoginRequest request) {
        LOGGER.debug("\n User " + request.getUsername() + " trying enter to chat");
        final boolean loginStatus = service.enterChat(request.getUsername(), request.getPassword());
        return new UserResponse(loginStatus, request.getUsername());
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public String logout(@RequestBody final UserRequest request) {
        LOGGER.debug("\n User " + request.getUsername() + " trying exit from chat");
        service.exitChat(request.getUsername());
        return "User '" + request.getUsername() + "' left chat";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public UserRegistrationResponse register(@RequestBody final UserRegistrationRequest request) {
        final boolean userNotExists = !service.isUserExists(request.getUsername());
        if (userNotExists) {
            User user = fromRequest(request);
            service.registerAndEnter(user);
        }
        return toResponse(userNotExists, request.getUsername());
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public UserListResponse getUserList() {
        return ControllerUtil.toUserListResponse(service.getUserList());
    }

    @RequestMapping(value = "/changes", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public ChangesResponse getChangesFor(@RequestBody UserRequest request) {
        return toResponse(service.getChangeList(request.getUsername()));
    }

}
