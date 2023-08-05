package com.reboot.intobook.user.controller;

import com.reboot.intobook.fcm.FCMService;
import com.reboot.intobook.user.service.UserService;
import com.reboot.intobook.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation(value="닉네임 바꾼다")
    public ResponseEntity<?> updateNickname(@RequestHeader("Authorization")String accessToken, @RequestParam String nickname){
        Long userPk = jwtUtil.getUserPkFromAccessToken(accessToken);
        try{
            userService.updateNickname(userPk, nickname);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    //로그아웃. 해당 유저의 fcmToken을 제거한다.
    @GetMapping("/logout")
    @ApiOperation(value="로그아웃, fcm토큰 제거")
    public ResponseEntity<?> logout(@RequestHeader("Authorization")String accessToken){
        Long userPk = jwtUtil.getUserPkFromAccessToken(accessToken);
        try{
            userService.deleteFcmToken(userPk);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //fcmToken으로 알람 보내는 테스트
    @GetMapping("/fcmTest")
    @ApiOperation(value="fcm알림 테스트")
            public ResponseEntity<?> fcmTest(@RequestHeader("Authorization")String accessToken){
        try{
            fcmService.test(accessToken);
            return  new ResponseEntity<>(HttpStatus.OK);

        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //사용자가 알림을 허용하면 fcmToken을 받아서 저장한다.
    @PostMapping("/transmitFcmToken")
    @ApiOperation(value="transmitFcmToken을 수신한다")
    public ResponseEntity<?> transmitFcmToken(@RequestHeader("Authorization")String accessToken, @RequestBody String fcmToken){
        Long userPk = jwtUtil.getUserPkFromAccessToken(accessToken);
        try{
            userService.insertFcmToken(userPk, fcmToken);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}