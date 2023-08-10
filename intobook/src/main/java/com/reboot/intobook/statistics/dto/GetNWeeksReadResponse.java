package com.reboot.intobook.statistics.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetNWeeksReadResponse {
    List<int[]> weeks;
}
