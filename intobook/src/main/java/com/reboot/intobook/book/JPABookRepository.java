package com.reboot.intobook.book;

import java.util.List;

public interface JPABookRepository {
    void save(Book book);
    Book findByISBN(String isbn);
    List<Book> findByKeyword();
}
