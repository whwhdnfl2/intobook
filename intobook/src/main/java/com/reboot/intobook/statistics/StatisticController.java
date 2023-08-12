package com.reboot.intobook.statistics;

import com.reboot.intobook.statistics.dto.GetAttentionStatisticsResponse;
import com.reboot.intobook.statistics.dto.GetNWeeksReadResponse;
import com.reboot.intobook.statistics.dto.GetUserBookStatisticResponse;
import com.reboot.intobook.statistics.dto.GetUserStatisticsResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/userBook/{userBookPk}")
    @ApiOperation(value = "특정 유저책의 통계 조회")
    public ResponseEntity<GetUserBookStatisticResponse> getUserBookStatistic(@PathVariable Long userBookPk ){
        GetUserBookStatisticResponse response = statisticsService.getUserBookStatistics(userBookPk);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/week")
    @ApiOperation(value = "요일별 독서량 통계 조회",
            notes = "weekCnt는 값을 넣지 않으면 기본으로 2주로 자동설정, 데이터 값이 없으면 있는 만큼만 나타남")
    public ResponseEntity<GetNWeeksReadResponse> getNweeksStatistic( @RequestParam(required = false, defaultValue = "2") int weekCnt ){
        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        GetNWeeksReadResponse response = statisticsService.getNweeksStatistic( weekCnt, userPk );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/attention")
    @ApiOperation(value = "책에 집중하는 정도에 대한 통계 조회")
    public ResponseEntity<?> getAttentionStatistics(){
        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        if (statisticsService.countHistory(userPk) < 10) {
            return new ResponseEntity<String>("히스토리 기록 부족", HttpStatus.NO_CONTENT);
        }
        GetAttentionStatisticsResponse response = statisticsService.getAttentionStatistics( userPk );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
