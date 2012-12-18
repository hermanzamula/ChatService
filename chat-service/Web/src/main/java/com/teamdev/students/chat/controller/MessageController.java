package com.teamdev.students.chat.controller;

import com.teamdev.students.chat.controller.dto.request.MessagePostRequest;
import com.teamdev.students.chat.controller.dto.request.PrivateMessagePostRequest;
import com.teamdev.students.chat.controller.dto.request.UserRequest;
import com.teamdev.students.chat.controller.dto.response.MessageResponseList;
import com.teamdev.students.chat.controller.dto.response.PrivateMessageResponseList;
import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.PrivateMessage;
import com.teamdev.students.chat.data.User;
import com.teamdev.students.chat.service.ChatService;
import com.teamdev.students.chat.util.ChatServiceException;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Collection;

import static com.teamdev.students.chat.util.ControllerUtil.*;

@Controller
@RequestMapping("/messages")
public class MessageController {
	private static final Logger LOGGER = Logger.getLogger(MessageController.class);

	@Inject
	private ChatService service;


	@RequestMapping(value = "/receive", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public MessageResponseList getMessages(@RequestBody UserRequest request) throws ChatServiceException {
		final Collection<Message> messageHistory = service.getMessages(request.getUsername());
		return toResponseArray(messageHistory);
	}

	@ExceptionHandler(ChatServiceException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public void handleChatServiceException(ChatServiceException e) {
		LOGGER.error("Error: " + e.getErrorMessage(), e);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	public void postPublicMessage(@RequestBody MessagePostRequest request) throws ChatServiceException {
		LOGGER.debug("Posting message: " + request);
		final String username = request.getUsername();
		service.postMessage(fromRequest(request, service.findUser(username)));
	}

	@RequestMapping(value = "/private", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public String postPrivateMessage(@RequestBody PrivateMessagePostRequest request) {
		LOGGER.debug("Post private message: " + request);

		final User sender = service.findUser(request.getUsername());
		final User recipient = service.findUser(request.getRecipient());
		try {
			service.postPrivate(fromPrivateRequest(request, sender, recipient));
		} catch (ChatServiceException e) {
			return e.getErrorMessage();
		}
		return "Message to '" + request.getRecipient() + "' has been sent";
	}

	@RequestMapping(value = "/private/receive", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public PrivateMessageResponseList getPrivateMessage(@RequestBody UserRequest request) throws ChatServiceException {
		LOGGER.debug("Try to get private messages: " + request.getUsername());
		final Collection<PrivateMessage> privateMessages = service.getPrivates(request.getUsername());
		return toResponse(privateMessages);
	}
}
