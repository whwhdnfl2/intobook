package com.reboot.intobook.book;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "book")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Book {

    @Id
    private String isbn;

    @NotNull
    private String title;

    @NotNull
    private String author;

    @NotNull
    private String publisher;

    @NotNull
    private int page;

    @NotNull
    private String description;

    @NotNull
    @Column(name = "cover_image")
    private String coverImage;

    @NotNull
    private int price;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @NotNull
    private int weight;

    @NotNull
    private int height;

    @NotNull
    private int width;

    @NotNull
    private int depth;
}
