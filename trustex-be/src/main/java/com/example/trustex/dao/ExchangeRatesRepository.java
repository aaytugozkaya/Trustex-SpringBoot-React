package com.example.trustex.dao;

import com.example.trustex.entity.ExchangeRates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExchangeRatesRepository extends JpaRepository<ExchangeRates, Long> {

    @Query(value = "WITH LatestTimeStamp AS (" +
            "    SELECT MAX(time_stamp ) AS maxTimeStamp " +
            "    FROM exchange_rate" +
            "), " +
            "TopRows AS (" +
            "    SELECT TOP 162 * " +
            "    FROM exchange_rate " +
            "    WHERE time_stamp = (SELECT maxTimeStamp FROM LatestTimeStamp) " +
            "    ORDER BY time_stamp DESC" +
            ") " +
            "SELECT * FROM TopRows", nativeQuery = true)
    List<ExchangeRates> findByOrderLastDesc();


    @Query(value = "SELECT TOP 1 * FROM exchange_rate er WHERE er.currency_code = :currencyCode ORDER BY er.time_stamp DESC", nativeQuery = true)
    Optional<ExchangeRates> findNewestExchangeRateByCurrencyCode(String currencyCode);

    @Query("SELECT e FROM ExchangeRates e WHERE e.currency.currencyCode IN :currencyCodes " +
            "AND e.timeStamp = (SELECT MAX(e2.timeStamp) FROM ExchangeRates e2 WHERE e2.currency = e.currency)")
    List<ExchangeRates> findExchangeRatesForSelectedCurrencies(@Param("currencyCodes") List<String> currencyCodes);




}
