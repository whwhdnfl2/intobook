package com.reboot.intobook.userbook;

import com.reboot.intobook.book.Book;
import com.reboot.intobook.book.BookRepository;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.userbook.dto.UserBookListResponseDto;
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

    public boolean insertUserBook(User user, Book book, UserBookStatus status) {

        Long userPk = user.getUserPk();
        UserBook userBook = userBookRepository.findByUserAndBook(user, book);
        if (userBook != null) {
            if (!userBook.isDeleted()) return false;
            userBook.setDeleted(false);
            userBook.setStatus(status);
        }else {
            userBook = new UserBook(user, book, status);
        }
        if (status != UserBookStatus.INTEREST) {
            userBook.setStartedAt(new Date());
        }
        return userBookRepository.save(userBook) != null;
    }

    public Page<UserBookListResponseDto> findUserBookList(User user, UserBookStatus status, String orderedBy, int page){
        PageRequest pageRequest = PageRequest.of(page, 9, Sort.by(orderedBy).descending());

        Page<UserBookListResponseDto> userBookList = userBookRepository.findByUserAndStatusWithBook(user, status, pageRequest);
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

    public UserBookResponseDto findUserBook(Long userBookPk) {
        UserBookResponseDto userBook = userBookRepository.findByUserBookPkWithBook(userBookPk);
        return userBook;
    }

}
