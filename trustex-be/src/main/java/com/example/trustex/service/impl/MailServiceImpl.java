package com.example.trustex.service.impl;

import com.example.trustex.exception.BusinessException;
import com.example.trustex.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final JavaMailSender mailSender;
    @Override
    public void sendVerificationEmail(String to, String verificationLink) {
        String subject = "Kayıt Doğrulama";
        String text = "Merhaba,\n\nKaydınızı tamamlamak için aşağıdaki doğrulama linkine tıklayın:\n\n" + verificationLink;

        sendEmail(to, subject, text);
    }

    @Override
    public void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper;

            helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, Arrays.asList("E-mail gönderilemedi"));
        }

    }

    @Override
    public void sendVerificationCodeEmail(String to, String code) {
        String subject = "Giriş Doğrulama Kodu";
        String text = "Merhaba,\n\nGiriş işleminizi doğrulamak için aşağıdaki kodu girin:\n\n" + code;

        sendEmail(to, subject, text);
    }



}
