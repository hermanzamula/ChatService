package com.teamdev.students.chat.storage;

import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.PrivateMessage;
import com.teamdev.students.chat.data.User;
import org.apache.log4j.Logger;

import java.util.*;

public class MessageMapStorage implements ChatMessageStorage {

	/**
	 * First param - Message id, second -  message itself
	 */
	private SortedMap<Long, Message> messageMap = new TreeMap<Long, Message>();
	private SortedMap<Long, PrivateMessage> privateMessageMap = new TreeMap<Long, PrivateMessage>();
    private static final Logger LOGGER = Logger.getLogger(MessageMapStorage.class);

	@Override
	public synchronized void add(Message message) {
		messageMap.put(message.getMessageId(), message);
	}

	@Override
	public List<Message> findLastsPublicAfter(long messageId) {
		 return new ArrayList<Message>(messageMap.tailMap(messageId+1).values());
	}

	@Override
	public List<PrivateMessage> findLastsPrivateAfter(long messageId, User user) {
		final  List<PrivateMessage> messages = new ArrayList<PrivateMessage>();
		final SortedMap<Long, PrivateMessage> lastMessages = privateMessageMap.tailMap(messageId+1);
        LOGGER.debug("\n\n\n\n\nid:  " + messageId + " " + lastMessages);
		for(PrivateMessage m: lastMessages.values()){
			if(m.getRecipient().compareTo(user)==0){
				messages.add(m);
			}
		}
		return messages;
	}

	@Override
	public long getLastMessageId() {
		if(messageMap.isEmpty()){
			return 0;
		}
		return  messageMap.lastKey();
	}

    @Override
    public long getLastPrivateMessageId() {
        if(privateMessageMap.isEmpty()){
            return 0;
        }
        return  privateMessageMap.lastKey();
    }

    @Override
	public synchronized void addPrivate(PrivateMessage message) {
		privateMessageMap.put(message.getMessageId(), message);
	}
}