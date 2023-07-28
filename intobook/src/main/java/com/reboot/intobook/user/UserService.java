package com.reboot.intobook.user;

import com.reboot.intobook.user.dto.UserDto;
import com.reboot.intobook.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void signUp(UserDto userDto) throws Exception {

        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        User user = User.builder().email(userDto.getEmail()).password(userDto.getPassword()).nickname(userDto.getNickname()).build();

        userRepository.save(user);
    }

    public User getUser(Long userPk) {
        return userRepository.findById(userPk).orElse(null);
    }
}
