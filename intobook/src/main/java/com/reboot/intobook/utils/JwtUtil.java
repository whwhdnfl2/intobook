package com.reboot.intobook.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtUtil {

    // JWT 토큰에서 클레임 추출
    public Claims extractClaims(String token, String secretKey) {
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }
}