package com.reboot.intobook.history.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data

public class GetHistoryResponse {

    private long historyPk;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private long readingTime;

    private String comment;

    private int pageAmount;

    @Builder
    public GetHistoryResponse(long historyPk, LocalDateTime startTime, LocalDateTime endTime, long readingTime, String comment, int pageAmount){
        this.historyPk = historyPk;
        this.startTime = startTime;
        this.endTime = endTime;
        this.readingTime = readingTime;//ChronoUnit.MINUTES.between(startTime, endTime);
        this.comment = comment;
        this.pageAmount = pageAmount;
    }
}
