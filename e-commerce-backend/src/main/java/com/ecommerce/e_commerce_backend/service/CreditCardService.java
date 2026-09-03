package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.CreditCardDto;

import java.util.List;

public interface CreditCardService {
    List<CreditCardDto> getCards();

    CreditCardDto createCard(CreditCardDto cardDto);

    CreditCardDto updateCard(CreditCardDto cardDto);

    void deleteCard(Long id);
}
