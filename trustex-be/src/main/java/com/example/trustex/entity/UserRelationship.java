package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_relationship")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserRelationship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "personnel_id", nullable = false)
    private User personnel;  // PERSONNEL kullanıcısı

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User personnelCustomer;  // PERSONNEL_CUSTOMER kullanıcıs
}
