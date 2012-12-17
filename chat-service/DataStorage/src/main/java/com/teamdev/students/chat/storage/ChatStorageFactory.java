package com.teamdev.students.chat.storage;


import java.util.HashMap;
import java.util.Map;

public class ChatStorageFactory {

    public static final Map<StorageType, ChatMessageStorage> MESSAGE_STORAGE_MAP = new HashMap<StorageType, ChatMessageStorage>() {{
        put(StorageType.MAP_STORAGE, new MessageMapStorage());
    }};

    public static final Map<StorageType, UserStorage> USER_STORAGE_MAP = new HashMap<StorageType, UserStorage>() {{
        put(StorageType.MAP_STORAGE, new UserMapStorage());
    }};

    public static ChatMessageStorage createMessageStorage(StorageType type) {
        return MESSAGE_STORAGE_MAP.get(type);
    }

    public static UserStorage createUserStorage(StorageType type) {
        return USER_STORAGE_MAP.get(type);
    }
}
