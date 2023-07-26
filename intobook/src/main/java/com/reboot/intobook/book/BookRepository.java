package com.reboot.intobook.book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class BookRepository implements JPABookRepository{

    private final EntityManager em;
    @Override
    public void save(Book book) {
        em.persist(book);
    }

    @Override
    public Book findByISBN(String isbn) {
        return em.find(Book.class, isbn);
    }

    @Override
    public List<Book> findByKeyword() {
        return null;
    }

}
