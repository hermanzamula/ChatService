package com.teamdev.students.chat.storage;

import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.PrivateMessage;
import com.teamdev.students.chat.data.User;

import java.util.*;

public class MessageMapStorage implements ChatMessageStorage {

	/**
	 * First param - Message id, second -  message itself
	 */
	private Map<Long, Message> messageMap = new HashMap<Long, Message>();
	private Map<Long, PrivateMessage> privateMessageMap = new HashMap<Long, PrivateMessage>();

	@Override
	public synchronized void add(Message message) {
		messageMap.put(message.getMessageId(), message);
	}

	public Message get(Long messageId) {
		return messageMap.get(messageId);
	}

	public PrivateMessage getPrivate(Long messageId) {
		return privateMessageMap.get(messageId);
	}

	@Override
	public synchronized Collection<PrivateMessage> getPrivateByDateRange(Date start, Date end, User recipient) {
		final Collection<PrivateMessage> messages = privateMessageMap.values();
		Collection<PrivateMessage> out = new ArrayList<PrivateMessage>();
		for (PrivateMessage m : messages) {
			long time = m.getPostedAt().getTime();
			if (m.getRecipient().equals(recipient) &&
					time >= start.getTime() && time < end.getTime()) {
				out.add(m);
			}
		}
		return out;
	}

	@Override
	public synchronized Collection<Message> getByDateRange(Date start, Date end) {
		final Collection<Message> messages = messageMap.values();
		Collection<Message> out = new ArrayList<Message>();
		for (Message m : messages) {
			long time = m.getPostedAt().getTime();
			if (time > start.getTime() && time <= end.getTime()) {
				out.add(m);
			}
		}
		return out;
	}


	@Override
	public synchronized void addPrivate(PrivateMessage message) {
		privateMessageMap.put(message.getMessageId(), message);
	}
}