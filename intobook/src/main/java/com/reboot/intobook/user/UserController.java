package com.reboot.intobook.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import springfox.documentation.spring.web.json.Json;

@RestController
public class UserController {
    @RequestMapping(value = "/user")
    public String test(){
        return "redirect:https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=d65bd1ef2f9d2f8056ef153efcc983e7&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth";
    }


    @GetMapping("/oauth")
    public String test2(@RequestBody ){
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://kauth.kakao.com/oauth/token";
        String requestBody = {

        }
    }
}
