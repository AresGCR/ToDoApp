package com.java.todoapi.controller;

import com.java.todoapi.model.Task;
import com.java.todoapi.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService service;

    // Allow CORS for the addTask endpoint

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return service.saveTask(task);
    }

    // Allow CORS for the findAllTasks endpoint

    @GetMapping
    public List<Task> findAllTasks() {
        return service.getTasks();
    }



    @GetMapping("{id}")
    public Task findTaskById(@PathVariable int id) {
        return service.getTaskById(id);
    }



    @PutMapping
    public Task updateTask(@RequestBody Task task) {
        return service.updateTask(task);
    }


    @DeleteMapping("{id}")
    public String deleteTask(@PathVariable int id) {
        return service.deleteTask(id);
    }
}

