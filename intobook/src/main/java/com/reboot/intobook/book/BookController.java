package com.reboot.intobook.book;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    /**
     * 책 리스트 정보
     * localhost:8080/search
     *
     * @param keyword
     * @param start
     * @return ResponseEntity
     */
    @GetMapping("list")
    public ResponseEntity<?> getSearchList(
            @RequestParam String keyword,
            @RequestParam int start) {
        log.info("[Request] search");
        return new ResponseEntity<>(bookService.getSearchList(keyword, start), HttpStatus.OK);
    }

    /**
     * 책 상세 정보
     * localhost:8080/search/detail
     *
     * @param isbn
     * @return ResponseEntity
     */
    @GetMapping("detail")
    public ResponseEntity<?> getSearchDetail(@RequestParam String isbn) {
        log.info("[Request] search detail");
        return new ResponseEntity<>(bookService.getSearchDetail(isbn), HttpStatus.OK);
    }

//    @PostMapping("")
}
