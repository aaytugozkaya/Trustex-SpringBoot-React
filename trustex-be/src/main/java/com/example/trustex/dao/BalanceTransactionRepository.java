package com.example.trustex.dao;

import com.example.trustex.entity.BalanceTransaction;
import com.example.trustex.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BalanceTransactionRepository extends JpaRepository<BalanceTransaction, Long> {
    List<BalanceTransaction> findByUser(User user);
}
