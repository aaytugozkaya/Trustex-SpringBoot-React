package com.example.trustex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="currency")
@Getter
@Setter
public class Currency {

    @Id
    private String currencyCode;
    @JoinColumn(name = "currency_label_en")
    private String currencyLabelEN;
    @JoinColumn(name = "currency_label_tr")
    private String currencyLabelTR;
    @OneToMany(mappedBy = "currency")
    private List<ExchangeRates> exchangeRates;

    @OneToMany(mappedBy = "currency", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Assets> assets;

    @OneToMany(mappedBy = "targetCurrency", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> targetTransactions;

    @OneToMany(mappedBy = "baseCurrency", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CrossTransaction> baseCrossTransactions;

    @OneToMany(mappedBy = "targetCurrency", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CrossTransaction> targetCrossTransactions;
}
