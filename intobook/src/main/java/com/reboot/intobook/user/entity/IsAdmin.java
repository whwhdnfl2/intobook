package com.reboot.intobook.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum IsAdmin {
    CLIENT("ROTE_CLIENT"), ADMIN("ROLE_ADMIN");

    private final String key;
}
