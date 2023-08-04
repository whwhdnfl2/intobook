package com.reboot.intobook.history.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class GetHistoryListResponse {
    private List<GetHistoryResponse> items;
    private int pageStart;
    private int pageSize;
    private long totalCount;
}
