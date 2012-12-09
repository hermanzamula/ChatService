package com.teamdev.students.service.chat.storage;

import com.teamdev.students.service.chat.data.Message;
import com.teamdev.students.service.chat.data.PrivateMessage;

import java.util.Collection;

public interface MessageStorage {
    Collection<Message> getHistory();
    void add(Message message);
    Message get(Long messageId);
    PrivateMessage getPrivate(Long messageId);
    void addPrivate(PrivateMessage message);
}

