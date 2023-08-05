package com.reboot.intobook.book;

import com.reboot.intobook.book.dto.BookDetailDto;
import com.reboot.intobook.book.dto.SearchListDto;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

    @Value("${into-book.api.key}")
    private String apiKey;
    private final String DETAIL_URL = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx";
    private final String SEARCH_URL = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";

    private final BookRepository bookRepository;
    private final UserBookRepository userBookRepository;

    /**
     * insertBook : client가 직접 호출하는 게 아니라, 시스템 내부적으로 사용함
     * @param isbn
     * @return 등록된 책의 isbn
     */
    @Transactional
    public Book insertBook( String isbn ){
        String ItemIdType = "ISBN";
        if (isbn.length() > 10) ItemIdType += "13";
        URI uri = UriComponentsBuilder
                .fromUriString(DETAIL_URL)
                .queryParam("ttbkey", apiKey)
                .queryParam("ItemId", isbn)
                .queryParam("ItemIdType", ItemIdType)
                .queryParam("output", "js")
                .queryParam("Version", "20131101")
                .queryParam("OptResult","packing")
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        Map item = (Map) ((List) restTemplate.getForObject(uri, Map.class).get("item")).get(0);
        System.out.println( item );
        String realIsbn = (String) item.get("isbn13");
        if (((String) item.get("isbn13")).equals("")) {
            realIsbn = (String) item.get("isbn");
        }
        Book find = Book.builder()
                .isbn(realIsbn)
                .title((String) item.get("title"))
                .author((String) item.get("author"))
                .publisher((String) item.get("publisher"))
                .page((Integer) ( (Map) item.get("subInfo") ).get("itemPage"))
                .description((String) item.get("description"))
                .coverImage((String) item.get("cover"))
                .price((Integer) item.get("priceStandard"))
                .publishDate( LocalDate.parse( (String) item.get("pubDate")) )
                .weight( (Integer) ( (Map) ((Map) item.get("subInfo")).get("packing") ).get("weight") )
                .height( (Integer) ( (Map) ((Map) item.get("subInfo")).get("packing") ).get("sizeWidth") )
                .width( (Integer) ( (Map) ((Map) item.get("subInfo")).get("packing") ).get("sizeHeight") )
                .depth( (Integer) ( (Map) ((Map) item.get("subInfo")).get("packing") ).get("sizeDepth") )
                .build();

        return bookRepository.save( find );
    }

    /**
     * getSearchList
     *
     * @param keyword : 저자 + 제목
     * @param startIndex : 페이지수 (1 : 1~50번째 책, 2 : 51~100번째 책)
     * @return SearchDto
     */
    public SearchListDto getSearchList(String keyword, int startIndex, User user) {
        URI uri = UriComponentsBuilder
                .fromUriString(SEARCH_URL)
                .queryParam("TTBKey", apiKey)
                .queryParam("Query", keyword)
                .queryParam("Start", startIndex)
                .queryParam("MaxResults", 50)
                .queryParam("Output", "JS")
                .queryParam("Version", 20131101)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        SearchListDto searchListDto = restTemplate.exchange(uri, HttpMethod.GET, null, SearchListDto.class).getBody();
        for (int i = 0; i < searchListDto.item.size(); i++) {
            UserBook userBook = userBookRepository.findByUserAndBookIsbn(user,
                    searchListDto.getIsbn(i));
            if (userBook == null) continue;
            UserBookStatus status = userBook.getStatus();
            searchListDto.setStatus(i, status);
        }
        return searchListDto;
    }



    public Book getBook(String isbn) {
        return bookRepository.findById(isbn).orElse(null);
    }

    /**
     * getSearchDetail
     *
     * @param isbn : 13자리 isbn으로 검색
     * @return Book
     */
    public BookDetailDto getSearchDetail(User user, String isbn){
        String ItemIdType = "ISBN";
        if (isbn.length() > 10) ItemIdType += "13";
        URI uri = UriComponentsBuilder
                .fromUriString(DETAIL_URL)
                .queryParam("ttbkey", apiKey)
                .queryParam("ItemId", isbn)
                .queryParam("ItemIdType", ItemIdType)
                .queryParam("output", "js")
                .queryParam("Version", "20131101")
                .queryParam("OptResult","packing")
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        Map item = (Map) ((List) restTemplate.getForObject(uri, Map.class).get("item")).get(0);
        System.out.println( item );
        String realIsbn = (String) item.get("isbn13");
        if (((String) item.get("isbn13")).equals("")) {
            realIsbn = (String) item.get("isbn");
        }
        UserBook userBook = userBookRepository.findByUserAndBookIsbn(user,realIsbn);
        UserBookStatus status = userBook == null ? null : userBook.getStatus();
        return BookDetailDto.builder()
                .isbn(realIsbn)
                .title((String) item.get("title"))
                .cover((String) item.get("cover"))
                .author((String) item.get("author"))
                .page((Integer) ( (Map) item.get("subInfo") ).get("itemPage"))
                .description((String) item.get("description"))
                .status(status)
                .build();
    }
}
