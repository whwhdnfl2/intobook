package com.reboot.intobook.userbook;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.dto.UserBookListResponseDto;
import com.reboot.intobook.userbook.dto.UserBookResponseDto;
import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Long> {
    UserBook findByUserAndBook(User user, Book book);

    @Query("SELECT new com.reboot.intobook.userbook.dto.UserBookListResponseDto(u.userBookPk, b.title, b.coverImage, u.nowPage, u.startedAt, u.completedAt, u.status) " +
            "FROM UserBook u " +
            "JOIN u.book b " +
            "WHERE u.user = :user " +
            "AND (:status IS NULL OR u.status = :status)")
    Page<UserBookListResponseDto> findByUserAndStatusWithBook(User user, UserBookStatus status, Pageable pageable);


    @Query("SELECT new com.reboot.intobook.userbook.dto.UserBookResponseDto(" +
            "u.userBookPk, b.title, b.coverImage, b.author, b.publisher, " +
            "u.nowPage, u.startedAt, u.completedAt, u.status) " +
            "FROM UserBook u " +
            "JOIN u.book b " +
            "WHERE u.userBookPk = :userBookPk")
    UserBookResponseDto findByUserBookPkWithBook(Long userBookPk);


    UserBook findAllByUserAndStatus(User user, UserBookStatus userBookStatus);
}
