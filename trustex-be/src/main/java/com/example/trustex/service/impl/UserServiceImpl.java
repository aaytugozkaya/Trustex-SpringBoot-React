package com.example.trustex.service.impl;

import com.example.trustex.dao.UserRepository;
import com.example.trustex.dto.UserDto;
import com.example.trustex.dto.UserProfileDto;
import com.example.trustex.entity.User;
import com.example.trustex.entity.UserType;
import com.example.trustex.exception.BusinessException;
import com.example.trustex.exception.UserNotFoundException;
import com.example.trustex.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetails) {
            String usernameWithType = ((UserDetails) authentication.getPrincipal()).getUsername();

            // Kullanıcı adını ayırarak idNumber ve userType'ı alıyoruz
            String[] parts = usernameWithType.split("_");
            if (parts.length < 2) {
                throw new IllegalStateException("Geçersiz kullanıcı adı formatı: " + usernameWithType);
            }
            String idNumber = parts[0];
            UserType userType = UserType.valueOf(parts[1]);

            List<User> users = getUsersByIdNumberAndType(idNumber, userType);
            if (users != null && !users.isEmpty()) {
                return users.get(0);
            }
            throw new RuntimeException("Geçerli kullanıcı bulunamadı.");
        }
        throw new RuntimeException("Geçerli kullanıcı bulunamadı.");
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() ->
                new BusinessException(HttpStatus.BAD_REQUEST , Collections.singletonList("Kullanıcı bulunamadı")));
    }

    @Override
    public UserProfileDto getUserDtoById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new BusinessException(HttpStatus.BAD_REQUEST , Collections.singletonList("Kullanıcı bulunamadı")));
        UserProfileDto userProfileDto = new UserProfileDto();
        userProfileDto.setId(user.getId());
        userProfileDto.setFirstname(user.getFirstname());
        userProfileDto.setLastname(user.getLastname());
        userProfileDto.setIdNumber(user.getIdNumber());
        userProfileDto.setCountry(user.getCountry());
        userProfileDto.setDateOfBirth(user.getDateOfBirth());
        userProfileDto.setMobilePhone(user.getMobilePhone());
        userProfileDto.setEmail(user.getEmail());
        userProfileDto.setCustomerNumber(user.getCustomerNumber());

        return userProfileDto;
    }



    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() ->
                new UserNotFoundException("Kullanıcı bulunamadı " ));
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }



    public List<User> getUsersByIdNumberAndType(String idNumber, UserType userType) {
        return userRepository.findByIdNumberAndUserType(idNumber, userType);
    }

    @Override
    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> findByCustomerNumber(String customerNumber){
        return userRepository.findByCustomerNumber(customerNumber);
    }

    @Override
    public UserProfileDto saveUser(User user) {
        User user1 = userRepository.findById(user.getId()).orElseThrow(() ->
                new BusinessException(HttpStatus.BAD_REQUEST , Collections.singletonList("Kullanıcı bulunamadı")));
        user1.setFirstname(user.getFirstname());
        user1.setLastname(user.getLastname());
        user1.setEmail(user.getEmail());
        user1.setMobilePhone(user.getMobilePhone());
        user1.setIdNumber(user.getIdNumber());
        user1.setCountry(user.getCountry());
        user1.setDateOfBirth(user.getDateOfBirth());
        userRepository.save(user1);

        return UserProfileDto.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .idNumber(user.getIdNumber())
                .country(user.getCountry())
                .dateOfBirth(user.getDateOfBirth())
                .mobilePhone(user.getMobilePhone())
                .email(user.getEmail())
                .build();
    }


}
