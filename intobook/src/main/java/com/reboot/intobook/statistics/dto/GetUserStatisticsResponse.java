package com.reboot.intobook.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class GetUserStatisticsResponse {
    private int totalReadBook;
    private int maxReadDaysInRow;
    private int totalReadPage;
    private int totalReadTime ;
    private int pagePerHour ;
    private int timePerRead;
}
