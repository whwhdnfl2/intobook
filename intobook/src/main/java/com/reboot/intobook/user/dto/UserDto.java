package com.reboot.intobook.user.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
public class UserDto {
    private String email;
    private String password;
    private String nickname;

}
