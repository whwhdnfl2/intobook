package com.reboot.intobook.history.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GetHistoryResponse {

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String comment;

    private int pageAmount;

}
