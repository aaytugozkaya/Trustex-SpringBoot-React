package com.example.trustex.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private static final Logger logger= (Logger) LogManager.getLogger(JwtAuthenticationFilter.class);
    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;

    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String autHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        if (autHeader == null || !autHeader.startsWith("Bearer ")) {
            logger.info("No JWT token found in request headers");
            logger.info("header!!!!: " + autHeader);
            filterChain.doFilter(request, response);
            return;
        }

            jwt = autHeader.substring(7);
            userEmail = jwtService.extractUsername(jwt);

            logger.info("JWT token found, extracting user: {}", userEmail);
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                try {
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                    if (jwtService.isTokenValid(jwt, userDetails)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)
                        );
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        logger.info("User authenticated successfully");
                    } else {
                        logger.info("JWT Token is not valid");
                    }
                } catch (Exception e) {
                    logger.error("Error processing JWT authentication: {}", e.getMessage());
                    throw new ServletException("Error processing JWT authentication", e);
                }
            }
            filterChain.doFilter(request, response);
        }

    }

