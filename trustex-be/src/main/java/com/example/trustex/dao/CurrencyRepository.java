package com.example.trustex.dao;

import com.example.trustex.entity.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, String> {
    Optional<Currency> findByCurrencyCode(String code);
}
