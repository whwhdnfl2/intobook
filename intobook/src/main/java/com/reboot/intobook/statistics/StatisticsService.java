package com.reboot.intobook.statistics;

import com.reboot.intobook.history.HistoryRepository;
import com.reboot.intobook.history.dto.GetHistoryResponse;
import com.reboot.intobook.statistics.dto.GetUserStaticResponse;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final UserBookRepository userBookRepository;
    private final HistoryRepository historyRepository;
    public GetUserStaticResponse getUserStatic( Long userPk ){
        // 유저의 userBookList 구하기
        List<UserBook> userBookList = userBookRepository.findByUserUserPk(userPk);
        // 유저의 historyList 구하기
        List<GetHistoryResponse> historyList = historyRepository.findByUserUserPk(userPk);

        // totalReadPage 계산
        int totalReadPage = 0;
        for( UserBook ub: userBookList ){
            totalReadPage += ub.getNowPage();
        }

        //maxReadSequence 계산
        int maxReadSequence = findMaxConsecutiveDays( historyList );

        // totalReadTime 계산
        int totalReadTime = 0;
        for( GetHistoryResponse h: historyList ){
            totalReadTime += h.getReadingTime();
        }

        // pagePerHour 계산
        int pagePerHour = 0;
        if( totalReadTime != 0 ){ // divide by 0 방지
            pagePerHour = totalReadPage / totalReadTime;
        }

        // timePerRead  계산
        int timePerRead = 0;
        if(historyList.size() != 0 ){
            timePerRead = totalReadTime / historyList.size();
        }

        return GetUserStaticResponse.builder()
                .totalReadBook( userBookList.size() )
                .maxReadDaysInRow( maxReadSequence )
                .totalReadPage( totalReadPage )
                .totalReadTime( totalReadTime )
                .pagePerHour( pagePerHour )
                .timePerRead(timePerRead)
                .build();
    }


    public int findMaxConsecutiveDays(List<GetHistoryResponse> historyList) {
        if (historyList == null || historyList.isEmpty()) {
            return 0;
        }

        int maxConsecutiveDays = 1;
        int currentConsecutiveDays = 1;

        for (int i = 1; i < historyList.size(); i++) {
            LocalDateTime prevEndTime = historyList.get(i - 1).getEndTime();
            LocalDateTime currentStartTime = historyList.get(i).getStartTime();

            long hoursBetween = java.time.temporal.ChronoUnit.HOURS.between(prevEndTime, currentStartTime);

            if (hoursBetween <= 24) {  // Within 24 hours, considered consecutive
                currentConsecutiveDays++;
                maxConsecutiveDays = Math.max(maxConsecutiveDays, currentConsecutiveDays);
            } else {
                currentConsecutiveDays = 1;
            }
        }

        return maxConsecutiveDays;
    }
}
