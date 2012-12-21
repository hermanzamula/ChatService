package com.teamdev.students.chat.storage;

import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.PrivateMessage;
import com.teamdev.students.chat.data.User;

import java.util.List;

public interface ChatMessageStorage {

	void add(Message message);

	List<Message> findLastsPublicAfter(final long messageId);

	List<PrivateMessage> findLastsPrivateAfter(long messageId, User user);

	long getLastMessageId();

    long getLastPrivateMessageId();

	void addPrivate(PrivateMessage message);
}

