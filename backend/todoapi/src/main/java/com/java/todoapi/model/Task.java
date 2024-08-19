package com.java.todoapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    private int id;
    private String text;
    private String dueDate;
    private String status;
    private String doneDate;
    private Priority priority;
    private String creationDate;



    public enum Priority{
        HIGH,
        MEDIUM,
        LOW
    }
}
