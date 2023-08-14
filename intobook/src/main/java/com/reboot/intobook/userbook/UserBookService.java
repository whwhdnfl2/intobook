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
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserBookService {

    private final UserBookRepository userBookRepository;

    public void nowReadingToReading (User user) {
        List<UserBook> preReadingBook = userBookRepository.findAllByUserAndStatus(user, UserBookStatus.NOWREADING);
        if (preReadingBook == null) return;
        for (UserBook userBook : preReadingBook) {
            userBook.setStatus(UserBookStatus.READING);
            userBookRepository.save(userBook);
        }
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
            userBookList =  userBookRepository.findByUserAndStatusIn(user, new UserBookStatus[] {status, UserBookStatus.NOWREADING}, pageRequest);
        }else {
            userBookList =  userBookRepository.findByUserAndStatusIn(user, new UserBookStatus[] {status}, pageRequest);
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
    public void updateUserBook(Long userBookPk, int nowPage, LocalDateTime completedAt) {
        UserBook userBook = userBookRepository.findById(userBookPk).orElseThrow(() -> new IllegalArgumentException("wrong userBookPk"));
        System.out.println(nowPage + " : " +userBook.getBook().getPage());
        if (nowPage != 0) {
            if (nowPage < 0 || nowPage > userBook.getBook().getPage()) throw new IllegalArgumentException("wrong page");
            userBook.setNowPage(nowPage);
        }
        if (completedAt != null) userBook.setCompletedAt(completedAt);
    }

    public UserBookResponseDto findNowReadingUserBook(User user) {
        List<UserBook> userBook = userBookRepository.findAllByUserAndStatus(user, UserBookStatus.NOWREADING);
        if (userBook == null || userBook.isEmpty()) return null;
        return UserBookResponseDto.toEntity(userBook.get(0));
    }
}
