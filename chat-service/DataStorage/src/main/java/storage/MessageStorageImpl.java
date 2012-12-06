package storage;

import data.Message;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class MessageStorageImpl implements MessageStorage {

    /**
     * First param - data.Message id, second -  message itself
     */
    private  Map<Long, Message> messageMap = new HashMap<Long, Message>();

    @Override
    public Collection<Message> getHistory() {
        return messageMap.values();
    }

    @Override
    public synchronized void add(Message message) {
        messageMap.put(message.getMessageId(), message);
    }

    @Override
    public Message get(Long messageId) {
        return messageMap.get(messageId);
    }
}
