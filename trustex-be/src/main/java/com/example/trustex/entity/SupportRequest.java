package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
@Entity
@Table(name="support_request")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupportRequest extends  BaseEntity{

    // Kullanıcının ID'si

    private String subject; // Mesajın konusu


    private String message; // Mesajın içeriği

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
