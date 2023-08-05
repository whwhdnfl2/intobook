package com.reboot.intobook.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtUtil {

    private final String secretKey = "sc136as1c5qw4c13ax1cz3x5c4as3c1a35scczx3casc54";


    public Long getUserPkFromAccessToken(String token){
        Claims claims = extractClaims(token);
        Long userPk = claims.get("userPk", Long.class);
        return userPk;
    }

    public String getEmailFromAccessToken(String token){
        Claims claims = extractClaims(token);
        String email = claims.get("email", String.class);
        return email;
    }

    // JWT 토큰에서 클레임 추출
    public Claims extractClaims(String token) {
        token = token.substring(7);
        log.info("token 이런: " + token);
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }
}