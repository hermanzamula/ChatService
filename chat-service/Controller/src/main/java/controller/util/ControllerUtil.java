package controller.util;


import controller.ChatServiceException;
import controller.dto.MessagePostRequest;
import controller.dto.MessageResponse;
import data.Message;
import data.User;

import java.util.Date;


public class ControllerUtil {

    public static MessageResponse toResponse(Message message) throws ChatServiceException{
        if(message ==null){
            throw new ChatServiceException("Message not found");
        }
        return new MessageResponse(message.getSender().getName(), message.getText(), message.getPostedAt());
    }

    public static MessageResponse[] toResponseArray(Message[] messages) {
        MessageResponse[] responses = new MessageResponse[messages.length];
        String sender;
        String text;
        Date date;

        for (int i = 0; i < responses.length; i++) {
            sender = messages[i].getSender().getName();
            text = messages[i].getText();
            date = messages[i].getPostedAt();
            responses[i] = new MessageResponse(sender, text, date);
        }
        return responses;
    }

    public static  Message fromRequest(MessagePostRequest request, User user, Long messageId)
            throws ChatServiceException {
        if(user == null){
            throw  new ChatServiceException("User \'" + request.getUsername() + "\' not found" );
        }
        return new Message(messageId, request.getText(), user , new Date());
    }
}
