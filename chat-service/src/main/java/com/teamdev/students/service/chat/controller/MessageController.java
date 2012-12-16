package com.teamdev.students.service.chat.controller;

import com.teamdev.students.service.chat.controller.dto.request.MessagePostRequest;
import com.teamdev.students.service.chat.controller.dto.request.PrivateMessagePostRequest;
import com.teamdev.students.service.chat.controller.dto.request.UserRequest;
import com.teamdev.students.service.chat.controller.dto.response.MessageResponse;
import com.teamdev.students.service.chat.controller.dto.response.MessageResponseList;
import com.teamdev.students.service.chat.controller.dto.response.PrivateMessageResponseList;
import com.teamdev.students.service.chat.data.Message;
import com.teamdev.students.service.chat.data.PrivateMessage;
import com.teamdev.students.service.chat.service.ChatService;
import com.teamdev.students.service.chat.util.ChatServiceException;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Collection;

import static com.teamdev.students.service.chat.util.ControllerUtil.*;

@Controller
@RequestMapping("/messages")
public class MessageController {
    private static final Logger LOGGER = Logger.getLogger(MessageController.class);

    @Inject
    private ChatService service;

    @RequestMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public MessageResponse getMessage(@PathVariable("id") Long id) throws ChatServiceException {
        LOGGER.debug("Obtaining message for id = '" + id + "\'");
        return toResponse(service.findMessage(id));
    }

    @RequestMapping("/all")
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public MessageResponseList getAll() {
        final Collection<Message> messageHistory = service.getMessageHistory();
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

        final boolean entered = service.isAlreadyEntered(request.getUsername());
        service.postMessage(fromRequest(request, entered, null));
    }

    @RequestMapping(value = "/private", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public String postPrivateMessage(@RequestBody PrivateMessagePostRequest request) {
        LOGGER.debug("Post private message: " + request);

        final boolean entered = service.isAlreadyEntered(request.getRecipient());
        final PrivateMessage message;
        try {
            message = fromPrivateRequest(request, entered, null, null);
        } catch (ChatServiceException e) {
            return e.getErrorMessage();
        }
        service.postPrivate(message);
        return "Message to '" + request.getRecipient() + "' has been sent";
    }

    @RequestMapping(value = "/private/get", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public PrivateMessageResponseList getPrivateMessage(@RequestBody UserRequest request) {
        LOGGER.debug("Try to get private messages: " + request.getUsername());
        final Collection<PrivateMessage> privateMessages = service.getPrivates(request.getUsername());
        return toResponse(privateMessages);
    }
}
