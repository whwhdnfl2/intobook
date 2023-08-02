package com.reboot.intobook.userbook;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.book.BookService;
import com.reboot.intobook.user.service.UserService;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.dto.UserBookListResponseDto;
import com.reboot.intobook.userbook.dto.UserBookOrderBy;
import com.reboot.intobook.userbook.dto.UserBookResponseDto;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import com.reboot.intobook.utils.JwtUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/userbook")
@Api( tags = {"유저가 저장한 책에 대한 API를 제공하는 Controller"})
public class UserBookController {

    private final UserBookService userBookService;

    private final BookService bookService;
    private final UserService userService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    @PostMapping
    @ApiOperation(value = "새로운 책을 추가하는 메소드")
    public ResponseEntity<String> insertUserBook(
//            @RequestHeader("Authorization") String accessToken,
            @RequestParam String isbn, @RequestParam UserBookStatus status) {
        Book book = bookService.getBook(isbn);
        if (book == null) {
            book = bookService.insertBook(isbn);
        }
//        JwtUtil jwtUtil = new JwtUtil();
//        Long userPk = jwtUtil.extractClaims(accessToken).get("userPk", Long.class);
        User user = User.builder().userPk(1L).build(); //임시 userPk 1

        if (userBookService.insertUserBook(user, book, status)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    @ApiOperation(value = "조건에 따라 책의 리스트를 조회하는 메소드")
    public ResponseEntity<?> getUserBookList(
//            @RequestHeader("Authorization") String accessToken,
            @RequestParam(required = false) UserBookStatus status,
            @RequestParam UserBookOrderBy orderBy,
            @RequestParam int page) {
//        Long userPk = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        JwtUtil jwtUtil = new JwtUtil();
//        Long userPk = jwtUtil.extractClaims(accessToken).get("userPk", Long.class);
        User user = User.builder().userPk(1L).build();  //임시 userPk 1
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
