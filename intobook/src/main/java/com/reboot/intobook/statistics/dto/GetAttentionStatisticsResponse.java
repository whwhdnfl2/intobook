package com.reboot.intobook.statistics.dto;

import com.reboot.intobook.statistics.entity.ActiveTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetAttentionStatisticsResponse {
    private int attention;
    private double multiRead ;
    private boolean isBurning ;
    private int mostActiveWeekDay  ;
    private ActiveTime mostActiveTime  ;
    private int favoriteGenre ;
}
