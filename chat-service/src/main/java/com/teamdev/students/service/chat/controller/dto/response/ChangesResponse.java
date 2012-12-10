package com.teamdev.students.service.chat.controller.dto.response;

import java.util.List;

//Info about changes on server
public class ChangesResponse {

    private boolean noChanges;
    private List<String> changesMessage;

    public ChangesResponse(boolean changed, List<String> changesMessage) {
        noChanges = changed;
        this.changesMessage = changesMessage;
    }

    public boolean isNoChanges() {

        return noChanges;
    }

    public void setNoChanges(boolean noChanges) {
        this.noChanges = noChanges;
    }

    public List<String> getChangesMessage() {
        return changesMessage;
    }

    public void setChangesMessage(List<String> changesMessage) {
        this.changesMessage = changesMessage;
    }
}
