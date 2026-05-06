package com.example.todoapp.service;

import com.example.todoapp.dto.TaskPageResponse;
import com.example.todoapp.dto.TaskRequest;
import com.example.todoapp.dto.TaskResponse;
import com.example.todoapp.entity.Task;
import com.example.todoapp.entity.User;
import com.example.todoapp.exception.TaskNotFoundException;
import com.example.todoapp.repository.TaskRepository;
import com.example.todoapp.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public TaskResponse createTask(TaskRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userEmail));

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setCompleted(request.isCompleted());
        task.setUser(user);

        Task savedTask = taskRepository.save(task);
        return mapToResponse(savedTask);
    }

    public TaskPageResponse getAllTasks(
            int page,
            int size,
            String sortBy,
            String sortDir,
            Boolean completed,
            String search,
            String userEmail
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Task> taskPage;
        boolean hasSearch = search != null && !search.trim().isEmpty();

        if (completed != null && hasSearch) {
            taskPage = taskRepository.findByUserEmailAndCompletedAndTitleContainingIgnoreCase(
                    userEmail, completed, search.trim(), pageable
            );
        } else if (completed != null) {
            taskPage = taskRepository.findByUserEmailAndCompleted(userEmail, completed, pageable);
        } else if (hasSearch) {
            taskPage = taskRepository.findByUserEmailAndTitleContainingIgnoreCase(
                    userEmail, search.trim(), pageable
            );
        } else {
            taskPage = taskRepository.findByUserEmail(userEmail, pageable);
        }

        List<TaskResponse> content = taskPage.getContent()
                .stream()
                .map(this::mapToResponse)
                .toList();

        return new TaskPageResponse(
                content,
                taskPage.getNumber(),
                taskPage.getSize(),
                taskPage.getTotalElements(),
                taskPage.getTotalPages(),
                taskPage.isLast()
        );
    }

    public TaskResponse getTaskById(Long id, String userEmail) {
        Task task = taskRepository.findByIdAndUserEmail(id, userEmail)
                .orElseThrow(() -> new TaskNotFoundException(id));

        return mapToResponse(task);
    }

    public TaskResponse updateTask(Long id, TaskRequest request, String userEmail) {
        Task existingTask = taskRepository.findByIdAndUserEmail(id, userEmail)
                .orElseThrow(() -> new TaskNotFoundException(id));

        existingTask.setTitle(request.getTitle());
        existingTask.setDescription(request.getDescription());
        existingTask.setCompleted(request.isCompleted());

        Task updatedTask = taskRepository.save(existingTask);
        return mapToResponse(updatedTask);
    }

    public void deleteTask(Long id, String userEmail) {
        Task existingTask = taskRepository.findByIdAndUserEmail(id, userEmail)
                .orElseThrow(() -> new TaskNotFoundException(id));

        taskRepository.delete(existingTask);
    }

    private TaskResponse mapToResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}