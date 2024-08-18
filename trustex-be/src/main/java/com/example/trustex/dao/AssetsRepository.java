package com.example.trustex.dao;

import com.example.trustex.entity.Assets;
import com.example.trustex.entity.Currency;
import com.example.trustex.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssetsRepository extends JpaRepository<Assets, Long> {

    List<Assets> findByUser(User user);
    @Query("SELECT a FROM Assets a WHERE a.user.id = :userId")
    List<Assets> findByUserId(Long userId);
    Optional<Assets> findByUserAndCurrencyCurrencyCode(User user, String currencyCode);
    Optional<Assets> findByUserAndCurrency(User user, Currency currency);

    @Query("SELECT a FROM Assets a WHERE a.currency.currencyCode = :currencyCode AND a.user.id = :userId")
    Optional<Assets> findByUserAndCurrencyCode(Long userId, String currencyCode);
}
