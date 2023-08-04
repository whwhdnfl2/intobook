package com.reboot.intobook.history;

import com.reboot.intobook.history.dto.GetHistoryListResponse;
import com.reboot.intobook.history.dto.GetHistoryResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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

    /**
     * localhost:8080/historys?userBookPk=2
     * @param userBookPk
     * @return
     */
    @GetMapping()
    public ResponseEntity<GetHistoryListResponse> getHistoryList(@RequestParam("userBookPk") long userBookPk ,@RequestParam("page")  int page ){
        GetHistoryListResponse historyList = historyService.findUserBookHistoryList(userBookPk, page);

        return ResponseEntity.status(HttpStatus.OK).body(historyList);
    }
}

