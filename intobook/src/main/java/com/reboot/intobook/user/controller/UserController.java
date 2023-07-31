package com.reboot.intobook.user.controller;

import com.reboot.intobook.user.UserService;
import com.reboot.intobook.user.dto.UserUpdateNicknameDto;
import com.reboot.intobook.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static java.awt.SystemColor.info;

@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Value("${jwt.secretKey}")
    private String secretKey;

    private JwtUtil jwtUtil = new JwtUtil();

    @PatchMapping("/updateNickname")
    public ResponseEntity<?> updateNickname(@RequestHeader("Authorization")String accessToken, @RequestParam String nickname){
        log.info("accessToken: " + accessToken);

        accessToken = accessToken.substring(7);

        Claims claims = jwtUtil.extractClaims(accessToken, secretKey);
        Long userPk = claims.get("userPk", Long.class);
        log.info("UserPk: " + userPk);
        try{
            userService.updateNickname(userPk, nickname);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}