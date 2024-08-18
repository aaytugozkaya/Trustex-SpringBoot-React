package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "target_currency_code")
    private Currency targetCurrency;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private double currencyRate;

    private Double commissionAmount;

    private Double foreignExchangeTax;

    private double total;

    @Column(nullable = false)
    private LocalDateTime transactionDate;

}
