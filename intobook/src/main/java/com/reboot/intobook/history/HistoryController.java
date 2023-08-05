package com.reboot.intobook.history;

import com.reboot.intobook.history.dto.GetHistoryListResponse;
import com.reboot.intobook.history.dto.GetHistoryResponse;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;


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
    public ResponseEntity<Long> createHistory( @RequestParam("userBookPk") long userBookPk) {

        Long newHistoryPk = historyService.create( userBookPk );
        return ResponseEntity.status(HttpStatus.CREATED).body(newHistoryPk);
    }

    /**
     * localhost:8080/historys?userBookPk=2
     * @param userBookPk
     * @return
     */
    @GetMapping("/userBook")
    @ApiOperation(value="userBook에 해당하는 기록 전부 select")
    public ResponseEntity<GetHistoryListResponse> getUserBookHistoryList(@RequestParam("userBookPk") long userBookPk ,@RequestParam("page")  int page ){
        try{
            GetHistoryListResponse historyList = historyService.findUserBookHistoryList(userBookPk, page);
            return  ResponseEntity.status(HttpStatus.OK).body(historyList);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user")
    @ApiOperation(value="user에 해당하는 기록 전부 select")
    public ResponseEntity<List<GetHistoryResponse>> getUserHistoryList(@RequestHeader("Authorization") String accessToken){
        JwtUtil jwtUtil = new JwtUtil();
        Claims claims = jwtUtil.extractClaims(accessToken);
        try{
            Long userPk = claims.get("userPk", Long.class);
            List<GetHistoryResponse> historyList = historyService.findUserHistoryList(userPk);
            return  ResponseEntity.status(HttpStatus.OK).body(historyList);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateHistoryEndtime")
    @ApiOperation(value="책을 읽고 나서 endTime을 수정하는 api")
    public ResponseEntity<GetHistoryListResponse> updateHistoryEndtime(@PathVariable("historyPk") long historyPk ,@RequestParam("endTime") LocalDateTime endTime ){
        try{
            historyService.updateEndtime(historyPk, endTime);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (NoSuchElementException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateHistoryPressure")
    @ApiOperation(value="책을 읽고 나서 pressure을 수정하는 api")
    public ResponseEntity<GetHistoryListResponse> updateHistoryPressure(@PathVariable("historyPk") long historyPk ,@RequestParam("pressure") int pressure ){
        try{
            historyService.updatePressure(historyPk, pressure);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (NoSuchElementException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping()
    @ApiOperation(value="comment 수정하는 api")
    public ResponseEntity<GetHistoryListResponse> updateHistoryComment(@PathVariable("historyPk") long historyPk, @RequestParam("comment") String comment ){
        try{
            historyService.updateComment(historyPk, comment);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (NoSuchElementException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping()
    @ApiOperation(value="history 삭제 api")
    public ResponseEntity<GetHistoryListResponse> deleteHistory(@PathVariable("historyPk") long historyPk){
        try{
            historyService.delete(historyPk);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (NoSuchElementException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}

