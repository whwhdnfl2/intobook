package com.reboot.intobook.userbook.dto;


import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class UserBookResponseDto {
    private Long userBookPk;
    private int nowPage;
    private Date createdAt;
    private Date startedAt;
    private Date completedAt;
    private UserBookStatus status;
}