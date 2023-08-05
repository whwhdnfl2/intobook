package com.reboot.intobook.history.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data

public class GetHistoryResponse {

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String comment;

    private int pageAmount;

    @Builder
    public GetHistoryResponse(LocalDateTime startTime, LocalDateTime endTime, String comment, int pageAmount){
        this.startTime = startTime;
        this.endTime = endTime;
        this.comment = comment;
        this.pageAmount = pageAmount;
    }

}
