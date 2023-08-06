package com.reboot.intobook.book;


import com.reboot.intobook.user.entity.User;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Api(tags={"Book API"}, description="알라딘에서 도서정보 불러오기")
public class BookController {

    private final BookService bookService;

    @GetMapping("")
    @ApiOperation(value="알라딘에서 책 리스트 조회",
    notes="키워드를 통해 알라딘에서 책 리스트를 조회한다. 50권씩 조회")
    @ApiImplicitParams({
            @ApiImplicitParam(
                    name="keyword",
                    value="저자 / 책 제목 (어떤 걸 넣든 상관없음)",
                    example ="정유정"
            ),
            @ApiImplicitParam(
                    name="start",
                    value="페이지 수 (1 -> 1~50번째 책 조회, 2-> 51~100번째 책 조회)",
                    example = "1"
            )
    })
    public ResponseEntity<?> getSearchList(
            @RequestParam String keyword,
            @RequestParam int start) {
        log.info("[Request] search");
        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = User.builder().userPk(userPk).build();
        return new ResponseEntity<>(bookService.getSearchList(keyword, start, user), HttpStatus.OK);
    }

    @GetMapping("/{isbn}")
    @ApiOperation(value="알라딘에서 책 상세 조회",
    notes="13자리 isbn을 입력하면 알라딘에서 책 상세 조회 가능")
    @ApiImplicitParam(
            name="isbn",
            value="isbn",
            example ="9791188810123"
    )
    public ResponseEntity<?> getSearchDetail(
            @PathVariable String isbn) {
        log.info("[Request] search detail");
        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = User.builder().userPk(userPk).build();
        return new ResponseEntity<>(bookService.getSearchDetail(user, isbn), HttpStatus.OK);
    }

//    @PostMapping("")
}
