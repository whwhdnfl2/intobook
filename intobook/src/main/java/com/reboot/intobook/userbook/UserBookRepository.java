package com.reboot.intobook.userbook;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Long> {
    UserBook findByUserAndBook(User user, Book book);

    UserBook findByUserAndBookIsbn(User user, String isbn);
    Page<UserBook> findByUser(User user, Pageable pageable);
    Page<UserBook> findByUserAndStatus(User user, UserBookStatus status, Pageable pageable);
    UserBook findAllByUserAndStatus(User user, UserBookStatus userBookStatus);
}
