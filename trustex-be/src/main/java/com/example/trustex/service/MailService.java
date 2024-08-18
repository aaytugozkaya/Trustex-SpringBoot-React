package com.example.trustex.service;



public interface MailService {
    void sendVerificationEmail(String to, String verificationLink);


    void sendEmail(String to, String subject, String text);

    void sendVerificationCodeEmail(String to, String code);

}
