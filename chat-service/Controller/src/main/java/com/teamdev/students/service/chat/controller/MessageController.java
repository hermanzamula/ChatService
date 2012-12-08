package com.teamdev.students.service.chat.controller;

import com.teamdev.students.service.chat.controller.dto.MessageResponse;
import com.teamdev.students.service.chat.controller.dto.PrivateMessagePostRequest;
import com.teamdev.students.service.chat.controller.util.UniqueIdCreator;
import com.teamdev.students.service.chat.controller.dto.MessagePostRequest;
import com.teamdev.students.service.chat.data.Message;
import com.teamdev.students.service.chat.data.User;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.teamdev.students.service.chat.service.ChatService;

import javax.inject.Inject;

import static com.teamdev.students.service.chat.controller.util.ControllerUtil.*;

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
    public MessageResponse[] getAll() {
        Message messages[] = (Message[]) service.getMessageHistory().toArray();
        return toResponseArray(messages);
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

        final User user = service.findUser(request.getUsername());
        final Long uniqueIndex = UniqueIdCreator.createUniqueIndex();
        service.postMessage(fromRequest(request, user, uniqueIndex));
    }

    @RequestMapping(value = "/private", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void postPrivateMessage(@RequestBody PrivateMessagePostRequest request) throws ChatServiceException {
        LOGGER.debug("Post private message: " + request);

        final User user = service.findUser(request.getUsername());
        final User recipient = service.findUser(request.getRecipient());
        final Long uniqueIndex = UniqueIdCreator.createUniqueIndex();

        final Message message = fromPrivateRequest(request, user, recipient, uniqueIndex);

        service.postMessage(message);
    }
}