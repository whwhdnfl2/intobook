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
    private String isbn;
    private String title;
    private String author;
    private String publisher;
    private Integer page;
    private String description;
    private String coverImage;
    private int weight;
}
