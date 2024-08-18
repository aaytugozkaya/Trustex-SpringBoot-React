package com.example.trustex.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;


    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }


    public BaseEntity() {
    }

    public BaseEntity(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate) {
        this.id = id;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
    }

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastModifiedDate = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
