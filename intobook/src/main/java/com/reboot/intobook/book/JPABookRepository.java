package com.reboot.intobook.book;

import java.util.List;

public interface JPABookRepository {
    String save(Book book);
    Book findByISBN(String isbn);
    List<Book> findByKeyword();
}
