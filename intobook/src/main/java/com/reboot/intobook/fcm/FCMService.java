package com.reboot.intobook.fcm;

import com.google.firebase.messaging.*;
import com.reboot.intobook.history.HistoryRepository;
import com.reboot.intobook.history.entity.History;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.user.repository.UserRepository;
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
    private final HistoryRepository historyRepository;


    //fcm알림 테스트를 위한 method
    public void test() throws Exception {
        log.info("이게 실행 1");

        Long userPk = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        Optional<User> temp = userRepository.findByUserPk(userPk);
        log.info("이게 실행 2");

        if(temp.isPresent()){
            log.info("이게 실행 3");

            User user = temp.get();
            log.info("이게 실행 4");


            String fcmToken = user.getFcmToken();
            Message message = Message.builder()
                    .putData("title", "판매 완료 알림")
                    .putData("content", "등록하신 판매 입찰이 낙찰되었습니다.")
                    .setToken(fcmToken)
                    .build();
            log.info("이게 실행 5");

            send(message);

        }else{
            log.info("send 실패 ㅠㅠ");

            throw new Exception("fcm test 실패");
        }
    }

    public void send(Message message) {
        
        FirebaseMessaging.getInstance().sendAsync(message);
        log.info("send 실행된거임");
    }

    //1시간마다 전체 유저의 가장 최근에 읽은 시간을 통해서 알람 보냄
    @Scheduled(fixedDelay = 36000)
    public void sendAlarm() {
        //user table에서 user를 전부 가져온다.
        List<User> userList =  userRepository.findAll();
        log.info("싱행 중");

        //user를 순회하면서 알람을 보내야 하면 알람 보내기
        List<String> selectedFcmTokens = new ArrayList<>();
        for(User user: userList){
            log.info("fcmtoken: " + user.getFcmToken());

            if(user.getFcmToken() != null) {
                log.info("userPk: " + user.getUserPk());
                History history = historyRepository.findTopByUserUserPk(user.getUserPk());
                log.info("endTime: " + history.getEndTime());
                if(history == null) {
                    break;
                }
                if(ChronoUnit.MINUTES.between(history.getEndTime(), LocalDateTime.now()) > 60){
                    selectedFcmTokens.add(user.getFcmToken());
                }
            }
        }
        if(selectedFcmTokens.size() == 0){
            log.info("fcm 토큰 없다");
            return;
        }

        try{
            MulticastMessage message = MulticastMessage.builder().addAllTokens(selectedFcmTokens).setNotification(Notification.builder()
                            .setTitle("오랫동안 안읽었어요.")
                            .setBody("책이 울고있어요!! 책을 읽으러 갑시다.")
                            .build())
                    .build();
            BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);
            if (response.getFailureCount() > 0) {
                List<SendResponse> responses = response.getResponses();
                List<String> failedTokens = new ArrayList<>();
                for (int i = 0; i < responses.size(); i++) {
                    if (!responses.get(i).isSuccessful()) {
                        failedTokens.add(selectedFcmTokens.get(i));
                    }
                }
            }
        }catch (Exception e){
            log.error("sendAlarm error: " + e.getClass());
        }
    }
}