package com.reboot.intobook.userbook;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.userbook.dto.UserBookListResponseDto;
import com.reboot.intobook.userbook.dto.UserBookResponseDto;
import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Long> {
    UserBook findByUserPkAndBook(Long userPk, Book book);

    @Query("SELECT new com.reboot.intobook.userbook.dto.UserBookListResponseDto(u.userBookPk, b.title, b.coverImage, u.nowPage, u.createdAt, u.startedAt, u.completedAt, u.status) " +
            "FROM UserBook u " +
            "JOIN u.book b " +
            "WHERE u.userPk = :userPk " +
            "AND (:status IS NULL OR u.status = :status)")
    Page<UserBookListResponseDto> findByUserPkAndStatusWithBook(Long userPk, UserBookStatus status, Pageable pageable);


    @Query("SELECT new com.reboot.intobook.userbook.dto.UserBookResponseDto(" +
            "u.userBookPk, b.title, b.coverImage, b.description, b.author, b.publisher, " +
            "u.nowPage, u.createdAt, u.startedAt, u.completedAt, u.status) " +
            "FROM UserBook u " +
            "JOIN u.book b " +
            "WHERE u.userBookPk = :userBookPk")
    UserBookResponseDto findByUserBookPkWithBook(Long userBookPk);
}
