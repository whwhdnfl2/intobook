package com.reboot.intobook.book.dto;

import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SearchListDto {
    public Integer totalResults;
    public Integer startIndex;

    public List<Item> item = new ArrayList<>();

    static class Item{
        public String title;
        public String cover;
        public String author;
        public String isbn13;
        public String isbn;
        public String description;
        public UserBookStatus status;
    }

    public String getIsbn(int idx) {
        String isbn = this.item.get(idx).isbn13;
        if (isbn.equals("")) isbn = this.item.get(idx).isbn;
        return isbn;
    }
    public void setStatus(int idx, UserBookStatus status) {
        this.item.get(idx).status = status;
    }
}
