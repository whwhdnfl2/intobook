package com.reboot.intobook.fcm;

import com.google.firebase.messaging.*;
import com.reboot.intobook.history.HistoryRepository;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.user.repository.UserRepository;
import com.reboot.intobook.userbook.UserBookRepository;
import com.reboot.intobook.userbook.UserBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class FCMService {

    @Value("${jwt.secretKey}")
    String secretKey;

    private final UserRepository userRepository;
    private final UserBookService userBookService;
    private final HistoryRepository historyRepository;


    //fcm알림 테스트를 위한 method
    public void test() throws Exception {
        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        Optional<User> temp = userRepository.findByUserPk(userPk);

        if(temp.isPresent()){
            User user = temp.get();

            String fcmToken = user.getFcmToken();
            Message message = Message.builder()
                    .putData("title", "BOOK!빠지다")
                    .putData("content",  user.getNickname() + "님. 독서를 안한지 3일이 넘었어요. " + userBookService.findNowReadingUserBook(user) + "를 읽으러 가봐요!")
                    .setToken(fcmToken)
                    .build();
            send(message);

        }else{
            throw new Exception("fcm test 실패");
        }
    }

    public void send(Message message) {
        FirebaseMessaging.getInstance().sendAsync(message);
    }

    //1시간마다 전체 유저의 가장 최근에 읽은 시간을 통해서 알람 보냄
    @Scheduled(fixedDelay = 1000 * 60 * 60)
    public void sendAlarm() {
        //user table에서 user를 전부 가져온다.
        List<User> userList =  userRepository.findAll();
        //user를 순회하면서 알람을 보내야 하면 알람 보내기
        for(User user: userList){
            if(user.getFcmToken() != null) {
                History history = historyRepository.findTop1ByUserOrderByEndTimeDesc(user);
                LocalDateTime now = LocalDateTime.now();
                if(history == null || history.getEndTime() == null || ChronoUnit.MINUTES.between(history.getEndTime(), now) < 60) {
                    continue;
                }
                String fcmToken = user.getFcmToken();
                Message message = Message.builder()
                        .putData("title", "BOOK!빠지다")
                        .putData("content",  user.getNickname() + "님. 독서를 안한지 3일이 넘었어요. " + userBookService.findNowReadingUserBook(user).getTitle() + "를 읽으러 가봐요!")
                        .setToken(fcmToken)
                        .build();

                send(message);
            }
        }
    }
}