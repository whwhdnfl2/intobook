package com.reboot.intobook.user;

import com.reboot.intobook.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

//    public void signUp(UserSignUpDto userSignUpDto) throws Exception {
//
//        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
//            throw new Exception("이미 존재하는 이메일입니다.");
//        }
//
//        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
//            throw new Exception("이미 존재하는 닉네임입니다.");
//        }
//
//        User user = User.builder()
//                .email(userSignUpDto.getEmail())
//                .password(userSignUpDto.getPassword())
//                .nickname(userSignUpDto.getNickname())
//                .build();
//
//        userRepository.save(user);
//    }
}
