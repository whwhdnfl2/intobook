package com.reboot.intobook.book;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("search")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    /**
     * 책 검색
     * localhost:8080/search
     *
     * @param keyword
     * @param start
     * @return ResponseEntity
     */
    @GetMapping("")
    public ResponseEntity<?> search(
            @RequestParam String keyword,
            @RequestParam int start) {
        log.info("[Request] search");
        return new ResponseEntity<>(bookService.searchByKeyword(keyword, start), HttpStatus.OK);
    }

    /**
     * 책 상세 정보
     * localhost:8080/search/detail
     *
     * @param isbn
     * @return ResponseEntity
     */
    @GetMapping("/detail")
    public ResponseEntity<?> searchDetail(@RequestParam String isbn) {
        log.info("[Request] search detail");
        return new ResponseEntity<>(bookService.searchByIsbn(isbn), HttpStatus.OK);
    }
}
