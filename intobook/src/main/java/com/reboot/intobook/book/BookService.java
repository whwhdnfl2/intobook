package com.reboot.intobook.book;

import com.reboot.intobook.book.dto.SearchDetailDto;
import com.reboot.intobook.book.dto.SearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

    @Value("${into-book.api.key}")
    private String apiKey;
    private final String DETAIL_URL = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx";
    private final String SEARCH_URL = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";

    private final BookRepository bookRepository;

    /**
     * searchByKeyword
     *
     * @param keyword : 저자 + 제목
     * @param startIndex : 페이지수 (1 : 1~50번째 책, 2 : 51~100번째 책)
     * @return SearchDto
     */
    public SearchDto searchByKeyword(String keyword, int startIndex) {
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
        return restTemplate.exchange(uri, HttpMethod.GET, null, SearchDto.class).getBody();
    }


    /**
     * searchByIsbn
     *
     * @param isbn : 13자리 isbn으로 검색
     * @return SearchDetailDto
     */
    public SearchDetailDto searchByIsbn(String isbn){
        URI uri = UriComponentsBuilder
                .fromUriString(DETAIL_URL)
                .queryParam("ttbkey", apiKey)
                .queryParam("ItemId", isbn)
                .queryParam("ItemIdType", "ISBN13")
                .queryParam("output", "js")
                .queryParam("Version", "20131101")
                .queryParam("OptResult","packing")
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        Map item = (Map) ((List) restTemplate.getForObject(uri, Map.class).get("item")).get(0);
        System.out.println( item );

        return SearchDetailDto.builder()
                .isbn((String) item.get("isbn"))
                .title((String) item.get("title"))
                .author((String) item.get("author"))
                .publisher((String) item.get("publisher"))
                .page((Integer) ( (Map) item.get("subInfo") ).get("itemPage"))
                .description((String) item.get("description"))
                .coverImage((String) item.get("cover"))
                .weight( (Integer) ( (Map) ((Map) item.get("subInfo")).get("packing") ).get("weight") )
                .build();
    }
}
