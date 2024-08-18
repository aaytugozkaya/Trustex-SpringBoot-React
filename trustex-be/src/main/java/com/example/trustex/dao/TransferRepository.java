package com.example.trustex.dao;

import com.example.trustex.entity.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    List<Transfer> findBySenderId(Long senderId);
}
