package com.example.trustex.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private static final Logger logger = LogManager.getLogger(JwtAuthenticationEntryPoint.class);
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        logger.error("Unauthorized: %s" , authException.getMessage());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Yetkisiz erişim! Bu alana erişim izniniz yoktur. Lütfen giriş yapın veya yetkili bir kullanıcı olun.");
    }


}
