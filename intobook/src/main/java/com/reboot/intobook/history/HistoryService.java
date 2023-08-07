package com.reboot.intobook.history;

import com.reboot.intobook.history.dto.GetHistoryListResponse;
import com.reboot.intobook.history.dto.GetHistoryResponse;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.user.repository.UserRepository;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class HistoryService {
    private final HistoryRepository historyRepository;
    private final UserBookRepository userBookRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long create( Long userBookPk ) {
        // 필요한 요소 조회
        UserBook findUserBook = userBookRepository.findById(userBookPk)
                .orElseThrow(() -> new NoSuchElementException("User Book Not Found Error!!!"));
        User findUser = findUserBook.getUser();

        // history 생성
        History history = History.builder()
                .userBook(findUserBook)
                .user(findUser)
                .build();

        // history 저장
        History save = historyRepository.save(history);
        return save.getHistoryPk();
    }

    /**
     * userBook의 history 목록 조회
     */
    public GetHistoryListResponse findUserBookHistoryList(Long userBookPk, int page ){
        // userBook 조회
        UserBook findUserBook = userBookRepository.findById(userBookPk)
                        .orElseThrow(() -> new NoSuchElementException("User Book Not Found Error!!!"));
        log.info("유저북" + findUserBook);
        Page<History> histories = historyRepository.findByUserBookAndEndTimeIsNotNull(findUserBook, PageRequest.of( page, 20, Sort.by("endTime")));
        log.info("히스토리 : " + histories);
        List<GetHistoryResponse> items = histories.stream().map( history -> {
            return new GetHistoryResponse(
                    history.getHistoryPk(),
                    history.getStartTime(),
                    history.getEndTime(),
                    history.getReadingTime(),
                    history.getComment(),
                    history.getPageAmount()
            );
        }).collect(Collectors.toList());

        return GetHistoryListResponse.builder()
                .items(items)
                .pageStart(page)
                .pageSize(20)
                .totalCount(histories.getTotalElements())
                .build();
    }

    public List<GetHistoryResponse> findUserHistoryList(Long userPk ){
        // userBook 조회
        User findUser = userRepository.findById(userPk)
                .orElseThrow(() -> new NoSuchElementException("User Book Not Found Error!!!"));

        List<GetHistoryResponse> histories = historyRepository.findByUser(findUser);
        return histories;

    }

//    /**
//     * 나의 모든 history 조회
//     */
//    public List<History> findMyHistoryList(){
//        return historyRepository.findByUser()
//    }


    @Transactional
    public void updateHistoryCommentAndStartTimeAndEndTimeAndReadingTime( Long historyPk, String comment, LocalDateTime startTime, LocalDateTime endTime) throws NoSuchElementException{
        History history = historyRepository.findById(historyPk).orElseThrow(() -> new NoSuchElementException("History Not Found Error!!!"));
        history.updateHistoryCommentAndStartTimeAndEndTimeAndReadingTime(comment, startTime, endTime);
    }

    @Transactional
    public void updateEndtime(long historyPk) throws NoSuchElementException{
        History history = historyRepository.findById(historyPk).orElseThrow(() -> new NoSuchElementException("History Not Found Error!!!"));
        history.updateEndTimeAndReadingTime();
        UserBook userBook = userBookRepository.findById(history.getUserBook().getUserBookPk()).get();
        userBook.updateCompleteAt(LocalDateTime.now());
    }

    @Transactional
    public void updatePressure(long historyPk, int pressure) throws NoSuchElementException{
        History history = historyRepository.findById(historyPk).orElseThrow(() -> new NoSuchElementException("History Not Found Error!!!"));
        history.updatePressure(pressure);
    }

    @Transactional
    public void delete( Long historyPk ) throws NoSuchElementException{
        History findHistory = historyRepository.findById(historyPk).orElseThrow(() -> new NoSuchElementException("History Not Found Error!!!"));
        historyRepository.delete(findHistory);
    }


}
