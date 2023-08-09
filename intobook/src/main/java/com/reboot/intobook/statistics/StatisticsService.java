package com.reboot.intobook.statistics;

import com.reboot.intobook.history.HistoryRepository;
import com.reboot.intobook.history.dto.GetHistoryResponse;
import com.reboot.intobook.statistics.dto.GetUserStatisticsResponse;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.entity.UserBook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final UserBookRepository userBookRepository;
    private final HistoryRepository historyRepository;
    public GetUserStatisticsResponse getUserStatic(Long userPk ){
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
        int maxReadDaysInRow = findMaxReadDaysInRow( historyList );

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

        return GetUserStatisticsResponse.builder()
                .totalReadBook( userBookList.size() )
                .maxReadDaysInRow( maxReadDaysInRow )
                .totalReadPage( totalReadPage )
                .totalReadTime( totalReadTime )
                .pagePerHour( pagePerHour )
                .timePerRead(timePerRead)
                .build();
    }


    public int findMaxReadDaysInRow(List<GetHistoryResponse> historyList) {
        if (historyList == null || historyList.isEmpty()) {
            return 0;
        }
        //FIXME: 추후에 연속된 최대 읽은 날짜 로직 추가하기

        return 2;
    }
}
