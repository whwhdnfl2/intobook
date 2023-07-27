package com.reboot.intobook.book;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@DisplayName("Book Test")
@Transactional
class BookTest {
    @Autowired
    BookService bookService;

    @Autowired
    BookRepository bookRepository;

    @Test
    @DisplayName("insert Book to System | Success")
    void insertBookSuccess(){
        String isbn = getSampleBook().getIsbn();
        assertNotNull( bookService.insertBook( isbn ) );
    }

    @Test
    @DisplayName("find by title | Success")
    void findBookByTitleSuccess(){
        Book book = getSampleBook();
        bookRepository.save(book);

        List<Book> list = bookRepository.findAllByTitle("정유정의 히말라야 환상방황");

        assertNotNull( list );
        assertEquals("정유정의 히말라야 환상방황", list.get(0).getTitle());
    }


    @Test
    @DisplayName("find by author | Success")
    void findBookByAuthorSuccess(){
        Book book = getSampleBook();
        bookRepository.save(book);

        List<Book> list = bookRepository.findAllByAuthor("정유정");

        assertNotNull( list );
        assertEquals("정유정", list.get(0).getAuthor());
    }


    private Book getSampleBook() {
        return Book.builder()
                .isbn("9788956607726")
                .title("정유정의 히말라야 환상방황")
                .author("정유정")
                .publisher("은행나무")
                .page(303)
                .description("소설가 정유정의 첫 에세이. 타고난 길치인 그녀가 생애 처음 떠나기로 한 여행지는 용감하게도, 자신의 소설 &lt;내 심장을 쏴라&gt;의 주인공 승민이 마지막 순간까지 그리워하던 신들의 땅 히말라야다. 그곳에서 펼쳐질 별들의 바다를 보기 위해 든든한 파트너 김혜나 작가와 함께 떠난 안나푸르나 종주의 기록.")
                .coverImage("https://image.aladin.co.kr/product/3926/8/coversum/8956607729_2.jpg")
                .price(12000)
                .publishDate(LocalDate.parse("2014-04-23"))
                .weight(530)
                .height(210)
                .width(150)
                .depth(17)
                .build();

    }

}