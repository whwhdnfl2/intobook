package com.reboot.intobook.user.controller;

import com.reboot.intobook.user.UserService;
import com.reboot.intobook.user.dto.UserUpdateNicknameDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/updateNickname")
    public String updateNickname(@RequestBody UserUpdateNicknameDto userUpdateNicknameDto){
        try {
            userService.updateNickname(userUpdateNicknameDto.getEmail(), userUpdateNicknameDto.getNickname());
        }catch (Exception e) {
            return e.getMessage();
        }
        return "nice";
    }
    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}