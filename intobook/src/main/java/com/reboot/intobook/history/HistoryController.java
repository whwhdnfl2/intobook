package com.reboot.intobook.history;

import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api(tags = "History API")
@RestController
@RequiredArgsConstructor
@RequestMapping("historys")
@Slf4j
public class HistoryController {
    private final HistoryService historyService;

    /**
     * localhost:8080/historys?userBookPk=2
     * @param userBookPk
     * @return
     */
    @PostMapping()
    @ApiOperation(value="책장 안에 책의 history 생성")
    public ResponseEntity<Long> createHistory( @RequestParam("userBookPk") long userBookPk) throws Exception {

        Long newHistoryPk = historyService.create( userBookPk );
        return ResponseEntity.status(HttpStatus.CREATED).body(newHistoryPk);
    }

//    @GetMapping("/{userBookPk}/history")
//    public ResponseEntity<Result> getHistory(@PathVariable("userBookPk") long userBookPk ){
//        historyService.findUserBookHistoryAll(userBookPk);
//    }
}

