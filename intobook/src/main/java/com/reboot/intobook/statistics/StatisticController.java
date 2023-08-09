package com.reboot.intobook.statistics;

import com.reboot.intobook.statistics.dto.GetUserStaticResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<GetUserStaticResponse> getUserStatic(){
        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        GetUserStaticResponse response = statisticsService.getUserStatic(userPk);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
