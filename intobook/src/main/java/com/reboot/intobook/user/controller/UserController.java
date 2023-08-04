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

    //닉네임 업데이트
    @PatchMapping("/updateNickname")
    public ResponseEntity<?> updateNickname(@RequestHeader("Authorization")String accessToken, @RequestParam String nickname){
        //claim을 jwtUtil로 추출한다. 그리고 해당 claim에서 userPk를 추출한다.
        Claims claims = jwtUtil.extractClaims(accessToken);
        Long userPk = claims.get("userPk", Long.class);
        try{
            userService.updateNickname(userPk, nickname);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //로그아웃. 해당 유저의 fcmToken을 제거한다.
    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization")String accessToken){
        //claim을 jwtUtil로 추출한다. 그리고 해당 claim에서 userPk를 추출한다.
        Claims claims = jwtUtil.extractClaims(accessToken);
        Long userPk = claims.get("userPk", Long.class);
        try{
            userService.deleteFcmToken(userPk);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //fcmToken으로 알람 보내는 테스트
    @GetMapping("/fcmTest")
    public ResponseEntity<?> fcmTest(@RequestHeader("Authorization")String accessToken){
        try{
            fcmService.test(accessToken);
            return  new ResponseEntity<>(HttpStatus.OK);

        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //사용자가 알림을 허용하면 fcmToken을 받아서 저장한다.
    @PostMapping("/tramsmitFcmToken")
    public ResponseEntity<?> tramsmitFcmToken(@RequestHeader("Authorization")String accessToken, @RequestBody String fcmToken){
        //claim을 jwtUtil로 추출한다. 그리고 해당 claim에서 userPk를 추출한다.
        Claims claims = jwtUtil.extractClaims(accessToken);
        Long userPk = claims.get("userPk", Long.class);
        try{
            userService.insertFcmToken(userPk, fcmToken);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}