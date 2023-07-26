package com.reboot.intobook.book.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchDto {
    public Integer totalResults;
    public Integer startIndex;

    public List<Item> item = new ArrayList<>();

    static class Item{
        public String title;
        public String cover;
        public String author;
        public String isbn;
        public String description;
    }
}
