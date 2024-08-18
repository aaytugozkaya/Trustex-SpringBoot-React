package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="assets")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Assets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assetName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "currency_code", nullable = false)
    private Currency currency;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private Double avgCost;
}

