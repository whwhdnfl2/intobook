package com.reboot.intobook.statistics;

import com.reboot.intobook.statistics.dto.GetUserBookStatisticResponse;
import com.reboot.intobook.statistics.dto.GetUserStatisticsResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("statistics")
@RequiredArgsConstructor
@Api(tags= {"Statistics API"}, description = "통계 관련")
public class StatisticController {
    private final StatisticsService statisticsService;

    @GetMapping("/user")
    @ApiOperation(value="해당 회원의 통계 조회")
    public ResponseEntity<GetUserStatisticsResponse> getUserStatic(){
        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        GetUserStatisticsResponse response = statisticsService.getUserStatic(userPk);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/userBook")
    @ApiOperation(value = "특정 유저책의 통계 조회")
    public ResponseEntity<GetUserBookStatisticResponse> getUserBookStatistic(@RequestParam Long userBookPk ){
        GetUserBookStatisticResponse response = statisticsService.getUserBookStatistics(userBookPk);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
