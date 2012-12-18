package com.teamdev.students.chat.storage;

import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.PrivateMessage;
import com.teamdev.students.chat.data.User;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public interface ChatMessageStorage {

	void add(Message message);

	Collection<PrivateMessage> getPrivateByDateRange(final Date start, Date end, User recipient);

	Collection<Message> getByDateRange(final Date date, final Date end);

	void addPrivate(PrivateMessage message);
}

