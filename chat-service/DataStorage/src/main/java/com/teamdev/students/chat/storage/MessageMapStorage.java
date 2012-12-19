package com.teamdev.students.chat.storage;

import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.PrivateMessage;
import com.teamdev.students.chat.data.User;

import java.util.*;

public class MessageMapStorage implements ChatMessageStorage {

	/**
	 * First param - Message id, second -  message itself
	 */
	private SortedMap<Long, Message> messageMap = new TreeMap<Long, Message>();
	private SortedMap<Long, PrivateMessage> privateMessageMap = new TreeMap<Long, PrivateMessage>();

	@Override
	public synchronized void add(Message message) {
		messageMap.put(message.getMessageId(), message);
	}

	@Override
	public List<Message> getLastsPublicAfter(long messageId) {
		 return new ArrayList<Message>(messageMap.tailMap(messageId+1).values());
	}

	@Override
	public List<PrivateMessage> getLastsPrivateAfter(long messageId, User user) {
		final  List<PrivateMessage> messages = new ArrayList<PrivateMessage>();
		final SortedMap<Long, PrivateMessage> lastMessages = privateMessageMap.tailMap(messageId+1);
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
	public synchronized void addPrivate(PrivateMessage message) {
		privateMessageMap.put(message.getMessageId(), message);
	}
}