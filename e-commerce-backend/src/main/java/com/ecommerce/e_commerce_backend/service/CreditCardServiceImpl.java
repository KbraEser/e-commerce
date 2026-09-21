package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.CreditCardDto;
import com.ecommerce.e_commerce_backend.entity.CreditCard;
import com.ecommerce.e_commerce_backend.entity.User;
import com.ecommerce.e_commerce_backend.exceptions.ApiException;
import com.ecommerce.e_commerce_backend.repository.CreditCardRepository;
import com.ecommerce.e_commerce_backend.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditCardServiceImpl implements CreditCardService {

    private final CreditCardRepository creditCardRepository;

    public CreditCardServiceImpl(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    @Override
    public List<CreditCardDto> getCards() {
        User user = SecurityUtils.getCurrentUser();
        return creditCardRepository.findAllByUserId(user.getId()).stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    @Transactional
    public CreditCardDto createCard(CreditCardDto dto) {
        User user = SecurityUtils.getCurrentUser();
        CreditCard card = new CreditCard();
        copyFields(dto, card);
        card.setUser(user);
        return toDto(creditCardRepository.save(card));
    }

    @Override
    @Transactional
    public CreditCardDto updateCard(CreditCardDto dto) {
        if (dto.id() == null) {
            throw new ApiException("Kart id alanı gerekli.", HttpStatus.BAD_REQUEST);
        }

        User user = SecurityUtils.getCurrentUser();
        CreditCard card = findOwnedCard(dto.id(), user.getId());
        copyFields(dto, card);
        return toDto(creditCardRepository.save(card));
    }

    @Override
    @Transactional
    public void deleteCard(Long id) {
        User user = SecurityUtils.getCurrentUser();
        CreditCard card = findOwnedCard(id, user.getId());
        creditCardRepository.delete(card);
    }

    private CreditCard findOwnedCard(Long cardId, Long userId) {
        return creditCardRepository.findByIdAndUserId(cardId, userId)
                .orElseThrow(() -> new ApiException("Kart bulunamadı.", HttpStatus.NOT_FOUND));
    }

    private void copyFields(CreditCardDto dto, CreditCard card) {
        String cardNumber = dto.cardNumber();
        String lastFour= cardNumber.substring(Math.max(0, cardNumber.length()-4));
        card.setCardNumber(lastFour);
        card.setExpireMonth(dto.expireMonth());
        card.setExpireYear(dto.expireYear());
        card.setNameOnCard(dto.nameOnCard());
    }

    private CreditCardDto toDto(CreditCard card) {
        return new CreditCardDto(
                card.getId(),
                card.getCardNumber(),
                card.getExpireMonth(),
                card.getExpireYear(),
                card.getNameOnCard()
        );
    }
}
