package com.reboot.intobook.history;

import com.reboot.intobook.common.dto.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api(tags = "History API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/history")
public class HistoryController {
    private final HistoryService historyService;

    @PostMapping("/{userBookPk}/history")
    @ApiOperation(value="책장 안에 책의 history 생성")
    public ResponseEntity<Long> createHistory(@PathVariable("userBookPk") long userBookPk ){
        Long newHistoryPk = historyService.create(userBookPk);
        return ResponseEntity.status(HttpStatus.CREATED).body(newHistoryPk);
    }

//    @GetMapping("/{userBookPk}/history")
//    public ResponseEntity<Result> getHistory(@PathVariable("userBookPk") long userBookPk ){
//        historyService.findUserBookHistoryAll(userBookPk);
//    }
}

