package com.reboot.intobook.user.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long user_pk;

    private String name;

    private String nickname;

    private String password;

    private String created_at;

    private String sns_id;

    private String sns_type;

    private isAdmin is_admin;

}
