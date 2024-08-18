package com.example.trustex.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    private static final Logger logger = LogManager.getLogger(JwtAccessDeniedHandler.class);

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        logger.error("Access Denied: %s " , accessDeniedException.getMessage());
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().write("Bu kaynağa erişmek için izniniz yok");

    }
}
