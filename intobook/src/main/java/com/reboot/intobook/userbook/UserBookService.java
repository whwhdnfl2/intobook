package com.reboot.intobook.userbook;

import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserBookService {

    private final UserBookRepository userBookRepository;

    public boolean insertUserBook(Long userPk, String isbn, UserBookStatus status) {
        UserBook userBook = new UserBook(userPk, isbn, status);
        if (status != UserBookStatus.INTEREST) {
            userBook.setStartedAt(new Date());
        }
        return userBookRepository.save(userBook) != null;
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

}
