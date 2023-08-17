package com.reboot.intobook.history;

import com.reboot.intobook.history.dto.GetHistoryListResponse;
import com.reboot.intobook.history.dto.GetHistoryResponse;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.user.repository.UserRepository;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.dto.UserBookResponseDto;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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
        Page<History> histories = historyRepository.findByUserBookAndEndTimeIsNotNull(findUserBook, PageRequest.of( page, 20, Sort.by("endTime").descending()));
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
        Long recentHistoryPk = historyRepository.findTop1ByUserOrderByHistoryPkDesc((history.getUser())).getHistoryPk();
        if (historyPk == recentHistoryPk) {
            LocalDateTime tempStartTime = startTime != null ? startTime : history.getStartTime();
            LocalDateTime tempEndTime = endTime != null ? endTime : history.getEndTime();
            if (tempStartTime.compareTo(tempEndTime) > 0) throw new IllegalArgumentException("잘못된 시간 입력입니다");
            if (endTime != null && !endTime.equals(history.getEndTime())) {
                UserBook userBook = userBookRepository.findById(history.getUserBook().getUserBookPk()).get();
                userBook.setCompletedAt(endTime);
            }
        }else {
            startTime = null;
            endTime = null;
        }
        history.updateHistoryCommentAndStartTimeAndEndTimeAndReadingTime(comment, startTime, endTime);
    }

    @Transactional
    public void updateEndtime(long historyPk) throws NoSuchElementException{
        History history = historyRepository.findById(historyPk).orElseThrow(() -> new NoSuchElementException("History Not Found Error!!!"));
        updateEndTimeMethod(history);
    }

    public void updateEndTimeMethod(History history) {
        history.updateEndTimeAndReadingTime();
        UserBook userBook = history.getUserBook();
        userBook.setCompletedAt(history.getEndTime());
    }


    public static int pressureToPage(int pressure) {
        float[] pages = {30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330};
        float[] pressures = {410, 445, 475, 515, 545, 565, 590, 620, 650, 690, 710};

        float prevPage = 0;
        float prevPress = 0;
        float nextPage = 0;
        float nextPress = 0;

        if (pressure <= pressures[0]) {
            nextPress = pressures[0];
            nextPage = pages[0];
        } else if (pressure >= pressures[pressures.length - 1]) {
            prevPress = pressures[pressures.length - 1];
            prevPage = pages[pressures.length - 1];
        } else {
            for (int i = 1; i < pressures.length; i++) {
                if (pressures[i] > pressure) {
                    nextPress = pressures[i];
                    nextPage = pages[i];
                    prevPress = pressures[i - 1];
                    prevPage = pages[i - 1];
                    break;
                }
            }
        }

        float weight = (pressure - prevPress) / (nextPress - prevPress);
        return Math.round((1 - weight) * prevPage + weight * nextPage);
    }


    @Transactional
    public UserBookResponseDto updatePressure(long historyPk, int pressure) throws NoSuchElementException{
        History history = historyRepository.findById(historyPk).orElseThrow(() -> new NoSuchElementException("History Not Found Error!!!"));
        int maxPage = history.getUserBook().getBook().getPage();
        int newNowPage = Math.min(pressureToPage(pressure), maxPage);
        history.updatePressureAndPageAmount(pressure, newNowPage);
        UserBook userBook = history.getUserBook();
        userBook.setNowPage(newNowPage);
        updateEndTimeMethod(history);
        userBook.updateProgress();
        return UserBookResponseDto.toEntity(userBook);
    }

    @Transactional
    public void delete( Long historyPk ) throws NoSuchElementException{
        History findHistory = historyRepository.findById(historyPk).orElseThrow(() -> new NoSuchElementException("History Not Found Error!!!"));
        historyRepository.delete(findHistory);
    }
}
