package com.reboot.intobook.user;

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

    public void updateNickname(String email, String nickname) throws Exception{
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent()){
            User user1 = user.get();
            user1.setNickname(nickname);
            userRepository.saveAndFlush(user1);
        }else{
            throw new Exception("없으요");
        }
    }

}
