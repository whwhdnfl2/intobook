package com.reboot.intobook.userbook;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.book.BookService;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.dto.UserBookListResponseDto;
import com.reboot.intobook.userbook.dto.UserBookOrderBy;
import com.reboot.intobook.userbook.dto.UserBookResponseDto;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/userbook")
@Api( tags = {"UserBook API"}, description = "책장(유저가 저장한 책) 관련")
@Slf4j
public class UserBookController {

    private final UserBookService userBookService;

    private final BookService bookService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    @PostMapping
    @ApiOperation(value = "새로운 책을 추가하는 메소드")
    public ResponseEntity<String> insertUserBook(
            @RequestParam String isbn) {
        log.info("북 생성 :" + isbn);
        Book book = bookService.getBook(isbn);
        if (book == null) {
            book = bookService.insertBook(isbn);
        }
        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = User.builder().userPk(userPk).build();

        if (userBookService.insertUserBook(user, book)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    @ApiOperation(value = "조건에 따라 책의 리스트를 조회하는 메소드")
    public ResponseEntity<?> getUserBookList(
            @RequestParam(required = false) UserBookStatus status,
            @RequestParam UserBookOrderBy orderBy,
            @RequestParam int page) {
        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = User.builder().userPk(userPk).build();
        Page<UserBookListResponseDto> userBookList = userBookService.findUserBookList(user, status, orderBy, page);
        if (userBookList != null && userBookList.getSize() != 0) {
            return new ResponseEntity<Page<UserBookListResponseDto>>(userBookList, HttpStatus.OK);
        }else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{userBookPk}")
    @ApiOperation(value = "책 한권을 조회하는 메소드")
    public ResponseEntity<?> getUserBook (@PathVariable Long userBookPk){
        UserBookResponseDto userBook = userBookService.findUserBook(userBookPk);
        if (userBook != null) {
            return new ResponseEntity<UserBookResponseDto>(userBook, HttpStatus.OK);
        }else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/nowreading")
    @ApiOperation(value = "현재 읽고있는 책 한권을 조회하는 메소드")
    public ResponseEntity<?> getNowReadingUserBook (
    ) {

        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = User.builder().userPk(userPk).build();
        UserBookResponseDto nowReadingUserBook = userBookService.findNowReadingUserBook(user);
        if (nowReadingUserBook != null) {
            return new ResponseEntity<UserBookResponseDto>(nowReadingUserBook, HttpStatus.OK);
        }else {
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }


    @PatchMapping("/{userBookPk}")
    @ApiOperation(value = "책의 상태를 변경하는 메소드")
    public ResponseEntity<String> updateUserBookStatus(@PathVariable("userBookPk") long userBookPk, @RequestParam UserBookStatus status) {
        if (userBookService.updateUserBookStatus(userBookPk, status)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userBookPk}")
    @ApiOperation(value = "책장에서 책을 삭제하는 메서드")
    public ResponseEntity<String> updateUserBook(@PathVariable("userBookPk") long userBookPk) {
        if (userBookService.deleteUserBook(userBookPk)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
        }
    }
}
