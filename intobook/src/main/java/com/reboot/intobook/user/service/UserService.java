package com.reboot.intobook.user.service;

import com.reboot.intobook.user.entity.User;
import com.reboot.intobook.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    //닉네임 업데이트
    public void updateNickname(Long userPk, String nickname) throws Exception{
        Optional<User> temp = userRepository.findByUserPk(userPk);
        if(temp.isPresent()){
            User user = temp.get();
            user.setNickname(nickname);
            userRepository.saveAndFlush(user);
        }else{
            throw new Exception("updateNickname");
        }
    }

    //로그아웃으면 유저의 fcmToken을 제거한다.
    public void deleteFcmToken(Long userPk) throws Exception {
        Optional<User> temp = userRepository.findByUserPk(userPk);
        if(temp.isPresent()){
            User user = temp.get();
            user.setFcmToken(null);
            userRepository.saveAndFlush(user);
        }else{
            throw new Exception("deleteFcmToken 실패");
        }
    }

    //유저 테이블에서 해당 유저를 찾고 fcmToken을 넣는다.
    public void insertFcmToken(Long userPk, String fcmToken) throws Exception {
        Optional<User> temp = userRepository.findByUserPk(userPk);
        if(temp.isPresent()){
            User user = temp.get();
            user.setFcmToken(fcmToken);
            userRepository.saveAndFlush(user);
        }else{
            throw new Exception("insertFcmToken 실패");
        }
    }
}
