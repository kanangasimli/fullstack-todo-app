package com.example.todoapp.controller;

import com.example.todoapp.dto.TaskPageResponse;
import com.example.todoapp.dto.TaskRequest;
import com.example.todoapp.dto.TaskResponse;
import com.example.todoapp.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/tasks")
@Tag(name = "Tasks", description = "Task management endpoints")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(summary = "Create a new task")
    @PostMapping
    public TaskResponse createTask(@Valid @RequestBody TaskRequest request, Authentication authentication) {
        String userEmail = authentication.getName();
        return taskService.createTask(request, userEmail);
    }

    @Operation(summary = "Get all tasks for current user with pagination, sorting and filtering")
    @GetMapping
    public TaskPageResponse getAllTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) String search,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        return taskService.getAllTasks(page, size, sortBy, sortDir, completed, search, userEmail);
    }

    @Operation(summary = "Get task by id")
    @GetMapping("/{id}")
    public TaskResponse getTaskById(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        return taskService.getTaskById(id, userEmail);
    }

    @Operation(summary = "Update task by id")
    @PutMapping("/{id}")
    public TaskResponse updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        return taskService.updateTask(id, request, userEmail);
    }

    @Operation(summary = "Delete task by id")
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        taskService.deleteTask(id, userEmail);
    }
}