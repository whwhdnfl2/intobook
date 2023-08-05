package com.reboot.intobook.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtUtil {
    public Long getUserPkFromAccessToken(String token, String secretKey){
        Claims claims = extractClaims(token, secretKey);
        Long userPk = claims.get("userPk", Long.class);
        return userPk;
    }

    public String getEmailFromAccessToken(String token, String secretKey){
        Claims claims = extractClaims(token, secretKey);
        String email = claims.get("email", String.class);
        return email;
    }

    // JWT 토큰에서 클레임 추출
    public Claims extractClaims(String token, String secretKey) {
        token = token.substring(7);
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }
}