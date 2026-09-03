package com.ecommerce.e_commerce_backend.controller;

import com.ecommerce.e_commerce_backend.dto.CreditCardDto;
import com.ecommerce.e_commerce_backend.service.CreditCardService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/card")
public class CreditCardController {

    private final CreditCardService creditCardService;

    public CreditCardController(CreditCardService creditCardService) {
        this.creditCardService = creditCardService;
    }

    @GetMapping
    public List<CreditCardDto> getCards() {
        return creditCardService.getCards();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreditCardDto createCard(@Valid @RequestBody CreditCardDto cardDto) {
        return creditCardService.createCard(cardDto);
    }

    @PutMapping
    public CreditCardDto updateCard(@Valid @RequestBody CreditCardDto cardDto) {
        return creditCardService.updateCard(cardDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCard(@PathVariable Long id) {
        creditCardService.deleteCard(id);
    }
}
