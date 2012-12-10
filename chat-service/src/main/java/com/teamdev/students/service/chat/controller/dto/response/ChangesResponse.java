package com.teamdev.students.service.chat.controller.dto.response;

import java.util.List;

//Info about changes on server
public class ChangesResponse {

    private boolean noChanges;
    private List<String> changeMessages;

    public ChangesResponse(boolean changed, List<String> changeMessages) {
        noChanges = changed;
        this.changeMessages = changeMessages;
    }

    public boolean isNoChanges() {

        return noChanges;
    }

    public void setNoChanges(boolean noChanges) {
        this.noChanges = noChanges;
    }

    public List<String> getChangeMessages() {
        return changeMessages;
    }

    public void setChangeMessages(List<String> changeMessages) {
        this.changeMessages = changeMessages;
    }
}
