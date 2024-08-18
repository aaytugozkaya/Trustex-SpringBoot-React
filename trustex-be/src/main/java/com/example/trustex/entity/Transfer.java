package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_customerNumber", nullable = false)
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "currency_code", nullable = false)
    private Currency currency;

    private double amount;
    private LocalDateTime timestamp;
    private String status;
    private String message;


}
