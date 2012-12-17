package com.teamdev.students.chat.controller;

import com.teamdev.students.chat.controller.dto.request.UserLoginRequest;
import com.teamdev.students.chat.controller.dto.request.UserRegistrationRequest;
import com.teamdev.students.chat.controller.dto.request.UserRequest;
import com.teamdev.students.chat.controller.dto.response.UserListResponse;
import com.teamdev.students.chat.controller.dto.response.UserRegistrationResponse;
import com.teamdev.students.chat.controller.dto.response.UserResponse;
import com.teamdev.students.chat.data.User;
import com.teamdev.students.chat.service.ChatService;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

import static com.teamdev.students.chat.util.ControllerUtil.*;

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
		final boolean success = service.enterChat(request.getUsername(), request.getPassword());
		return new UserResponse(success, request.getUsername(), request.getColor());
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
		User user = fromRequest(request);
		final boolean success = service.registerAndEnter(user);
		return toResponse(success, request.getUsername(), request.getColor());
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public UserListResponse getUserList() {
		return toUserListResponse(service.getUserList());
	}
}
