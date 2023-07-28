package com.reboot.intobook.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

//    @GetMapping("/sign-up")
//    public String signUp(@RequestBody UserDto userDto) throws Exception {
//        userService.signUp(userDto);
//        return "회원가입 성공";
//    }
    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }
}