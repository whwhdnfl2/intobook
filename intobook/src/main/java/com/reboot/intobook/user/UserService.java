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

    public void signUp(UserDto usetDto) throws Exception {

        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        User user = User.builder().email(usetDto.getEmail()).socialId(usetDto.get)

        userRepository.save(user);
    }
}
