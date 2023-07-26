package com.reboot.intobook.book.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchDetailDto {
    private String title;
    private String url;
    private String thumbnail;
    private String author;
    private String publisher;
    private String isbn;
    private String description;
    private Integer totPage;
}
