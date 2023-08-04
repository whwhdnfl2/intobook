package com.reboot.intobook.fcm;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FCMService {

    private final UserRepository userRepository;
    public void sendSaleCompletedMessage(String email) throws Exception {
        Optional<User> temp = userRepository.findByEmail(email);
        if(temp.isPresent()){
            User user = temp.get();

            String fcmToken = user.getFcmToken();
            Message message = Message.builder()
                    .putData("title", "판매 완료 알림")
                    .putData("content", "등록하신 판매 입찰이 낙찰되었습니다.")
                    .setToken(fcmToken)
                    .build();

            send(message);

        }else{
            throw new Exception("없으요");
        }
    }

    public void send(Message message) {
        FirebaseMessaging.getInstance().sendAsync(message);
    }
}