package com.example.trustex.dao;

import com.example.trustex.dto.PersonnelCustomerDto;
import com.example.trustex.entity.User;
import com.example.trustex.entity.UserRelationship;
import com.example.trustex.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    User findByVerificationToken(String token);

    boolean existsByEmail(String email);


    Optional<User> findByResetPasswordToken(String token);

    boolean existsByIdNumberAndUserType(String idNumber, UserType userType);


    //  List<User> findByIdNumberAndUserType(String idNumber, UserType userType);
    @Query("SELECT u FROM User u WHERE u.idNumber = :idNumber AND u.userType = :userType")
    List<User> findByIdNumberAndUserType(@Param("idNumber") String idNumber, @Param("userType") UserType userType);

    boolean existsByCustomerNumber(String customerNumber);

    Optional<User> findByCustomerNumber(String customerNumber);

    User findByFirstnameAndLastnameAndCustomerNumber(String firstName, String lastName, String customerNumber);

}
