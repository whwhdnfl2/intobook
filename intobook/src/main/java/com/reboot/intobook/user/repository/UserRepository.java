package com.reboot.intobook.user.repository;

import com.reboot.intobook.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findBySocialId(String socialId);
    Optional<User> findByRefreshToken(String refreshToken);
    Optional<User> findByUserPk(Long userPk);

}
