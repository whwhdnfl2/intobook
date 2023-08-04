package com.reboot.intobook.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtUtil {

    private final String secretKey = "sc136as1c5qw4c13ax1cz3x5c4as3c1a35scczx3casc54";

    // JWT 토큰에서 클레임 추출
    public Claims extractClaims(String token) {
        token = token.substring(7);
        return Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }
}