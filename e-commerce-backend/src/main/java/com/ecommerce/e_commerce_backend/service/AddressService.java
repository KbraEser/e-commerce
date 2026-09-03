package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.AddressDto;

import java.util.List;

public interface AddressService {
    List<AddressDto> getAddresses();

    AddressDto createAddress(AddressDto addressDto);

    AddressDto updateAddress(AddressDto addressDto);

    void deleteAddress(Long id);
}
