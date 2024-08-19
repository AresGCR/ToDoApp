package com.java.todoapi.service;
import com.java.todoapi.model.Task;
import com.java.todoapi.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class TaskService {
    @Autowired
    private TaskRepository repository;

    public Task saveTask(Task t){
        return repository.save(t);
    }
    public List<Task> getTasks(){
        return repository.getAllTasks();
    }
    public Task getTaskById(int id){
        return repository.findById(id);
    }
    public String deleteTask(int id){
        repository.delete(id);
        return "product removed" + id;
    }
    public Task updateTask(Task t){
        return repository.update(t);
    }
}
