package com.reboot.intobook.statistics.dto;

import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GetUserBookStatisticResponse {
    private int userBookReadPages;
    private int userBookPages;
    private LocalDateTime startedAt;
    private long averageReadingTime ;
    private long maxReadingTime ;
    private long totalReadingTime;
    private long remainingTime ;
    private UserBookStatus userBookStatus;
    private double averageSpeed ;
    private LocalDateTime completedAt;
}
