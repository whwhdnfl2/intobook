package com.reboot.intobook.userbook;

import com.reboot.intobook.userbook.entity.UserBook;
import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserBookService {

    private final UserBookRepository userBookRepository;

    public boolean insertUserBook(Long userPk, String isbn, UserBookStatus status) {
        UserBook userBook = new UserBook(userPk, isbn, status);
        System.out.println(userBook);
        return userBookRepository.save(userBook) != null;
    }
}
