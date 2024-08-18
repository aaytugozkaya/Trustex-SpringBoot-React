package com.example.trustex.config;

import com.example.trustex.security.JwtAccessDeniedHandler;
import com.example.trustex.security.JwtAuthenticationEntryPoint;
import com.example.trustex.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final AuthenticationProvider authenticationProvider;

    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private static final Logger logger = LogManager.getLogger(SecurityConfig.class);
    private static final String[] WHITE_LIST_URL = {"/auth/**",

            "/swagger-resources",
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/authPage/register",
            "/actuator/health/**",
            "/actuator/health/readiness",
            "/authPage/login",
            "/api/v1/auth/**",
            "/auth/register",
            "/auth/login",
            "/auth/verify",
            "/login",
            "/verify",
            "/swagger-ui.html"};




    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        logger.info("Configuring SecurityFilterChain");
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors((AbstractHttpConfigurer::disable))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/auth/register",
                                "/swagger-resources",
                                "/swagger-resources/**",
                                "/swagger-ui.html",
                                "/configuration/ui",
                                "/configuration/security",
                                "/swagger-ui/**",
                                "/auth/login",
                                "/auth/verify",
                                "/login",
                                "/verify",
                                "/v3/api-docs",
                                "/v3/api-docs/**",
                                "/v2/api-docs",
                                "/",
                                "/auth/verify-code",
                                "/auth/send-verification-code",
                                "/auth/verify/**",
                                "/api/v1/currencies/getAllCurrencies",
                                "/api/v1/convert",
                                "/auth/verify-and-authenticate",
                                "/auth/forgot-password",
                                "/auth/verify?token=",
                                "/auth/reset-password/**",
                                "/auth/reset-password",
                                "/api/personnel-customer",
                                "/api/v1/personnel-customers/**",
                                "/api/v1/exchange-rates/getMain"
                        ).permitAll()
                        .requestMatchers("/profile").authenticated()
                        .requestMatchers(HttpMethod.POST,"/trustex/supports").hasAuthority("ROLE_USER")
                        .requestMatchers(HttpMethod.GET,"/trustex/support").hasAuthority("ROLE_USER")

                        .anyRequest().authenticated()

                )

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                .exceptionHandling(exceptionHandling -> {
                    exceptionHandling.accessDeniedHandler(jwtAccessDeniedHandler);
                    exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint);
                })

                .logout(l -> l.logoutUrl("/log"));
                 http.headers(header -> header.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin", "*")));

        return http.build();
    }


}
