package com.teamdev.students.service.chat.storage;


import java.util.HashMap;
import java.util.Map;

public class ChatStorageFactory {

    public static final Map<StorageType, MessageStorage> MESSAGE_STORAGE_MAP = new HashMap<StorageType, MessageStorage>() {{
        put(StorageType.FROM_MAP, new MessageStorageImpl());
    }};

    public static final Map<StorageType, UserStorage> USER_STORAGE_MAP = new HashMap<StorageType, UserStorage>() {{
        put(StorageType.FROM_MAP, new UserStorageImpl());
    }};

    public static MessageStorage createMessageStorage(StorageType type) {
        return MESSAGE_STORAGE_MAP.get(type);
    }

    public static UserStorage createUserStorage(StorageType type) {
        return USER_STORAGE_MAP.get(type);
    }
}
