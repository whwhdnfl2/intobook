package com.reboot.intobook.statistics.dto;

import com.reboot.intobook.statistics.entity.ActiveTime;
import com.reboot.intobook.statistics.entity.Jenre;
import com.reboot.intobook.statistics.entity.WeekDay;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetAttentionStatisticsResponse {
    private int attention;
    private boolean multiRead;
    private boolean isBurning;
    private WeekDay mostActiveWeekDay;
    private ActiveTime mostActiveTime;
    private Jenre favoriteGenre;
}
