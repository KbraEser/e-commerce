package com.ecommerce.e_commerce_backend.service;

import com.ecommerce.e_commerce_backend.dto.AddressDto;
import com.ecommerce.e_commerce_backend.entity.Address;
import com.ecommerce.e_commerce_backend.entity.User;
import com.ecommerce.e_commerce_backend.exceptions.ApiException;
import com.ecommerce.e_commerce_backend.repository.AddressRepository;
import com.ecommerce.e_commerce_backend.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public List<AddressDto> getAddresses() {
        User user = SecurityUtils.getCurrentUser();
        return addressRepository.findAllByUserId(user.getId()).stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    @Transactional
    public AddressDto createAddress(AddressDto dto) {
        User user = SecurityUtils.getCurrentUser();
        Address address = new Address();
        copyFields(dto, address);
        address.setUser(user);
        return toDto(addressRepository.save(address));
    }

    @Override
    @Transactional
    public AddressDto updateAddress(AddressDto dto) {
        if (dto.id() == null) {
            throw new ApiException("Adres id alanı gerekli.", HttpStatus.BAD_REQUEST);
        }

        User user = SecurityUtils.getCurrentUser();
        Address address = findOwnedAddress(dto.id(), user.getId());
        copyFields(dto, address);
        return toDto(addressRepository.save(address));
    }

    @Override
    @Transactional
    public void deleteAddress(Long id) {
        User user = SecurityUtils.getCurrentUser();
        Address address = findOwnedAddress(id, user.getId());
        addressRepository.delete(address);
    }

    private Address findOwnedAddress(Long addressId, Long userId) {
        return addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ApiException("Adres bulunamadı.", HttpStatus.NOT_FOUND));
    }

    private void copyFields(AddressDto dto, Address address) {
        address.setTitle(dto.title());
        address.setName(dto.name());
        address.setSurname(dto.surname());
        address.setPhone(dto.phone());
        address.setCity(dto.city());
        address.setDistrict(dto.district());
        address.setNeighborhood(dto.neighborhood());
    }

    private AddressDto toDto(Address address) {
        return new AddressDto(
                address.getId(),
                address.getTitle(),
                address.getName(),
                address.getSurname(),
                address.getPhone(),
                address.getCity(),
                address.getDistrict(),
                address.getNeighborhood()
        );
    }
}
