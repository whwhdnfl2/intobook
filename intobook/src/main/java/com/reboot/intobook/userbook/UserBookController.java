package com.reboot.intobook.userbook;

import com.reboot.intobook.userbook.entity.UserBookStatus;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/userbook")
@Api( tags = {"유저가 저장한 책에 대한 API를 제공하는 Controller"})
public class UserBookController {

    private final UserBookService userBookService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    @PostMapping
    @ApiOperation(value = "새로운 책을 추가하는 메소드")
    public ResponseEntity<?> insertUserBook(@RequestParam long userPk, @RequestParam String isbn, @RequestParam UserBookStatus status) {
        if (userBookService.insertUserBook(userPk, isbn, status)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
        }
    }
}
