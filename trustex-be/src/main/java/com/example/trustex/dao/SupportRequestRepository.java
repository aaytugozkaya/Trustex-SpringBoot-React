package com.example.trustex.dao;

import com.example.trustex.entity.SupportRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SupportRequestRepository extends JpaRepository<SupportRequest,Long> {
    List<SupportRequest> findByUserId(Long userId);
}
