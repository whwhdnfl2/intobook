package com.reboot.intobook.userbook;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.book.BookRepository;
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

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserBookService {

    private final UserBookRepository userBookRepository;

    public boolean insertUserBook(User user, Book book) {
        UserBook userBook = userBookRepository.findByUserAndBook(user, book);
        if (userBook != null) {
            if (!userBook.isDeleted()) return false;
            userBook.setDeleted(false);
            userBook.setStatus(UserBookStatus.NOWREADING);
        }else {
            userBook = new UserBook(user, book, UserBookStatus.NOWREADING);
            List<UserBook> preReadingBooks = userBookRepository.findByStatus(UserBookStatus.NOWREADING);
            for (UserBook preReadingBook : preReadingBooks) {
                preReadingBook.setStatus(UserBookStatus.READING);
                userBookRepository.save(preReadingBook);
            }
        }
        return userBookRepository.save(userBook) != null;
    }

    public Page<UserBookListResponseDto> findUserBookList(User user, UserBookStatus status, UserBookOrderBy orderBy, int page){
        Sort sort;
        if (orderBy == UserBookOrderBy.title) {
            sort = Sort.by("book.title").and(Sort.by("createdAt").descending());
        } else if (orderBy == UserBookOrderBy.author) {
            sort = Sort.by("book.author").and(Sort.by("createdAt").descending());
        } else {
            sort = Sort.by(orderBy.toString()).descending();
        }
        PageRequest pageRequest = PageRequest.of(page, 9, sort);

        Page<UserBookListResponseDto> userBookList = userBookRepository.findByUserAndStatusWithBook(user, status, pageRequest);
        return userBookList;
    }
    public boolean updateUserBookStatus(Long userBookPk, UserBookStatus status) {
        UserBook userBook = userBookRepository.findById(userBookPk)
                .orElse(null);
        if (userBook == null) return false;
        UserBookStatus oldStatus = userBook.getStatus();
        if (oldStatus == status) return true;
        if (status == UserBookStatus.NOWREADING) {
            List<UserBook> preReadingBooks = userBookRepository.findByStatus(UserBookStatus.NOWREADING);
            for (UserBook preReadingBook : preReadingBooks) {
                preReadingBook.setStatus(UserBookStatus.READING);
                userBookRepository.save(preReadingBook);
            }
        }else if (status == UserBookStatus.READING) {
            return false;
        }
        userBook.setStatus(status);
        return userBookRepository.save(userBook) != null;
    }


    public boolean deleteUserBook(long userBookPk) {
        UserBook userBook = userBookRepository.findById(userBookPk)
                .orElse(null);
        if (userBook == null) return false;
        userBook.setDeleted(true);
        return userBookRepository.save(userBook) != null;
    }

    public UserBookResponseDto findUserBook(Long userBookPk) {
        UserBookResponseDto userBook = userBookRepository.findByUserBookPkWithBook(userBookPk);
        return userBook;
    }

    public boolean updateUserBook(Long userBookPk, int nowPage, Date startedAt, Date completedAt) {
        UserBook userBook = userBookRepository.findById(userBookPk).orElse(null);
        if (userBook == null) return false;
        userBook.setNowPage(nowPage);
        userBook.setStartedAt(startedAt);
        userBook.setCompletedAt(completedAt);
        return userBookRepository.save(userBook) != null;
    }

}
