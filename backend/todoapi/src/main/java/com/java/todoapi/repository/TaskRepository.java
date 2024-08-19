package com.java.todoapi.repository;


import org.springframework.stereotype.Repository;
import com.java.todoapi.model.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
@Repository
public class TaskRepository {
    private List<Task> list=new ArrayList<Task>();
    public void createTasks(){
        LocalDate date =LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
        String newDate = date.format(formatter);
           Task task1 = new Task(1, "Buy food","05 May 1988","incomplete","soon",Task.Priority.LOW,newDate);
           Task task2 = new Task(2, "Buy dogfood","05 May 1988","complete","soon",Task.Priority.MEDIUM,newDate);
           Task task3= new Task(3, "Do todoapp","05 May 1988","incomplete","soon", Task.Priority.LOW,newDate);
            list.add(task1);
            list.add(task2);
            list.add(task3);
    }
    public List<Task> getAllTasks(){
        return list;
    }
    public Task findById(int id) {
        for (int i = 0; i < list.size(); i++) {
            if(list.get(i).getId() == (id)) return list.get(i);
        }
        return null;
    }
    public Task save(Task t){
        Task task = new Task();
        task.setId(t.getId());
        task.setText(t.getText());
        task.setDueDate(t.getDueDate());
        task.setStatus(t.getStatus());
        task.setDoneDate(t.getDoneDate());
        task.setPriority(t.getPriority());
        task.setCreationDate(t.getCreationDate());
        list.add(task);
        return task;
    }
    public Task update(Task t){
        int idx=-1;
        int id=0;
        for(int i=0; i < list.size(); i++){
            if(list.get(i).getId()==(t.getId())){
                idx=i;
                id=t.getId();
                break;
            }
        }
        if(idx==-1) return null;
        Task auxiliar=list.get(idx);
        Task task1 = new Task();
        task1.setId(id);
        task1.setText(t.getText());
        task1.setPriority(t.getPriority());
        task1.setStatus(auxiliar.getStatus());
        task1.setDueDate(t.getDueDate());
        task1.setCreationDate(auxiliar.getCreationDate());
        task1.setDoneDate(auxiliar.getDoneDate());
        list.set(idx,task1);
        return task1;
    }
    public Task markAsDone(int id,Task t){
        int idx=-1;
        LocalDate date =LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
        String newDate = date.format(formatter);
        for(int i=0; i < list.size(); i++){
            if(list.get(i).getId()==id){
                idx=i;
                break;
            }
        }
        if(idx==-1) return null;
        Task auxiliar=list.get(idx);
        Task task1 = new Task();
        task1.setId(id);
        task1.setText(auxiliar.getText());
        task1.setPriority(auxiliar.getPriority());
        task1.setStatus(t.getStatus());
        task1.setDueDate(auxiliar.getDueDate());
        task1.setCreationDate(auxiliar.getCreationDate());
        task1.setDoneDate(newDate);
        list.set(idx,task1);
        return task1;
    }

    public Task markAsUndone(int id,Task t){
        int idx=-1;
        for(int i=0; i < list.size(); i++){
            if(list.get(i).getId()==id){
                idx=i;
                break;
            }
        }
        if(idx==-1) return null;
        Task auxiliar=list.get(idx);
        Task task1 = new Task();
        task1.setId(id);
        task1.setText(auxiliar.getText());
        task1.setPriority(auxiliar.getPriority());
        task1.setStatus(t.getStatus());
        task1.setDueDate(auxiliar.getDueDate());
        task1.setCreationDate(auxiliar.getCreationDate());
        task1.setDoneDate("soon");
        list.set(idx,task1);
        return task1;
    }

    public List<Task> search(String name){
        return list.stream().filter(x->x.getText().startsWith(name)).collect(Collectors.toList());
    }

    public String delete(Integer id){
        list.removeIf(x->x.getId()==(id));
        return null;
    }


}
