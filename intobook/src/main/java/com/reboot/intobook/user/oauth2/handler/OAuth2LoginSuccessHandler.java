package com.reboot.intobook.user.oauth2.handler;

import com.reboot.intobook.user.jwt.JwtService;
import com.reboot.intobook.user.oauth2.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        log.info("OAuth2 Login 성공!");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            loginSuccess(response, oAuth2User, request.getParameter("fcmToken")); // 로그인에 성공한 경우 access, refresh 토큰 생성

        } catch (Exception e) {
            log.error(e.getMessage());
        }

    }

    // TODO : 소셜 로그인 시에도 무조건 토큰 생성하지 말고 JWT 인증 필터처럼 RefreshToken 유/무에 따라 다르게 처리해보기

    @Value("${redirect.url}")
    private String url;
    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User, String fcmToken) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getUserPk());
        String refreshToken = jwtService.createRefreshToken();
        log.info("리다이렉트 " +url);
        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);
        response.sendRedirect(url + "?accessToken=" + "Bearer " + accessToken + "&refreshToken=" + "Bearer " + refreshToken);
        jwtService.updateRefreshTokenAndFcmToken(oAuth2User.getUserPk(), refreshToken, fcmToken);
    }
}