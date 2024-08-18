package com.example.trustex.dao;

import com.example.trustex.entity.User;
import com.example.trustex.entity.UserRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRelationshipRepository extends JpaRepository<UserRelationship,Long> {
    boolean existsByPersonnelCustomerIdNumber(String idNumber);

    @Query("SELECT ur FROM UserRelationship ur " +
            "JOIN ur.personnel p " +
            "JOIN ur.personnelCustomer pc " +
            "WHERE p.id = :personnelId " +
            "AND (pc.firstname LIKE %:search% " +
            "OR pc.lastname LIKE %:search% " +
            "OR pc.customerNumber LIKE %:search%) " +
            "AND ur.personnel.userType = com.example.trustex.entity.UserType.PERSONNEL " +
            "AND ur.personnelCustomer.userType = com.example.trustex.entity.UserType.PERSONNEL_CUSTOMER")
    List<UserRelationship> findByDetails( @Param("personnelId") Long personnelId,@Param("search") String search);
}
