package com.reboot.intobook.userbook;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.book.BookRepository;
import com.reboot.intobook.userbook.dto.UserBookListResponseDto;
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
    private final BookRepository bookRepository;
    public boolean insertUserBook(Long userPk, String isbn, UserBookStatus status) {
        Book book = bookRepository.findByISBN(isbn);
        UserBook userBook = userBookRepository.findByUserPkAndBook(userPk, book);
        if (userBook != null) {
            if (!userBook.isDeleted()) return false;
            userBook.setDeleted(false);
            userBook.setStatus(status);
        }else {

            userBook = new UserBook(userPk, book, status);
        }
        if (status != UserBookStatus.INTEREST) {
            userBook.setStartedAt(new Date());
        }
        return userBookRepository.save(userBook) != null;
    }

    public Page<UserBookListResponseDto> findUserBookList(Long userPk, UserBookStatus status, String orderedBy, int page){
        PageRequest pageRequest = PageRequest.of(page, 9, Sort.by(orderedBy).descending());

        Page<UserBookListResponseDto> userBookList = userBookRepository.findByUserPkAndStatusWithBook(userPk, status, pageRequest);
        return userBookList;
    }
    public boolean updateUserBookStatus(Long userBookPk, UserBookStatus status) {
        UserBook userBook = userBookRepository.findById(userBookPk)
                .orElseThrow(() -> new EntityNotFoundException("UserBook with ID " + userBookPk + " not found"));

        UserBookStatus oldStatus = userBook.getStatus();
        if (oldStatus == status) return true;
        if (oldStatus == UserBookStatus.INTEREST && status == UserBookStatus.READING) {
            userBook.setStartedAt(new Date());
        }
        return userBookRepository.save(userBook) != null;
    }


    public boolean deleteUserBook(long userBookPk) {
        UserBook userBook = userBookRepository.findById(userBookPk)
                .orElseThrow(() -> new EntityNotFoundException("UserBook with ID " + userBookPk + " not found"));
        userBook.setDeleted(true);
        return userBookRepository.save(userBook) != null;
    }
}
