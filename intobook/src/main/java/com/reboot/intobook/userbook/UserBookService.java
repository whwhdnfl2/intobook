package com.reboot.intobook.userbook;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.dto.UserBookListResponseDto;
import com.reboot.intobook.userbook.dto.UserBookOrderBy;
import com.reboot.intobook.userbook.dto.UserBookResponseDto;
import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserBookService {

    private final UserBookRepository userBookRepository;

    public void nowReadingToReading (User user) {
        UserBook preReadingBook = userBookRepository.findByUserAndStatus(user, UserBookStatus.NOWREADING);
        if (preReadingBook == null) return;
        preReadingBook.setStatus(UserBookStatus.READING);
        userBookRepository.save(preReadingBook);
    }

    @Transactional
    public boolean insertUserBook(User user, Book book) {
        UserBook userBook = userBookRepository.findByUserAndBook(user, book);
        nowReadingToReading(user);
        if (userBook != null) {
            if (userBook.isDeleted()) {
                userBook.setDeleted(false);
            }
            userBook.setStatus(UserBookStatus.NOWREADING);
        }else {
            userBook = new UserBook(user, book, UserBookStatus.NOWREADING);
        }
        return userBookRepository.save(userBook) != null;
    }

    @Transactional
    public Page<UserBookListResponseDto> findUserBookList(User user, UserBookStatus status, UserBookOrderBy orderBy, int page){
        Sort sort;
        if (orderBy == UserBookOrderBy.title) {
            sort = Sort.by("book.title").and(Sort.by("startedAt").descending());
        } else if (orderBy == UserBookOrderBy.author) {
            sort = Sort.by("book.author").and(Sort.by("startedAt").descending());
        } else {
            sort = Sort.by(orderBy.toString()).descending();
        }
        PageRequest pageRequest = PageRequest.of(page, 9, sort);


        Page<UserBook> userBookList = null;
        if (status == null) {
            userBookList = userBookRepository.findByUserAndIsDeletedFalse(user, pageRequest);
        }else if ( status == UserBookStatus.READING ){
            userBookList =  userBookRepository.findByUserAndStatusOrStatus(user, status, UserBookStatus.NOWREADING, pageRequest);
        }else {
            userBookList =  userBookRepository.findByUserAndStatusOrStatus(user, status, status, pageRequest);
        }
        return userBookList.map(userBook -> UserBookListResponseDto.toEntity(userBook));
    }
    @Transactional
    public boolean updateUserBookStatus(Long userBookPk, UserBookStatus status) {
        UserBook userBook = userBookRepository.findById(userBookPk)
                .orElse(null);
        if (userBook == null) return false;
        UserBookStatus oldStatus = userBook.getStatus();
        if (oldStatus == status) return true;
        if (status == UserBookStatus.NOWREADING) {
            nowReadingToReading(userBook.getUser());
        }else if (status == UserBookStatus.READING) {
            return false;
        }else {
            userBook.setCompletedAt(LocalDateTime.now());
        }
        userBook.setStatus(status);
        return userBookRepository.save(userBook) != null;
    }


    public boolean deleteUserBook(long userBookPk) {
        UserBook userBook = userBookRepository.findById(userBookPk)
                .orElse(null);
        if (userBook == null) return false;
        userBook.setDeleted(true);
        updateUserBookStatus(userBookPk, UserBookStatus.DELETE);
        return userBookRepository.save(userBook) != null;
    }

    public UserBookResponseDto findUserBook(Long userBookPk) {
        UserBook userBook = userBookRepository.findById(userBookPk)
                .orElseThrow(() -> new IllegalArgumentException());

        return UserBookResponseDto.toEntity(userBook);
    }

    @Transactional
    public boolean updateUserBook(Long userBookPk, int nowPage, LocalDateTime startedAt, LocalDateTime completedAt) {
        UserBook userBook = userBookRepository.findById(userBookPk).orElse(null);
        if (userBook == null) return false;
        userBook.setNowPage(nowPage);
        userBook.setStartedAt(startedAt);
        userBook.setCompletedAt(completedAt);
        return userBookRepository.save(userBook) != null;
    }

    public UserBookResponseDto findNowReadingUserBook(User user) {
        UserBook userBook = userBookRepository.findByUserAndStatus(user, UserBookStatus.NOWREADING);
        if (userBook == null) return null;
        return UserBookResponseDto.toEntity(userBook);
    }
}
