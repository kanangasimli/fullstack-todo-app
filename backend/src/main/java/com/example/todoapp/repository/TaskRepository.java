package com.example.todoapp.repository;

import com.example.todoapp.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByUserEmail(String email, Pageable pageable);

    Page<Task> findByUserEmailAndCompleted(String email, boolean completed, Pageable pageable);

    Page<Task> findByUserEmailAndTitleContainingIgnoreCase(String email, String title, Pageable pageable);

    Page<Task> findByUserEmailAndCompletedAndTitleContainingIgnoreCase(
            String email,
            boolean completed,
            String title,
            Pageable pageable
    );

    Optional<Task> findByIdAndUserEmail(Long id, String email);
}