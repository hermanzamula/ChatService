package com.teamdev.students.service.chat.util;

public class UniqueIdCreator {
    private static Long increment = 0L;

    //TODO: Need  create normal methods that return real unique number
    public static Long createUniqueIndex() {
        increment += 1L;
        return increment;
    }
}
