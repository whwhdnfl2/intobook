package com.reboot.intobook.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_pk")
    private Long userPk;

    @Column(name = "social_id")
    private String socialId;

    private String nickname;

    private String password;

    private String email;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "is_admin")
    @Enumerated(EnumType.STRING)
    private IsAdmin isAdmin;

    @Column(name = "refresh_token")
    private String refreshToken;

    public User() {

    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }

}
