package com.reboot.intobook.user.controller;

import com.reboot.intobook.fcm.FCMService;
import com.reboot.intobook.user.service.UserService;
import com.reboot.intobook.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    @Autowired
    private final UserService userService;
    private final FCMService fcmService;

    private final JwtUtil jwtUtil = new JwtUtil();

    @PatchMapping()
    public ResponseEntity<?> updateNickname(@RequestHeader("Authorization")String accessToken, @RequestParam String nickname){
        log.info("accessToken: " + accessToken);

        Claims claims = jwtUtil.extractClaims(accessToken);
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

    @GetMapping("/login")
    public String login() {
        return "로그인 페이지";
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization")String accessToken){

        Claims claims = jwtUtil.extractClaims(accessToken);
        Long userPk = claims.get("userPk", Long.class);
        try{
            userService.logout(userPk);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/fcmTest")
    public  ResponseEntity<?> fcmTest(@RequestParam("fcmToken")String fcmToken){
        try{
            fcmService.sendSaleCompletedMessage(fcmToken);
            return  new ResponseEntity<>(HttpStatus.OK);

        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}