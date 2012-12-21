package com.teamdev.students.chat.util;

public class IdCreator {
    private static long increment = 0L;

    public static Long createUniqueIndex() {
        increment ++;
        return increment;
    }
}
