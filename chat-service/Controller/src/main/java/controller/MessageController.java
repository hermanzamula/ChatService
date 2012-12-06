package controller;

import controller.dto.MessagePostRequest;
import controller.dto.MessageResponse;
import data.Message;
import data.User;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.ChatService;

import javax.inject.Inject;

import static controller.util.ControllerUtil.*;
import static controller.util.UniqueIdCreator.createUniqueIndex;

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
    public void postMessage(@RequestBody MessagePostRequest request) throws ChatServiceException {
        LOGGER.debug("Posting message: " + request);

        final User user = service.findUser(request.getUsername());
        final Long uniqueIndex = createUniqueIndex();
        service.postMessage(fromRequest(request, user, uniqueIndex));
    }

}
