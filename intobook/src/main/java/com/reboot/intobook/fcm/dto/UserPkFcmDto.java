package com.reboot.intobook.fcm.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPkFcmDto {
    Long userPk;
    String fcmToken;
}
