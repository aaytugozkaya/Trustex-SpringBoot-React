package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="users",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"idNumber", "userType"})})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User extends BaseEntity implements UserDetails {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType userType;
    private String firstname;
    private String lastname;
    private String email;
    private String idNumber;
    private String mobilePhone;
    private String country; //! ???
    private LocalDate dateOfBirth;
    private String password;
    private String confirmPassword;
    private String corporateCustomerNumber;
    private String commercialRegistrationNumber;
    private String mersisNumber;
    private String companyTitle;
    private String taxNumber;
    @Column(unique = true,  length = 11)
    private String customerNumber;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Assets> assets;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> transactions;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CrossTransaction> crossTransactions;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transfer> sentTransfers;

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transfer> receivedTransfers;

     @OneToMany(mappedBy = "personnel", cascade = CascadeType.ALL, orphanRemoval = true)
     private List<UserRelationship> userRelationships;

    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean verified;

    private String verificationToken;

    private String verificationCode;
    private LocalDateTime verificationCodeExpiry;
    private String resetPasswordToken;
    private LocalDateTime resetPasswordTokenExpiration;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SupportRequest> supportRequests;

    public User(Long id, String firstname, String lastname, String email, String mobilePhone, String companyTitle, String corporateCustomerNumber, String idNumber) {
        this.setId(id);
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.mobilePhone = mobilePhone;
        this.companyTitle = companyTitle;
        this.corporateCustomerNumber = corporateCustomerNumber;
        this.idNumber = idNumber;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;

    }

    @Override
    public String getUsername() {
        return idNumber + "_" + userType;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public void setVerificationToken(String verificationToken) {
        this.verificationToken = verificationToken;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }
}