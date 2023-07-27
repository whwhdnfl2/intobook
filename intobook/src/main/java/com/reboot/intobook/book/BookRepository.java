package com.reboot.intobook.book;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, String> {
    List<Book> findAllByTitle(String title);

    List<Book> findAllByAuthor(String author);

}
